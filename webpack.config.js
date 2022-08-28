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
  webpackConfig('glob', {
    entry: { glob: './node_modules/glob/glob' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/glob/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/glob/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, tap: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
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
    externals: { './index': 'commonjs ./index' },
    module: {
      rules: [
        {
          test: /node_modules.dts-bundle.lib.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^(\s*)trace\(.* import relative .*, full\)/m,
            replace: '$1else if (fs.lstatSync(full).isDirectory()) full = path.join(full, "index.d.ts");\n$&',
          },
        },
        {
          test: /node_modules.dts-bundle.lib.dts-bundle\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: ' require(path.resolve(argObj.configJson))',
            replace: ' JSON.parse(require("fs").readFileSync( path.resolve(argObj.configJson) ))',
          },
        },
        {
          test: /node_modules.dts-bundle.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/dts-bundle/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/dts-bundle/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
            pkg.version += '-0';
            return JSON.stringify(pkg, null, 2).replace(/\blib\/dts-bundle\b/g, 'cli');
          },
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/i }),
    ],
  }),
];
