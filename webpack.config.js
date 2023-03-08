'use strict';

const fs = require('fs');
const path = require('path');
const { TerserPlugin, CopyPlugin, BannerPlugin, ReplaceCodePlugin } = require('webpack');

/** @typedef {import("webpack").Configuration} Configuration */

/** @typedef {{ from: String, to?: String | Function, context?: String, transform?: Function, transformAll?: Function }} ObjectPattern */

/**
 * @param {String} name
 * @param {Configuration} config
 * @returns {Configuration}
 */
const webpackConfig = (name, config, clean = name.charAt(0) !== '/') => ({
  ...config,
  mode: 'production',
  name: clean ? name : name.substring(1),
  output: {
    path: path.join(__dirname, 'dist', clean ? name : ''),
    clean,
    ...(config.output || {}),
  },
  context: __dirname,
  target: config.target || 'node10',
  node: { __filename: false, __dirname: false },
  cache: { type: 'filesystem' },
  stats: { modulesSpace: Infinity, nestedModules: true, nestedModulesSpace: Infinity },
  /*resolve: {
    conditionNames: ['import', 'node'],
    ...(config.resolve || {}),
  },*/
  optimization: {
    nodeEnv: false,
    // minimize: false,
    ...(config.optimization || {}),
    minimizer: ((config.optimization || {}).minimizer || [null]).map(newTerserPlugin),
  },
});

const newTerserPlugin = (opt) =>
  new TerserPlugin({
    // cache: true,
    parallel: true,
    extractComments: { condition: /(@preserve|@lic|@cc_on|^\**!)[^*]/i, banner: false },
    ...(opt || {}),
    terserOptions: {
      mangle: false,
      format: { beautify: true, indent_level: 2, comments: false, ...((opt || {}).terserOptions || {}) },
      compress: { passes: 1 },
    },
  });

/** @param {Array<ObjectPattern | string>} patterns */
const newCopyPlugin = (patterns) => new CopyPlugin({ patterns });

/** @param {Array<{ data: Buffer, absoluteFilename: String }>} assets */
const combineDTS = (assets) => {
  const baseDir = path.join(__dirname, 'node_modules');
  const getModuleName = (file) =>
    path
      .relative(baseDir, file)
      .replace(/\\+/g, '/')
      .replace(/(\/index)?\.d\.ts$/i, '');

  return assets.reduce((result, asset) => {
    const moduleName = getModuleName(asset.absoluteFilename);
    const assetDir = path.dirname(asset.absoluteFilename);

    const content = String(asset.data)
      .replace(/(^|\s)declare\s/gm, '$1')
      .replace(
        /^(\s*(?:im|ex)port .* from ['"])([./][^'"]*)/gm,
        (_, m1, m2) => `${m1}${getModuleName(path.resolve(assetDir, m2))}`
      );

    return `${result}\ndeclare module '${moduleName}' {\n${content.trim()}\n}\n`;
  }, '');
};

module.exports = [
  webpackConfig('webpack-merge', {
    entry: {
      'dist/index': './node_modules/webpack-merge/dist/index',
    },
    output: { libraryTarget: 'commonjs' },
    plugins: [
      newCopyPlugin([
        {
          from: 'node_modules/webpack-merge/dist/{index,unique,types}.d.ts',
          to: 'dist/index.d.ts',
          transformAll: combineDTS,
        },
        { from: '{LICENSE*,*.md}', context: 'node_modules/webpack-merge' },
        {
          from: 'node_modules/webpack-merge/package.json',
          transform: (content) =>
            String(content).replace(/,\s*"((d|devD)ependencies|scripts|jest|husky)": *\{([^{}]|\{[^{}]*\})*\}/g, ''),
        },
      ]),
    ],
  }),
  //
  webpackConfig('webpack-cli', {
    entry: {
      'lib/index': { import: './node_modules/webpack-cli/lib/webpack-cli', library: { type: 'commonjs2' } },
      'bin/cli': { import: './node_modules/webpack-cli/bin/cli' },
    },
    externals: {
      commander: 'commonjs2 ./commander',
      envinfo: 'commonjs2 ./envinfo',
      './webpack-cli': 'commonjs2 ../lib/index',
      originalRequire: 'commonjs2 ./originalRequire',
      //
      webpack: 'commonjs2 webpack',
      'webpack-bundle-analyzer': 'commonjs2 webpack-bundle-analyzer',
    },
    module: {
      rules: [
        {
          test: /node_modules.((interpret|import-local).index|rechoir.(index|lib.register))\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\.extensions|\([a-zA-Z_]\w*)\b/g, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.@webpack-cli.serve.lib.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\([^)]*WEBPACK_DEV_SERVER)/g, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.webpack-cli.lib.webpack-cli\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /\bawait (this\.loadJSONFile)\b/g, replace: '$1' },
              { search: /\bawait this\.tryRequireThenImport(\(")/g, replace: 'require$1' },
              {
                search: /\b(if *\(process\.versions\.pnp)\)/,
                replace: '$1 || /@webpack-cli\\/(serve|info|configtest)$/i.test(packageName))',
              },
              {
                search: /\b(result *= *)(require)(\(module\))/,
                replace:
                  'const m = /@webpack-cli\\/(serve|info|configtest)$/i.exec$3;\n\
                  $1!m ? $2("originalRequire")$3 : $2(`@webpack-cli/${m[1]}/lib`)',
              },
              {
                search: /\b(result *= *)(require)(\(pathToFile\))/,
                replace:
                  'const m = /@webpack-cli\\/(serve|info|configtest)\\/package\\.json$/i.exec$3;\n\
                  $1!m ? $2("originalRequire")$3 : $2(`@webpack-cli/${m[1]}/package.json`)',
              },
              { search: /\bthis\.loadJSONFile(\("\.+\/package\.json"\))/, replace: '{version: require$1.version}' },
            ],
          },
        },
        {
          test: /node_modules.interpret.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /^var mjsStub *=/m, replace: '// $&' },
              {
                search: ' mjsStub,',
                replace: ` { module: 'interpret/mjs-stub', register: function(hook) { ${fs.readFileSync(
                  path.join(__dirname, 'node_modules', 'interpret', 'mjs-stub.js')
                )} } },`,
              },
            ],
          },
        },
        // Optimize the output
        {
          test: /node_modules.@webpack-cli.\w+.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"(description": *""|main":)[\s\S]*/, replace: '\n}' },
        },
        {
          test: /node_modules.resolve.lib.core\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\(')\.(\/core\.json)\b/, replace: '$1../../is-core-module$2' },
        },
        {
          test: /node_modules.isexe.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^var fs *= *require\b/m, replace: '// $&' },
        },
        {
          test: /node_modules.is-core-module.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /^var has *= *require\b/m, replace: '// $&' },
              { search: /\bhas(?= *\()/g, replace: 'Object.prototype.hasOwnProperty.call' },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,README*,*/types.d.ts}', context: 'node_modules/webpack-cli' },
        {
          from: 'node_modules/webpack-cli/package.json',
          transform: (content) => String(content).replace(/,\s*"dependencies": *\{[^{}]*\}/, ''),
        },
        {
          from: 'node_modules/{v8-compile-cache/v8-*,commander/index,envinfo/dist/env*}.js',
          to: ({ absoluteFilename: f }) => `lib/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}[ext]`,
        },
      ]),
      new BannerPlugin({
        banner: '#!/usr/bin/env node\nrequire("../lib/v8-compile-cache");',
        raw: true,
        test: /\bcli\.js$/,
      }),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
    optimization: {
      minimizer: [{ exclude: /[\\/]envinfo\.js$/ }],
    },
  }),
];
