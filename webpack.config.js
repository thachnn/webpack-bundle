'use strict';

const path = require('path');
// const { TerserPlugin, CopyPlugin, BannerPlugin, ReplaceCodePlugin } = require('./dist');
const { BannerPlugin } = require('webpack');
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
  resolve: {
    conditionNames: ['import', 'node'],
    ...(config.resolve || {}),
  },
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
      format: { beautify: true, indent_level: 2, ...((opt || {}).terserOptions || {}) },
      compress: { passes: 1 },
    },
  });

/** @param {Array<ObjectPattern | string>} patterns */
const newCopyPlugin = (patterns) => new CopyPlugin({ patterns });

const camelize = (s) => s.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase());

module.exports = [
  webpackConfig('/replace-loader', {
    entry: {
      'lib/replace-loader': './node_modules/string-replace-loader/lib/processChunk',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.9',
    externals: { 'schema-utils': 'commonjs ./schema-utils' },
    module: {
      rules: [
        {
          test: /node_modules.string-replace-loader.lib.getOptionsArray\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\{\s*(\w+)\s*\}( *= *require\('loader-utils)\b/, replace: '$1$2/lib/$1' },
        },
        {
          test: /node_modules.loader-utils.lib.parseQuery\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\('json5)('\))/, replace: '{ parse: $1/lib/parse$2 }' },
        },
      ],
    },
  }),
  //
  webpackConfig('/ajv', {
    entry: { 'vendor/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    externals: { 'uri-js': 'commonjs ./uri-js' },
    plugins: [
      newCopyPlugin([{ from: 'node_modules/uri-js/dist/es5/uri.all.js', to: 'vendor/uri-js.js' }]), //
    ],
  }),
  webpackConfig('/schema-utils', {
    entry: { 'lib/schema-utils': './node_modules/schema-utils/dist/validate' },
    output: { libraryTarget: 'commonjs' },
    externals: { ajv: 'commonjs2 ../vendor/ajv' },
  }),
  //
  webpackConfig('/wasm-ast', {
    entry: { 'vendor/wasm-ast': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: { '@xtuc/long': 'commonjs2 ./long' },
    plugins: [
      newCopyPlugin([{ from: 'node_modules/@xtuc/long/src/long.js', to: 'vendor/' }]), //
    ],
  }),
  webpackConfig('/wasm-parser', {
    entry: { 'vendor/wasm-parser': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: {
      '@webassemblyjs/ast': 'commonjs ./wasm-ast',
      '@xtuc/long': 'commonjs2 ./long',
    },
  }),
  webpackConfig('/wasm-edit', {
    entry: { 'vendor/wasm-edit': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: {
      '@webassemblyjs/ast': 'commonjs ./wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ./wasm-parser',
      '@xtuc/long': 'commonjs2 ./long',
    },
    module: {
      rules: [
        {
          test: /node_modules.@webassemblyjs.(wasm-edit.esm.(index|apply)|wasm-opt.esm.leb128)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(from "@webassemblyjs\/[\w-]+)\/lib\/[^"]+/, replace: '$1' },
        },
      ],
    },
  }),
  //
  webpackConfig('/micromatch', {
    entry: { 'vendor/micromatch': './node_modules/micromatch/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
    resolve: {
      alias: { picomatch$: path.resolve(__dirname, 'node_modules/picomatch/lib/picomatch.js') },
    },
  }),
  webpackConfig('/fast-glob', {
    entry: { 'vendor/fast-glob': './node_modules/fast-glob/out/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
    externals: { micromatch: 'commonjs2 ./micromatch' },
    module: {
      rules: [
        // Forward nested dependencies
        {
          test: /node_modules.fast-glob.out.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^(module\.exports) *= *FastGlob\b/m,
            replace: '$&\n$1._isGlob = require("is-glob");\n$1._merge2 = require("merge2");',
          },
        },
      ],
    },
  }),
  webpackConfig('/globby', {
    entry: { 'vendor/globby': './node_modules/globby/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'fast-glob': 'commonjs2 ./fast-glob' },
    module: {
      rules: [
        {
          test: /node_modules.globby.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^(const )(merge2)( = require\b).*\n(\1(fastGlob)\3.*)/m, replace: '$4\n$1$2 = $5._$2;' },
        },
      ],
    },
  }),
  webpackConfig('/serialize-js', {
    entry: { 'vendor/serialize-javascript': './node_modules/serialize-javascript/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
  }),
  webpackConfig('/copy-plugin', {
    entry: { 'lib/copy-plugin': './node_modules/copy-webpack-plugin/dist/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      'fast-glob': 'commonjs2 ../vendor/fast-glob',
      globby: 'commonjs2 ../vendor/globby',
      'schema-utils': 'commonjs ./schema-utils',
      'serialize-javascript': 'commonjs2 ../vendor/serialize-javascript',
    },
    module: {
      rules: [
        {
          test: /node_modules.copy-webpack-plugin.dist.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^exports\.default *= *_/m, replace: 'module.exports = $&' },
              { search: /\brequire\("\.+\/package\.json"\)/, replace: '{ version: $&.version }' },
              // Fix transformAll error
              { search: /(\.getLazyHashedEtag\([^)]*)\.buffer\(\)\)/g, replace: '$1)' },
              { search: /\b\w*\.getLazyHashedEtag\((mergedEtag)\)/, replace: '$1' },
            ],
          },
        },
        {
          test: /node_modules.glob-parent.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('is-glob')", replace: " require('fast-glob')._isGlob" },
        },
      ],
    },
  }),
  //
  webpackConfig('/browserslist', {
    entry: { 'vendor/browserslist': './node_modules/browserslist/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    module: {
      rules: [
        {
          test: /node_modules.browserslist.node\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(?=\(\w+|\.resolve\b)/g, replace: '__non_webpack_require__' },
        },
      ],
    },
    optimization: {
      minimizer: [{ terserOptions: { beautify: true, indent_level: 0 } }],
    },
  }),
  //
  webpackConfig('/terser', {
    entry: {
      'vendor/terser': { import: './node_modules/terser/main', library: { type: 'commonjs' } },
      'bin/terser': { import: './node_modules/terser/bin/terser' },
    },
    externals: { '..': 'commonjs ../vendor/terser' },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/i,
          loader: 'string-replace-loader',
          options: { search: ' require("acorn")', replace: ' require("./acorn")' },
        },
        {
          test: /node_modules.terser.main\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^(export \{ *minify *\}) *from\b.*/m, replace: '$1;' },
        },
        {
          test: /node_modules.terser.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"engines":[\s\S]*/, replace: '\n}' },
        },
        {
          test: /node_modules.source-map-support.source-map-support\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\(')(source-map)('\)\.SourceMapConsumer)/, replace: '$1$2/lib/$2-consumer$3' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/terser/node_modules/source-map/lib/mappings.wasm', to: 'vendor/' }, //
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bbin[\\/]\w+\.js$/ }),
    ],
  }),
  webpackConfig('/terser-plugin', {
    entry: {
      'lib/terser-plugin': './node_modules/terser-webpack-plugin/dist/index',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      terser: 'commonjs ../vendor/terser',
      'jest-worker': 'commonjs ../vendor/jest-worker',
      'schema-utils': 'commonjs ./schema-utils',
      'serialize-javascript': 'commonjs2 ../vendor/serialize-javascript',
      //
      'uglify-js': 'commonjs uglify-js',
      'uglify-js/package.json': 'commonjs uglify-js/package.json',
      '@swc/core': 'commonjs2 @swc/core',
      '@swc/core/package.json': 'commonjs2 @swc/core/package.json',
      esbuild: 'commonjs2 esbuild',
      'esbuild/package.json': 'commonjs2 esbuild/package.json',
    },
    module: {
      rules: [
        {
          test: /node_modules.terser-webpack-plugin.dist.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\b(SourceMapConsumer\s*\} *= *require\(")(source-map)"/, replace: '$1$2/lib/$2-consumer"' },
              { search: /\brequire\.resolve\("\.\/minify\b[^)]*\)/, replace: '__filename' },
              { search: /\} *= *require\("\.\/minify\b/, replace: ', transform $&' },
              { search: /^module\.exports *= *(TerserPlugin)\b/m, replace: '$1.transform = transform;\n$&' },
            ],
          },
        },
        {
          test: /node_modules.terser-webpack-plugin.dist.minify\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /("require")(,.*) require,/,
            replace: '$1, "__webpack_require__"$2 __non_webpack_require__, __webpack_require__,',
          },
        },
        {
          test: /node_modules.terser-webpack-plugin.dist.utils\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire\("[^"]*\/package\.json"\)/g, replace: '{ version: $&.version }' },
        },
      ],
    },
  }),
  webpackConfig('/jest-worker', {
    entry: {
      'vendor/jest-worker': './node_modules/jest-worker/build/index',
    },
    output: { libraryTarget: 'commonjs' },
    module: {
      rules: [
        {
          test: /node_modules.jest-worker.build.(index|base.BaseWorkerPool|workers.ChildProcessWorker)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\(\w+|\.resolve\b)/g, replace: '__non_webpack_require__$1' },
        },
        {
          test: /node_modules.jest-worker.build.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^(exports)\.(Worker) *= *\2\b.*/m, replace: "$&\n$1._types = require('./types')" },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        {
          from: 'node_modules/jest-worker/build/workers/{thread,process}Child.js',
          to: 'vendor/[name][ext]',
          transform: (s) => String(s).replace(" require('../types')", " require('./jest-worker')._types"),
        },
      ]),
    ],
  }),
  //
  webpackConfig('/mime-types', {
    entry: { 'vendor/mime-types': './node_modules/mime-types/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    resolve: {
      alias: { 'mime-db$': path.resolve(__dirname, 'node_modules/mime-db/db.json') },
    },
  }),
  webpackConfig('/watchpack', {
    entry: { 'lib/watchpack': './node_modules/watchpack/lib/watchpack' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules.watchpack.lib.watchpack\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^(module\.exports) *= *Watchpack\b.*/m,
            replace: '$&\n$1._globToRegExp = globToRegExp;\n$1._gracefulFs = require("graceful-fs");',
          },
        },
      ],
    },
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
      acorn: 'commonjs ../vendor/acorn',
      'es-module-lexer': 'commonjs ../vendor/esm-lexer',
      'mime-types': 'commonjs ../vendor/mime-types',
      'neo-async': 'commonjs ../vendor/neo-async',
      browserslist: 'commonjs2 ../vendor/browserslist',
      'schema-utils': 'commonjs ./schema-utils',
      'terser-webpack-plugin': 'commonjs2 ./terser-plugin',
      'copy-webpack-plugin': 'commonjs2 ./copy-plugin',
      watchpack: 'commonjs2 ./watchpack',
    },
    module: {
      rules: [
        {
          test: /node_modules.webpack.lib.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^(\s*get) WatchIgnorePlugin\(\) \{/m,
            replace: `$1 TerserPlugin() { return require("terser-webpack-plugin"); },
$1 CopyPlugin() { return require("copy-webpack-plugin"); },
$1 ReplaceCodePlugin() { return require("../../../scripts/ReplaceCodePlugin"); },\n$&`,
          },
        },
        {
          test: /node_modules.webpack.lib.util.registerExternalSerializer\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /(\("schema-utils)\/dist\/(ValidationError)("\)\.)default\b/, replace: '$1$3$2' },
        },
        {
          test: /node_modules.webpack.lib.config.defaults\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\bpath\.resolve\((__dirname), "\.\."\)/, replace: '$1' },
              { search: /\brequire(\.resolve)\("(watchpack)"\)/g, replace: 'path$1(__dirname, "./$2.js")' },
            ],
          },
        },
        {
          test: /node_modules.(loader-runner.lib.loadLoader|webpack.lib.(serialization.ObjectMiddleware|WebpackOptionsApply|ProgressPlugin))\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire(\(\w+|\.resolve\b)/g, replace: '__non_webpack_require__$1' },
        },
        // Reuse nested dependencies
        {
          test: /node_modules.(webpack.lib.(optimize.SideEffectsFlagPlugin|node.NodeEnvironmentPlugin)|enhanced-resolve.lib.index)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /\brequire\("(glob-to-regexp|graceful-fs)"\)/,
            replace: (_m, p1) => `require("watchpack")._${camelize(p1).replace('Regexp', 'RegExp')}`,
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,*.md,*.d.ts,hot/lazy-compilation-*}', context: 'node_modules/webpack' },
        {
          from: 'node_modules/webpack/package.json',
          transform(content) {
            const { dependencies: d, scripts: _s, bin: _b, jest: _j, 'lint-staged': _, ...pkg } = JSON.parse(content);

            (pkg.devDependencies = d), (pkg.version += '-0');
            return JSON.stringify(pkg, null, 2).replace('"schemas/"', '"vendor/"');
          },
        },
        { from: 'node_modules/es-module-lexer/dist/lexer.cjs', to: 'vendor/esm-lexer.js' },
        {
          from: 'node_modules/{acorn/dist/acorn,neo-async/async}.js',
          to: ({ absoluteFilename: f }) => `vendor/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}[ext]`,
          transform: (s) => String(s).replace(/^\((function)\b[\s\S]*\(this, \(?\1 *\(exports\) \{|\n\}\)+;\s*$/g, ''),
        },
      ]),
      new ReplaceCodePlugin([
        { search: /\n\/\*{3}\/ \}\)/g, replace: '}', test: /\bschemas\.js$/ },
        { search: /(\n\/\*{3}\/ )(\d+:)\1\((\(\w+(, \w+)*\) => \{)\n/g, replace: '$2 $3', test: /\bschemas\.js$/ },
        { search: /\n\};\n;$/, replace: '};', test: /\bschemas\.js$/ },
        { search: /\n\/\*\n[\s\S]*?\*\//g, replace: '', test: /\bschemas\.js$/ },
      ]),
    ],
    optimization: {
      minimizer: [
        { test: /\b(hot|vendor)[\\/][\w-]+(?<!-lexer)\.js$/ },
        { test: /\blib[\\/]index\.js$/, terserOptions: { indent_level: 0 } },
      ],
      splitChunks: {
        cacheGroups: {
          schemas: { test: /node_modules.webpack[\\/]schemas[\\/]/, name: 'lib/schemas', chunks: 'all' },
        },
      },
    },
  }),
];
