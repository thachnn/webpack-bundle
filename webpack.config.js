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
  webpackConfig('ajv', {
    entry: { 'lib/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,README*,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'ajv') },
        {
          from: 'node_modules/ajv/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, nyc: _4, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  webpackConfig('fast-glob', {
    entry: { 'out/index': './node_modules/fast-glob/out/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/fast-glob/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/fast-glob/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
        {
          from: 'node_modules/fast-glob/out/{index,settings,types/index,managers/tasks}.d.ts',
          to: 'out/index.d.ts',
          transformAll: combineDTS,
        },
      ]),
    ],
  }),
  webpackConfig('globby', {
    entry: { index: './node_modules/globby/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: ['fast-glob'],
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/globby/{license*,readme*,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/globby/package.json',
          transform(content) {
            const { devDependencies: _1, scripts: _2, xo: _3, ...pkg } = JSON.parse(content);
            pkg.dependencies = { 'fast-glob': pkg.dependencies['fast-glob'] };
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  webpackConfig('@wasm-ast', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/ast/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/ast/package.json',
          transform(content) {
            const { dependencies: _1, devDependencies: _2, module: _3, ...pkg } = JSON.parse(content);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  webpackConfig('@wasm-parser', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: ['@webassemblyjs/ast'],
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/wasm-parser/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/wasm-parser/package.json',
          transform(content) {
            const { devDependencies: _1, module: _2, ...pkg } = JSON.parse(content);
            pkg.dependencies = { '@webassemblyjs/ast': pkg.dependencies['@webassemblyjs/ast'] };
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  webpackConfig('@wasm-edit', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: ['@webassemblyjs/ast', '@webassemblyjs/wasm-parser'],
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/wasm-edit/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/wasm-edit/package.json',
          transform(content) {
            const { devDependencies: _1, module: _2, ...pkg } = JSON.parse(content);
            pkg.dependencies = {
              '@webassemblyjs/ast': pkg.dependencies['@webassemblyjs/ast'],
              '@webassemblyjs/wasm-parser': pkg.dependencies['@webassemblyjs/wasm-parser'],
            };
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
  webpackConfig('terser', {
    entry: {
      main: { import: './node_modules/terser/main', library: { name: 'Terser', type: 'umd' } },
      bin: { import: './node_modules/terser/bin/terser', filename: 'bin/terser' },
    },
    externals: { '..': 'commonjs2 ../main' },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/i,
          loader: 'string-replace-loader',
          options: { search: ' require("acorn")', replace: ' import(/* webpackMode: "eager" */ "acorn").acorn' },
        },
        {
          test: /node_modules.terser.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"engines":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bterser$/ }),
      new ReplaceCodePlugin({
        search: /\bPromise\.resolve\(.*\)\.then.*[( ,](\d+)\)+\.acorn/,
        replace: '__webpack_require__($1)',
        test: /\bmain\.js$/i,
      }),
      newCopyPlugin([
        { from: '{LICENSE*,*.md,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'terser') },
        {
          from: 'node_modules/terser/package.json',
          transform(content) {
            const { devDependencies: _1, scripts: _2, type: _3, module: _4, ...pkg } = JSON.parse(content);
            pkg.dependencies = {};
            return JSON.stringify(pkg, null, 2).replace(/\bdist\/bundle\.min\b/g, 'main');
          },
        },
      ]),
    ],
  }),
];
