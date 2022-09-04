'use strict';

const path = require('path');
const fs = require('fs');
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

const getFileContent = (filename, encoding = 'utf8') =>
  fs.readFileSync(path.resolve(__dirname, 'node_modules', filename), encoding);

module.exports = [
  webpackConfig('/chalk', {
    entry: { 'vendor/chalk': './node_modules/chalk/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/cross-spawn', {
    entry: { 'vendor/cross-spawn': './node_modules/cross-spawn/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/readable-stream', {
    entry: { 'vendor/readable-stream': './node_modules/readable-stream/readable' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/micromatch', {
    entry: { 'vendor/micromatch': './node_modules/micromatch/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  //
  webpackConfig('/import-local', {
    entry: { 'vendor/import-local': './node_modules/import-local/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.import-local.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: '\\brequire(\\([\\w.]+[()])', flags: 'g', replace: 'require("originalRequire")$1' },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }), //
    ],
  }),
  webpackConfig('/yargs', {
    entry: { 'vendor/yargs': './node_modules/yargs/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.(yargs.(index|yargs)|require-main-filename.index)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: '(,|\\|\\|) require(;|\\)|$)', flags: 'gm', replace: '$1 require("originalRequire")$2' },
        },
        {
          test: /node_modules.(yargs.lib.apply-extends|yargs-parser.index)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: '\\brequire((\\.resolve)?\\([\\w.]+\\))',
            flags: 'g',
            replace: 'require("originalRequire")$1',
          },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }), //
    ],
  }),
  //
  webpackConfig('/webpack-cli', {
    entry: { 'bin/cli': './node_modules/webpack-cli/bin/cli' },
    externals: {
      webpack: 'commonjs2 webpack',
      'v8-compile-cache': 'commonjs2 v8-compile-cache',
      chalk: 'commonjs2 ../vendor/chalk',
      'cross-spawn': 'commonjs2 ../vendor/cross-spawn',
      'readable-stream': 'commonjs2 ../vendor/readable-stream',
      micromatch: 'commonjs2 ../vendor/micromatch',
      'import-local': 'commonjs2 ../vendor/import-local',
      yargs: 'commonjs2 ../vendor/yargs',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.webpack-cli.bin.cli\.js$/i,
          loader: 'string-replace-loader',
          options: { search: '^#!.*[\\r\\n]+', flags: '', replace: '' },
        },
        {
          test: /node_modules.webpack-cli.bin.utils.(prompt-command|convert-argv)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: '\\brequire((\\.resolve)?\\([\\w.]+[()])',
            flags: 'g',
            replace: 'require("originalRequire")$1',
          },
        },
        {
          test: /node_modules.interpret.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: '^var (path|mjsStub) = .*', flags: 'gm', replace: '' },
              {
                search: ' mjsStub,',
                replace: ` {module:'mjs-stub', register:function(hook){ ${getFileContent('interpret/mjs-stub.js')} }},`,
              },
              { search: '\\brequire(\\.extensions)\\b', flags: 'g', replace: "require('originalRequire')$1" },
            ],
          },
        },
        {
          test: /node_modules.webpack-cli.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"license":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/webpack-cli/{LICENSE*,*.md}', to: '[name].[ext]' },
        {
          from: 'node_modules/webpack-cli/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['devDependencies', 'scripts', 'husky', 'lint-staged', 'jest', 'nyc'].forEach((k) => delete pkg[k]);

            pkg.dependencies = { 'v8-compile-cache': pkg.dependencies['v8-compile-cache'] };
            return JSON.stringify(pkg, null, 2).replace('"scripts"', '"vendor"');
          },
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
  }),
];
