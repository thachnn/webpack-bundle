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

const camelize = (s) => s.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase());

module.exports = [
  // TODO ...
];
