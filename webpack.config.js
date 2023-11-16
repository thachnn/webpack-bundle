'use strict';

const path = require('path');
const fs = require('fs');
const { minify: terserMinify } = require('webpack/vendor/terser');
const { TerserPlugin, BannerPlugin, CopyPlugin, ReplaceCodePlugin } = require('webpack');

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {{from: string, to?: (string|Function), context?: string, transform?: Function}} ObjectPattern
 */

/** @type {import('terser').MinifyOptions} */
const baseTerserOpts = {
  compress: { passes: 1 },
  mangle: false,
  output: { comments: false, beautify: true, indent_level: 2 },
};

/**
 * @param {string} name
 * @param {Configuration} config
 * @returns {Configuration}
 */
const webpackConfig = (name, config, clean = name.charAt(0) !== '/') =>
  Object.assign(config, {
    mode: 'production',
    name: clean ? name : name.substring(1),
    output: Object.assign({ path: path.join(__dirname, 'dist', clean ? name : '') }, config.output),
    context: __dirname,
    target: 'node',
    node: { __filename: false, __dirname: false },
    cache: true,
    stats: { modules: true, maxModules: Infinity, children: true },
    optimization: Object.assign({}, config.optimization, {
      nodeEnv: false,
      // minimize: false,
      minimizer: ((config.optimization || {}).minimizer || [null]).map(newTerserPlugin),
    }),
  });

const newTerserPlugin = (opt) =>
  new TerserPlugin({
    test: /(\.m?js(\.bak)?|[\\/][\w-]+)$/i,
    cache: true,
    // parallel: true,
    terserOptions: Object.assign({}, baseTerserOpts, (opt || {}).terserOptions),
    extractComments: { condition: 'some', banner: false },
  });

const minifyContent = (content, opts = null) =>
  terserMinify(String(content), Object.assign({}, baseTerserOpts, typeof opts === 'object' ? opts : null)).code;

const getFileContent = (filename, encoding = 'utf8') =>
  fs.readFileSync(path.resolve(__dirname, 'node_modules', filename), encoding);

