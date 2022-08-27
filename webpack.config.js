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
  webpackConfig('chalk', {
    entry: { index: './node_modules/chalk/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    plugins: [
      newCopyPlugin([
        { from: '{license*,readme*,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'chalk') },
        {
          from: 'node_modules/chalk/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, xo: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('regexpu-core', {
    entry: { 'rewrite-pattern': './node_modules/regexpu-core/rewrite-pattern' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/regexpu-core/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/regexpu-core/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('@babel-core', {
    entry: { 'lib/index': './node_modules/@babel/core/lib/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      browserslist: 'commonjs2 browserslist',
      chalk: 'commonjs2 chalk',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.core.lib.config.files.(configuration|plugins|module-types|import)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: ' require.resolve ', replace: ' require("originalRequire").resolve ' },
              { search: ' require(filepath)', replace: ' require("originalRequire")(filepath)' },
              { search: ' import(filepath)', replace: ' import(/* webpackIgnore: true */ filepath)' },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@babel/core/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@babel/core/package.json',
          transform(content) {
            const { devDependencies: _1, ...pkg } = JSON.parse(content);
            const { dependencies: dep1 } = require('@babel/helper-compilation-targets/package.json');
            const { dependencies: dep2 } = require('@babel/highlight/package.json');

            pkg.dependencies = { browserslist: dep1.browserslist, chalk: dep2.chalk };
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
    optimization: {
      minimizer: [{ format: { beautify: true, indent_level: 0 } }],
    },
  }),
  webpackConfig('@babel-preset', {
    entry: { 'lib/index': './node_modules/@babel/preset-env/lib/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      '@babel/core': 'commonjs @babel/core',
      browserslist: 'commonjs2 browserslist',
      chalk: 'commonjs2 chalk',
      'regexpu-core': 'commonjs2 regexpu-core',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.helper-define-polyfill-provider.lib.node.dependencies\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / require(\.resolve\(\w+,)/g, replace: ' require("originalRequire")$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@babel/preset-env/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@babel/preset-env/package.json',
          transform(content) {
            const { devDependencies: _1, ...pkg } = JSON.parse(content);
            const { dependencies: d1 } = require('core-js-compat/package.json');
            const { dependencies: d2 } = require('@babel/helper-create-regexp-features-plugin/package.json');
            const { dependencies: d3 } = require('@babel/highlight/package.json');

            pkg.dependencies = { browserslist: d1.browserslist, chalk: d3.chalk, 'regexpu-core': d2['regexpu-core'] };
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
    optimization: {
      minimizer: [{ format: { beautify: true, indent_level: 0 } }],
    },
  }),
  webpackConfig('object.assign', {
    entry: { index: './node_modules/object.assign/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.4',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/object.assign/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/object.assign/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, testling: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('find-cache-dir', {
    entry: { index: './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/find-cache-dir/{license*,readme*}', to: '[name][ext]' },
        {
          from: 'node_modules/find-cache-dir/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, nyc: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
];
