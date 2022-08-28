'use strict';

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
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        test: /(\.[cm]?js|[\\/][^.]+)$/i,
        // cache: true,
        parallel: true,
        terserOptions: {
          mangle: false,
          format: { beautify: true, indent_level: 2 },
          compress: { passes: 1 },
          ...(((config.optimization || {}).minimizer || [])[0] || {}),
        },
        extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
      }),
    ],
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
    entry: { 'dist/index': './node_modules/webpack-merge/dist/index' },
    output: { libraryTarget: 'commonjs' },
    plugins: [
      newCopyPlugin([
        {
          from: 'node_modules/webpack-merge/dist/{index,unique,types}.d.ts',
          to: 'dist/index.d.ts',
          transformAll: combineDTS,
        },
        { from: 'node_modules/webpack-merge/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/webpack-merge/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, husky: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  webpackConfig('webpack-cli', {
    entry: {
      'lib/index': { import: './node_modules/webpack-cli/lib/webpack-cli', library: { type: 'commonjs2' } },
      'bin/cli': { import: './node_modules/webpack-cli/bin/cli' },
    },
    externals: {
      webpack: 'commonjs2 webpack',
      'webpack-bundle-analyzer': 'commonjs2 webpack-bundle-analyzer',
      './webpack-cli': 'commonjs2 ../lib/index',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.((interpret|import-local).index|rechoir.(index|lib.register))\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\.extensions|\([\w.]+)\b/g, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.resolve.lib.core\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('./core.json')", replace: " require('../../is-core-module/core.json')" },
        },
        {
          test: /node_modules.webpack-cli.lib.webpack-cli\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: / await this\.loadJSONFile\(/g, replace: ' this.loadJSONFile(' },
              {
                search: ' pkgJSON = this.loadJSONFile("../package.json")',
                replace: ' pkgVersion = require("../package.json").version',
              },
              { search: /\bpkgJSON\.version\b/g, replace: 'pkgVersion' },
              { search: / await this\.tryRequireThenImport\("/g, replace: ' require("' },
              {
                search: ' if (process.versions.pnp)',
                replace: ' if (process.versions.pnp || /@webpack-cli\\/(serve|info|configtest)$/i.test(packageName))',
              },
              {
                search: ' result = require(module)',
                replace:
                  'const m = /@webpack-cli\\/(serve|info|configtest)$/i.exec(module);\n\
                  result = !m ? require("originalRequire")(module) : require(`@webpack-cli/${m[1]}/lib`)',
              },
              {
                search: ' result = require(pathToFile)',
                replace:
                  'const m = /@webpack-cli\\/(serve|info|configtest)\\/package\\.json$/i.exec(pathToFile);\n\
                  result = !m ? require("originalRequire")(pathToFile) : require(`@webpack-cli/${m[1]}/package.json`)',
              },
            ],
          },
        },
        {
          test: /node_modules.@webpack-cli.serve.lib.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\([^)]*WEBPACK_DEV_SERVER)/g, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.@webpack-cli.*\bpackage\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /(,\s*"description":\s*"")?,\s*"main":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,README*,*/types.d.ts}', context: path.join(__dirname, 'node_modules', 'webpack-cli') },
        {
          from: 'node_modules/webpack-cli/package.json',
          transform(content) {
            const { dependencies: _1, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/i }),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
  }),
];
