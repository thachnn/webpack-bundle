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
  webpackConfig('browserslist', {
    entry: {
      index: { import: './node_modules/browserslist/index', library: { type: 'commonjs2' } },
      cli: { import: './node_modules/browserslist/cli' },
    },
    target: 'node6',
    externals: { './': 'commonjs2 ./index', originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.browserslist.node\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: / require\(require\.resolve\(/g,
            replace: ' require("originalRequire")(require("originalRequire").resolve(',
          },
        },
        {
          test: /node_modules.browserslist.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/browserslist/{LICENSE*,README*,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/browserslist/package.json',
          transform(content) {
            const { dependencies: _1, browser: _2, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/i }),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /\bindex\.js$/ }),
    ],
    optimization: {
      minimizer: [{ format: { beautify: true, indent_level: 0 } }],
    },
  }),
  webpackConfig('execa', {
    entry: { index: './node_modules/execa/index' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/execa/{license*,readme*,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/execa/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, nyc: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('import-local', {
    entry: { index: './node_modules/import-local/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8',
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.import-local.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / require(\([\w.]+)/g, replace: ' require("originalRequire")$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{license*,readme*,*/cli.js}', context: path.join(__dirname, 'node_modules', 'import-local') },
        {
          from: 'node_modules/import-local/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, xo: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
  }),
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
  webpackConfig('rechoir', {
    entry: { index: './node_modules/rechoir/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.rechoir.(index|lib.register)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\.extensions|\(\w+)\b/, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.resolve.lib.core\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('./core.json')", replace: " require('../../is-core-module/core.json')" },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/rechoir/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/rechoir/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
  }),
];
