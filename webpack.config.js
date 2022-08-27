'use strict';

const path = require('path');
// const { TerserPlugin, CopyPlugin, ReplaceCodePlugin } = require('./dist/lib');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceCodePlugin = require('./scripts/ReplaceCodePlugin');

/** @typedef {import("webpack").Configuration} Configuration */

/** @typedef {{ from: String, to?: String | Function, context?: String, transform?: Function }} ObjectPattern */

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
      'schema-utils': 'commonjs2 ./schema-utils',
      'serialize-javascript': 'commonjs2 ../vendor/serialize-js',
    },
    module: {
      rules: [
        {
          test: /node_modules.copy-webpack-plugin.dist.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\b_package( = require\("[^"]*\/package\.json"\))/, replace: '_packageVersion$1.version' },
              { search: /\b_package\.version\b/g, replace: '_packageVersion' },
            ],
          },
        },
      ],
    },
  }),
  webpackConfig('/browserslist', {
    entry: { 'vendor/browserslist': './node_modules/browserslist/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.browserslist.node\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: / require\(require\.resolve\(/g,
            replace: ' require("originalRequire")(require("originalRequire").resolve(',
          },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }), //
    ],
    optimization: {
      minimizer: [{ format: { beautify: true, indent_level: 0 } }],
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
  webpackConfig('/terser-plugin', {
    entry: {
      'lib/terser-plugin': './node_modules/terser-webpack-plugin/dist/index',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      terser: 'commonjs2 ../vendor/terser',
      'jest-worker': 'commonjs ../vendor/jest-worker',
      'schema-utils': 'commonjs2 ./schema-utils',
      'serialize-javascript': 'commonjs2 ../vendor/serialize-js',
      originalRequire: 'commonjs2 ./originalRequire',
      'uglify-js': 'commonjs uglify-js',
      'uglify-js/package.json': 'commonjs uglify-js/package.json',
      esbuild: 'commonjs2 esbuild',
      'esbuild/package.json': 'commonjs2 esbuild/package.json',
      '@swc/core': 'commonjs2 @swc/core',
      '@swc/core/package.json': 'commonjs2 @swc/core/package.json',
    },
    module: {
      rules: [
        {
          test: /node_modules.terser-webpack-plugin.dist.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: 'require.resolve("./minify")', replace: '__filename' },
              { search: '} = require("./minify")', replace: ',transform } = require("./minify")' },
              { search: /^module\.exports = (\w+);/m, replace: '$1.transform = transform;\n$&' },
            ],
          },
        },
        {
          test: /node_modules.terser-webpack-plugin.dist.minify\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /, "require"(.*) require,/,
            replace: ', "require", "__webpack_require__"$1 require("originalRequire"), __webpack_require__,',
          },
        },
        {
          test: /node_modules.terser-webpack-plugin.dist.utils\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\brequire\("[^"]*\/package\.json"\)/g, replace: '$&.version' },
              { search: /&& packageJson\.version\b/g, replace: '' },
            ],
          },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }), //
    ],
  }),
  webpackConfig('/jest-worker', {
    entry: {
      'vendor/jest-worker': { import: './node_modules/jest-worker/build/index', library: { type: 'commonjs' } },
      'vendor/threadChild': './node_modules/jest-worker/build/workers/threadChild',
      'vendor/processChild': './node_modules/jest-worker/build/workers/processChild',
    },
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.jest-worker.build.(index|base.BaseWorkerPool|workers.(thread|process)Child)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire((\.resolve)?\(\w+\))/g, replace: 'require("originalRequire")$1' },
        },
        {
          test: /node_modules.jest-worker.build.workers.ChildProcessWorker\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire\.resolve\('([^']*)/, replace: "require('path').resolve(__dirname, '$1.js" },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }), //
    ],
  }),
  webpackConfig('/webpack', {
    entry: {
      'lib/index': './node_modules/webpack/lib/index',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ../vendor/wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ../vendor/wasm-parser',
      '@webassemblyjs/wasm-edit': 'commonjs ../vendor/wasm-edit',
      browserslist: 'commonjs2 ../vendor/browserslist',
      'schema-utils': 'commonjs2 ./schema-utils',
      'terser-webpack-plugin': 'commonjs2 ./terser-plugin',
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
              '$1get TerserPlugin() { return require("terser-webpack-plugin"); },\n\
              get CopyPlugin() { return require("copy-webpack-plugin"); },\n\
              get ReplaceCodePlugin() { return require("../../../scripts/ReplaceCodePlugin"); },\n$&',
          },
        },
        {
          test: /node_modules.webpack.lib.util.registerExternalSerializer\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: ' require("schema-utils/dist/ValidationError").default',
            replace: ' require("schema-utils").ValidationError',
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
      new CopyPlugin({
        /** @type {Array<ObjectPattern | string>} */
        patterns: [
          { from: 'node_modules/webpack/{LICENSE*,*.md,*.d.ts}', to: '[name][ext]' },
          {
            from: 'node_modules/webpack/package.json',
            transform(content) {
              const { dependencies: d, scripts: _s, bin: _b, jest: _j, 'lint-staged': _, ...pkg } = JSON.parse(content);
              Object.assign(pkg, { devDependencies: d, version: `${pkg.version}-0` });
              return JSON.stringify(pkg, null, 2).replace('"schemas/"', '"vendor/"');
            },
          },
        ],
      }),
    ],
    optimization: {
      minimizer: [{ format: { beautify: true, indent_level: 0 } }],
    },
  }),
];
