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
    extractComments: { condition: 'some', banner: false },
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

module.exports = [
  webpackConfig('glob', {
    entry: {
      glob: './node_modules/glob/glob',
      minimatch: './node_modules/minimatch/minimatch',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
    externals: { minimatch: 'commonjs2 ./minimatch' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/glob/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/glob/package.json',
          transform: (content) =>
            String(content).replaceBulk([/"dependencies":[\s\S]*(?="license":)/, ''], ['"common.', '"minimatch.']),
        },
      ]),
    ],
  }),
  webpackConfig('dts-bundle', {
    entry: {
      index: { import: './node_modules/dts-bundle/lib/index', library: { type: 'commonjs' } },
      cli: { import: './node_modules/dts-bundle/lib/dts-bundle' },
    },
    target: 'node0.10',
    externals: {
      glob: 'commonjs2 ./lib/glob',
      './index': 'commonjs ./index',
    },
    module: {
      rules: [
        {
          test: /node_modules.dts-bundle.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*/, replace: '\n}' },
        },
        {
          test: /node_modules.dts-bundle.lib.dts-bundle\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /\brequire\((\w+[\w(.]*?Json\))\)/,
            replace: 'JSON.parse(require("fs").readFileSync($1, "utf8"))',
          },
        },
        {
          test: /node_modules.dts-bundle.lib.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /\brequire\(('|")\.+\/package(\.json)?\1\)/, replace: '{ version: $&.version }' },
              {
                search: /^(\s*)trace\(.*\bimport relative\b.*, *(full)\)/m,
                replace: '$1else if (fs.lstatSync($2).isDirectory()) $2 = path.join($2, "index.d.ts");\n$&',
              },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/dts-bundle/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/dts-bundle/package.json',
          transform: (content) =>
            String(content)
              .replace(/,\s*"(d(evD)?ependencies|scripts)": *\{[^{}]*\}/g, '')
              .replaceBulk([/"version": *"[^"]*/, '$&-1'], [/\blib\/dts-bundle\b/g, 'cli']),
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/ }),
    ],
  }),
];
