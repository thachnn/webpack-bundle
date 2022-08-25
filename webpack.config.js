'use strict';

const path = require('path');
// const { TerserPlugin, ReplaceCodePlugin } = require('./dist/lib');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceCodePlugin = require('./scripts/ReplaceCodePlugin');

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
        terserOptions: { mangle: false, format: { beautify: true, indent_level: 2 } }, // compress: { passes: 2 }
        extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
      }),
    ],
    ...(config.optimization || {}),
  },
});

const newCopyPlugin = (patterns) => new CopyPlugin({ patterns });

module.exports = [
  webpackConfig('/ajv', {
    entry: { 'vendor/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
  }),
  webpackConfig('/schema-utils', {
    entry: { 'lib/schema-utils': './node_modules/schema-utils/dist/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { ajv: 'commonjs2 ../vendor/ajv' },
  }),
  webpackConfig('/wasm-ast', {
    entry: { 'vendor/wasm-ast': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
  }),
  webpackConfig('/wasm-parser', {
    entry: { 'vendor/wasm-parser': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: { '@webassemblyjs/ast': 'commonjs ./wasm-ast' },
  }),
  webpackConfig('/wasm-edit', {
    entry: { 'vendor/wasm-edit': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: {
      '@webassemblyjs/ast': 'commonjs ./wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ./wasm-parser',
    },
  }),
  webpackConfig('/fast-glob', {
    entry: { 'vendor/fast-glob': './node_modules/fast-glob/out/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
  }),
  webpackConfig('/globby', {
    entry: { 'vendor/globby': './node_modules/globby/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'fast-glob': 'commonjs2 ./fast-glob' },
  }),
  webpackConfig('/serialize-js', {
    entry: { 'vendor/serialize-js': './node_modules/serialize-javascript/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
  }),
  webpackConfig('/copy-plugin', {
    entry: { 'lib/copy-plugin': './node_modules/copy-webpack-plugin/dist/cjs' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      'fast-glob': 'commonjs2 ../vendor/fast-glob',
      globby: 'commonjs2 ../vendor/globby',
      'serialize-javascript': 'commonjs2 ../vendor/serialize-js',
    },
  }),
  webpackConfig('/terser', {
    entry: { 'vendor/terser': './node_modules/terser/main' },
    output: { library: { name: 'Terser', type: 'umd' } },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/i,
          loader: 'string-replace-loader',
          options: { search: ' require("acorn")', replace: ' import(/* webpackMode: "eager" */ "acorn").acorn' },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({
        search: /\bPromise\.resolve\(.*\)\.then.*[( ,](\d+)\)+\.acorn/,
        replace: '__webpack_require__($1)',
      }),
    ],
  }),
  // TODO: /terser-plugin
  webpackConfig('/webpack', {
    entry: {
      'lib/index': './node_modules/webpack/lib/index',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ../vendor/wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ../vendor/wasm-parser',
      '@webassemblyjs/wasm-edit': 'commonjs ../vendor/wasm-edit',
      browserslist: 'commonjs2 browserslist', // ../vendor/browserslist
      'schema-utils': 'commonjs2 ./schema-utils',
      terser: 'commonjs2 ../vendor/terser',
      'terser-webpack-plugin': 'commonjs2 terser-webpack-plugin', // ./terser-plugin
      'copy-webpack-plugin': 'commonjs2 ./copy-plugin',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.webpack.lib.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^(\s*)get WatchIgnorePlugin\(\) /m,
            replace:
              '$1get TerserPlugin() { return require("terser-webpack-plugin"); },\
              get CopyPlugin() { return require("copy-webpack-plugin"); },\
              get ReplaceCodePlugin() { return require("../../../scripts/ReplaceCodePlugin"); },\n$&',
          },
        },
        {
          test: /node_modules.(loader-runner.lib.loadLoader|webpack.lib.serialization.ObjectMiddleware)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\([\w.]+\))/, replace: 'require("originalRequire")$1' },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
      newCopyPlugin([
        { from: 'node_modules/webpack/{LICENSE*,*.md,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/webpack/package.json',
          transform(content) {
            const { dependencies: d, scripts: _s, bin: _b, jest: _j, 'lint-staged': _, ...pkg } = JSON.parse(content);
            pkg.devDependencies = d;
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
    ],
  }),
];
