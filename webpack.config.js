'use strict';

const path = require('path');
const fs = require('fs');
const { TerserPlugin, CopyPlugin, BannerPlugin, ReplaceCodePlugin } = require('webpack');

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {{from: string, to?: (string|Function), context?: string, transform?: Function, transformAll?: Function}} ObjectPattern
 */

/**
 * @param {string} name
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

const newTerserPlugin = (opt, terserOpt) =>
  new TerserPlugin({
    // cache: true,
    parallel: true,
    extractComments: { condition: 'some', banner: false },
    ...(opt = opt || {}),
    terserOptions: {
      mangle: false,
      ...(terserOpt = opt.terserOptions || {}),
      format: { beautify: true, indent_level: 2, comments: false, ...(terserOpt.format || {}) },
      compress: { passes: 1, ...(terserOpt.compress || {}) },
    },
  });

/** @param {Array<(ObjectPattern|string)>} patterns */
const newCopyPlugin = (patterns) => new CopyPlugin({ patterns });

/** @param {Array<{data: Buffer, absoluteFilename: string}>} assets */
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
  webpackConfig('extension', {
    entry: {
      'out/editorConfigMain': './node_modules/editorconfig-vscode/src/editorConfigMain',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: { vscode: 'commonjs vscode' },
    module: {
      rules: [
        // transpile TypeScript
        {
          test: /\.(m?j|t)s$/i,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', { targets: { node: '10' }, modules: false, loose: true }],
              ['@babel/preset-typescript', { optimizeConstEnums: true }],
            ],
            comments: false,
            retainLines: true,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '...'],
      alias: {
        editorconfig$: path.resolve(__dirname, 'node_modules/editorconfig/src/index.ts'),
      },
    },
    plugins: [
      newCopyPlugin([
        { from: '{editorconfig.*,*.{md,txt,png},syntaxes/*}', context: 'node_modules/editorconfig-vscode' },
        { from: 'node_modules/editorconfig-vscode/src/DefaultTemplate.*', to: 'out/[name][ext]' },
        {
          from: 'node_modules/editorconfig-vscode/package.json',
          transform: (s) => String(s).replace(/,\s*"types":.*([\s\S]*),\s*"dependencies":[\s\S]*/, ',$1\n}\n'),
        },
        { from: 'scripts/{extension.*,*.xml}', to: '../[name][ext]' },
      ]),
      new ReplaceCodePlugin([
        { search: /^\/\*{6}\/ (\(\(\) => \{|\}\)\(\))/gm, replace: '', test: /Main\.js$/ },
        { search: /_namespaceObject\b|_unused_webpack/g, replace: '', test: /Main\.js$/ },
      ]),
    ],
    optimization: {
      // minimize: false,
      minimizer: [
        {
          terserOptions: {
            format: { beautify: false, keep_numbers: true, ascii_only: true, quote_style: 3 },
            compress: { keep_infinity: true, lhs_constants: false, inline: false, sequences: false, booleans: false },
          },
        },
      ],
    },
  }),
];