//
module.exports = [
  webpackConfig('/chalk', {
    entry: { 'vendor/chalk': './node_modules/chalk/index' },
    output: { libraryTarget: 'commonjs2', filename: '[name].js.bak' },
  }),
  webpackConfig('/import-local', {
    entry: { 'vendor/import-local': './node_modules/import-local/index' },
    output: { libraryTarget: 'commonjs2', filename: '[name].js.bak' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]import-local\b.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
      ],
    },
  }),
  webpackConfig('/cross-spawn', {
    entry: { 'vendor/cross-spawn': './node_modules/cross-spawn/index' },
    output: { libraryTarget: 'commonjs2', filename: '[name].js.bak' },
  }),
  webpackConfig('/readable-stream', {
    entry: { 'vendor/readable-stream': './node_modules/readable-stream/readable' },
    output: { libraryTarget: 'commonjs2', filename: '[name].js.bak' },
    externals: {
      './internal/streams/stream': 'commonjs2 stream',
      // 'string_decoder/': 'commonjs2 string_decoder',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]readable-stream\b.lib\b.*\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /\b(require\(['"])(util-)?(deprecate|inherits)(['"]\))/g, replace: '$1util$4.$3' },
              // { search: /\b(require\(['"])process-nextick-args(['"]\))/g, replace: 'process' },
              // { search: /\b(require\(['"])isarray(['"]\))/g, replace: 'Array.isArray' },
            ],
          },
        },
      ],
    },
  }),
  //
  webpackConfig('/enhanced-resolve', {
    entry: { 'lib/enhanced-resolve': './node_modules/enhanced-resolve/lib/node' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/micromatch', {
    entry: { 'vendor/micromatch': './node_modules/micromatch/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'source-map': 'commonjs2 ./source-map' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]((micro|nano)match|(regex|split|mixin)-\w*)\b.(lib.utils|index)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /\b(require\(['"])((extend-shallow|is-extendable)['"]\))/g,
            replace: '$1to-regex/node_modules/$2',
          },
        },
        {
          test: /node_modules[\\/](object-copy|snapdragon-util|to-object-path|is-number)\b.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\(['"])(kind-of['"]\))/g, replace: '$1has-values/node_modules/$2' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/source-map/dist/source-map.js', to: 'vendor/', transform: minifyContent }, //
      ]),
    ],
  }),
  //
  webpackConfig('/loader-utils', {
    entry: { 'lib/loader-utils': './node_modules/loader-utils/lib/parseQuery' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]json5\b.lib\b.\w*\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /=_interopRequire(Wildcard|Default)\(/g, replace: '=(' },
              {
                search:
                  /\btry\s*\{\s*for\s*\(var .*?\b_iterator\d*\s*=\s*(\w+)\[Symbol\.iterator\]\(\).*?\)\s*\{\s*var (\w+)\s*=\s*_step\d*\.value\b;?([\s\S]*?)\}\s*\}\s*catch\s*\(\w+\)\s*\{\s*_didIteratorError[\s\S]*?\)\s*(\{\s*throw _iteratorError\d*;?\s*\}|throw _iteratorError\d*;?)\s*\}\s*\}/g,
                replace: 'for (var $2 of $1) { $3 }',
              },
            ],
          },
        },
      ],
    },
    resolve: {
      alias: { json5$: path.resolve(__dirname, 'node_modules/json5/lib/parse.js') },
    },
  }),
  webpackConfig('/yargs', {
    entry: { 'vendor/yargs': './node_modules/yargs/index' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules[\\/](yargs\b.(index|yargs)|require-main-\w*.index)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /(,|\|\|) require(\)|;?$)/gm, replace: '$1 __non_webpack_require__$2' },
        },
        {
          test: /node_modules[\\/](yargs\b.lib.apply-extends|yargs-parser\b.index)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire((\.resolve)?\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
      ],
    },
  }),
  //
  webpackConfig('/webpack-cli', {
    entry: { 'bin/cli': './node_modules/webpack-cli/bin/cli' },
    externals: {
      webpack: 'commonjs2 webpack',
      'v8-compile-cache': 'commonjs2 ../vendor/v8-compile-cache',
      'loader-utils': 'commonjs2 ../lib/loader-utils',
      'enhanced-resolve': 'commonjs2 ../lib/enhanced-resolve',
      micromatch: 'commonjs2 ../vendor/micromatch',
      // 'import-local': 'commonjs2 ../vendor/import-local',
      yargs: 'commonjs2 ../vendor/yargs',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]interpret\b.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /^var (path = require|mjsStub = path)\b/gm, replace: '//$&' },
              {
                search: ' mjsStub,',
                replace: ` {module:'mjs-stub', register:function(hook){ ${getFileContent('interpret/mjs-stub.js')} }},`,
              },
              { search: /\brequire(\.extensions)\b/g, replace: '__non_webpack_require__$1' },
            ],
          },
        },
        {
          test: /node_modules[\\/](webpack-cli\b.bin.utils.(prompt|convert)-\w*|import-local\b.index)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire((\.resolve)?\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
        {
          test: /node_modules[\\/]webpack-cli\b.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"repository":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: '{LICENSE*,*.md}', context: 'node_modules/webpack-cli' },
        {
          from: 'node_modules/webpack-cli/package.json',
          transform(content) {
            const pkg = JSON.parse(String(content).replace(/"scripts"$/m, '"lib", "vendor"'));

            pkg.devDependencies = pkg.dependencies;
            ['dependencies', 'scripts', 'husky', 'lint-staged', 'jest', 'nyc', 'config'].forEach((k) => delete pkg[k]);

            return (pkg.version += '-0'), JSON.stringify(pkg, null, 2) + '\n';
          },
        },
        { from: 'node_modules/v8-compile-cache/*.js', to: 'vendor/[name].[ext]', transform: minifyContent },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
  }),
];
