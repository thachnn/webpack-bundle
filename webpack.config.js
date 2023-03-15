'use strict';

const path = require('path');
const fs = require('fs');
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

String.prototype.camelize = function () {
  return this.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase());
};
String.prototype.replaceBulk = function (...arr) {
  return arr.reduce((s, i) => String.prototype.replace.apply(s, i), this);
};

const resolveDepPath = (rel, alt = '', base = 'node_modules') =>
  fs.existsSync((rel = path.resolve(__dirname, base, rel))) ? rel : alt && path.resolve(__dirname, base, alt);

// Constants for Yarn bundling
const preInstallCmd = 'node ./preinstall.js';

const babelLoaderOpt = (flow = false) => ({
  cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        targets: { node: '6' },
        // useBuiltIns: 'usage',
        // corejs: { version: '3.8', proposals: true },
        modules: false,
        loose: true,
        exclude: [/^transform-(classes|for-of|regenerator|arrow|function)\b/],
      },
    ],
    ...(!flow ? [] : ['@babel/preset-flow']),
  ],
  plugins: [
    // TODO ['@babel/plugin-transform-runtime', { version: '^7.8.4' }],
    ...(!flow ? [] : [['babel-plugin-inline-import', { extensions: ['.tpl.js'] }]]),
  ],
});

module.exports = [
  webpackConfig('babel-plugin', {
    entry: {
      'build/index': './node_modules/babel-plugin-inline-import/build/index',
    },
    output: { libraryTarget: 'commonjs' },
    target: 'node4',
    module: {
      rules: [
        {
          test: /node_modules[\\/]require-resolve\b.src\b.lib\b.locate\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/babel-plugin-inline-import/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/babel-plugin-inline-import/package.json',
          transform: (content) => String(content).replace(/,\s*"scripts":[\s\S]*/, '\n}\n'),
        },
      ]),
    ],
  }),
  //
  webpackConfig('yarn-cli', {
    entry: {
      'lib/cli': './node_modules/yarn/src/cli/index',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    // externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]yarn\b.src\b.*\.js$/i,
          loader: 'babel-loader',
          options: babelLoaderOpt(true),
        },
        {
          test: /node_modules[\\/](@zkochan|inquirer)\b(?!.node_modules)/i,
          loader: 'babel-loader',
          options: babelLoaderOpt(),
        },
        {
          test: /node_modules[\\/]hash-for-dep\b.lib\b.pkg\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/yarn/{LICENSE*,*.md,scripts/preinstall.*}', to: '[name][ext]' },
        {
          from: 'node_modules/yarn/package.json',
          transform(content) {
            const { dependencies: _, devDependencies: _d, jest: _j, resolutions: _r, ...pkg } = JSON.parse(content);

            Object.assign(pkg, { installationMethod: 'tar', scripts: { preinstall: preInstallCmd } });
            return delete pkg.config, (pkg.version += '-0r'), JSON.stringify(pkg, null, 2) + '\n';
          },
        },
        { from: 'node_modules/yarn/bin/', to: 'bin/', transform: (s) => String(s).replace(/__dirname \+ '\//g, "'") },
        { from: 'node_modules/v8-compile-cache/v8-compile-cache.js', to: 'lib/' },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/ }),
      // new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
  }),
];
