'use strict';

const path = require('path');
const { minify: terserMinify } = require('webpack/vendor/terser');
const { TerserPlugin, BannerPlugin, CopyPlugin, ReplaceCodePlugin } = require('webpack');

/** @typedef {import("webpack").Configuration} Configuration */

/** @typedef {{ from: String, to?: String | Function, context?: String, transform?: Function }} ObjectPattern */

/** @type {import("terser").MinifyOptions} */
const baseTerserOpts = {
  compress: { passes: 1 },
  mangle: false,
  output: { comments: false, beautify: true, indent_level: 2 },
};

/**
 * @param {String} name
 * @param {Configuration} config
 * @returns {Configuration}
 */
const webpackConfig = (name, config, clean = name.charAt(0) !== '/') =>
  Object.assign(config, {
    mode: 'production',
    name: clean ? name : name.substring(1),
    output: Object.assign({ path: path.join(__dirname, 'dist', clean ? name : '') }, config.output || {}),
    context: __dirname,
    target: 'node',
    node: { __filename: false, __dirname: false },
    cache: true,
    stats: { modules: true, maxModules: Infinity, children: true },
    optimization: {
      nodeEnv: false,
      // minimize: false,
      minimizer: [
        new TerserPlugin({
          test: /(\.m?js|[\\/][^.]+)$/i,
          cache: true,
          parallel: true,
          terserOptions: Object.assign({}, baseTerserOpts, ((config.optimization || {}).minimizer || [])[0] || {}),
          extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
        }),
      ],
    },
  });

const minifyContent = (content, opts = {}) =>
  terserMinify(String(content), Object.assign({}, baseTerserOpts, typeof opts === 'object' ? opts : {})).code;

module.exports = [
  webpackConfig('regexpu-core', {
    entry: { 'rewrite-pattern': './node_modules/regexpu-core/rewrite-pattern' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/regexpu-core/{LICENSE*,README*}', to: '[name].[ext]' },
        {
          from: 'node_modules/regexpu-core/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'devDependencies', 'scripts'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('@babel-core', {
    entry: { 'lib/index': './node_modules/@babel/core/lib/index' },
    output: { libraryTarget: 'commonjs' },
    externals: {
      chalk: 'commonjs2 chalk',
      'supports-color': 'commonjs2 supports-color',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.core.lib.config.files.(plugins|module-types|import)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: ' require(\\(\\w+\\))', flags: '', replace: ' require("originalRequire")$1' },
              { search: ' import(filepath)', replace: ' import(/* webpackIgnore: true */ filepath)' },
            ],
          },
        },
        {
          test: /node_modules.@babel.core.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"main":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/@babel/core/{LICENSE*,README*}', to: '[name].[ext]' },
        {
          from: 'node_modules/@babel/core/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['devDependencies'].forEach((k) => delete pkg[k]);

            const { dependencies: d1 } = require('@babel/highlight/package.json');
            pkg.dependencies = { chalk: d1.chalk };

            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
    ],
  }),
  webpackConfig('@babel-preset', {
    entry: { 'lib/index': './node_modules/@babel/preset-env/lib/index' },
    output: { libraryTarget: 'commonjs' },
    externals: {
      '@babel/core': 'commonjs @babel/core',
      browserslist: 'commonjs2 browserslist',
      'regexpu-core': 'commonjs2 regexpu-core',
      chalk: 'commonjs2 chalk',
      'supports-color': 'commonjs2 supports-color',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.(helper-create-(class|regexp)-features-plugin|plugin-proposal-dynamic-import).package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"(author|description)":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/@babel/preset-env/{LICENSE*,README*}', to: '[name].[ext]' },
        {
          from: 'node_modules/@babel/preset-env/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['devDependencies'].forEach((k) => delete pkg[k]);

            const { browserslist } = pkg.dependencies;
            const { dependencies: d1 } = require('@babel/highlight/package.json');
            const { dependencies: d2 } = require('@babel/helper-create-regexp-features-plugin/package.json');
            pkg.dependencies = { browserslist, chalk: d1.chalk, 'regexpu-core': d2['regexpu-core'] };

            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  //
  webpackConfig('object.assign', {
    entry: { index: './node_modules/object.assign/index' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/object.assign/{LICENSE*,*.md}', to: '[name].[ext]' },
        {
          from: 'node_modules/object.assign/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'devDependencies', 'scripts', 'testling'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('find-cache-dir', {
    entry: { index: './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/find-cache-dir/{license*,readme*}', to: '[name].[ext]' },
        {
          from: 'node_modules/find-cache-dir/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'devDependencies', 'scripts', 'nyc'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  //
  webpackConfig('browserslist', {
    entry: {
      index: './node_modules/browserslist/index',
      cli: './node_modules/browserslist/cli',
    },
    externals: { './': 'commonjs2 ./index', originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.browserslist.cli\.js$/i,
          loader: 'string-replace-loader',
          options: { search: '^#!.*[\\r\\n]+', flags: '', replace: '' },
        },
        {
          test: /node_modules.browserslist.node\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: ' require\\(\\s*require\\.resolve\\(',
            flags: 'g',
            replace: ' require("originalRequire")(require("originalRequire").resolve(',
          },
        },
        {
          test: /node_modules.browserslist.update-db\.js$/i,
          loader: 'string-replace-loader',
          options: { search: "require('escalade/sync')", replace: "require('escalade/sync/index.js')" },
        },
        {
          test: /node_modules.browserslist.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"keywords":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/browserslist/{LICENSE*,*.md}', to: '[name].[ext]' },
        {
          from: 'node_modules/browserslist/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'browser'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /cli\.js$/i }),
      new BannerPlugin({ banner: 'module.exports =', raw: true, test: /index\.js$/i }),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /index\.js$/i }),
    ],
    optimization: {
      minimizer: [{ output: Object.assign({}, baseTerserOpts.output, { indent_level: 0 }) }],
    },
  }),
];
