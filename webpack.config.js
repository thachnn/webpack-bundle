'use strict';

const fs = require('fs');
const path = require('path');
const { minify: terserMinify } = require('terser'); // ./dist/vendor/terser
// const { TerserPlugin, CopyPlugin, BannerPlugin, ReplaceCodePlugin } = require('./dist/');
const { BannerPlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceCodePlugin = require('./scripts/ReplaceCodePlugin');

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
    test: /(\.m?js|[\\/][\w-]+)$/i,
    cache: true,
    // parallel: true,
    terserOptions: Object.assign({}, baseTerserOpts, (opt || {}).terserOptions),
    extractComments: { condition: 'some', banner: false },
  });

const minifyContent = (content, opts = null) =>
  terserMinify(String(content), Object.assign({}, baseTerserOpts, typeof opts === 'object' ? opts : null)).code;

const wasmConfig = (name) =>
  webpackConfig(name, {
    output: { libraryTarget: 'commonjs' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]@webassemblyjs\b.*\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /(?<!\bfunction )\b_(typeof\()/g, replace: '$1' },
              { search: /\b_extends(\([^)])/g, replace: 'Object.assign$1' },
              { search: /\b_slicedToArray\((.*), \d+\)/g, replace: '$1' },
              { search: /(?<!\bfunction )\b_toConsumableArray\(/g, replace: '(' },
            ],
          },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: /(?<!\bfunction )\b\w+_(createClass|classCallCheck)\(/g, replace: '_$1(' }),
    ],
  });

module.exports = [
  webpackConfig('/ajv', {
    entry: { 'vendor/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'uri-js': 'commonjs2 ./uri-js' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/uri-js/dist/es5/uri.all.js', to: 'vendor/uri-js.js', transform: minifyContent },
      ]),
    ],
  }),
  webpackConfig('/ajv-keywords', {
    entry: { 'vendor/ajv-keywords': './node_modules/ajv-keywords/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/schema-utils', {
    entry: { 'lib/schema-utils': './node_modules/schema-utils/src/validateOptions' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      'ajv-keywords': 'commonjs2 ../vendor/ajv-keywords',
      ajv: 'commonjs2 ../vendor/ajv',
    },
  }),
  //
  Object.assign(wasmConfig('/wasm-ast'), {
    entry: { 'vendor/wasm-ast': './node_modules/@webassemblyjs/ast/esm/index' },
  }),
  Object.assign(wasmConfig('/wasm-parser'), {
    entry: { 'vendor/wasm-parser': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    externals: { '@webassemblyjs/ast': 'commonjs ./wasm-ast' },
  }),
  Object.assign(wasmConfig('/wasm-edit'), {
    entry: { 'vendor/wasm-edit': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ./wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ./wasm-parser',
    },
  }),
  //
  webpackConfig('/loader-utils', {
    entry: { 'lib/loader-utils': './node_modules/loader-utils/lib/index' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]json5\b.lib.\w+\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /(= *)_interopRequire\w+/, replace: '$1' },
        },
      ],
    },
    resolve: {
      alias: { 'big.js$': path.resolve(__dirname, 'node_modules/big.js/big.js') },
    },
  }),
  webpackConfig('/replace-loader', {
    entry: { 'lib/replace-loader': './node_modules/string-replace-loader/lib/processChunk' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      'loader-utils': 'commonjs2 ./loader-utils',
      'schema-utils': 'commonjs2 ./schema-utils',
    },
  }),
  //
  webpackConfig('/minimatch', {
    entry: { 'vendor/minimatch': './node_modules/minimatch/minimatch' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/glob', {
    entry: { 'vendor/glob': './node_modules/glob/glob' },
    output: { libraryTarget: 'commonjs2' },
    externals: { minimatch: 'commonjs2 ./minimatch' },
  }),
  webpackConfig('/find-cache-dir', {
    entry: { 'vendor/find-cache-dir': './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/copy-plugin', {
    entry: { 'lib/copy-plugin': './node_modules/copy-webpack-plugin/dist/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      cacache: 'commonjs2 ../vendor/cacache',
      'find-cache-dir': 'commonjs2 ../vendor/find-cache-dir',
      minimatch: 'commonjs2 ../vendor/minimatch',
      glob: 'commonjs2 ../vendor/glob',
      'schema-utils': 'commonjs2 ./schema-utils',
      'loader-utils': 'commonjs2 ./loader-utils',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]copy-webpack-plugin.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"license":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
  }),
  //
  webpackConfig('/bluebird', {
    entry: { 'vendor/bluebird': './node_modules/bluebird/js/release/bluebird' },
    output: { libraryTarget: 'commonjs2' },
    // externals: { async_hooks: 'commonjs2 async_hooks' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]bluebird\b.js\b.release.(call_get|join|promisify)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / *(\\n\\\n +)+/g, replace: '\\n\\\n ' },
        },
      ],
    },
  }),
  webpackConfig('/readable-stream', {
    entry: { 'vendor/readable-stream': './node_modules/readable-stream/readable' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]readable-stream\b.lib\b.*\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: " require('safe-buffer')", replace: " require('buffer')" },
              { search: " require('process-nextick-args')", replace: ' process' },
              { search: /\b(require\(['"]string_decoder)\//g, replace: '$1' },
              { search: " require('util-deprecate')", replace: " require('util').deprecate" },
              { search: " require('isarray')", replace: ' Array.isArray' },
              { search: "Object.create(require('core-util-is'))", replace: "require('util')" },
              { search: /^util\.inherits *= *require\b/m, replace: '//$&' },
              { search: "require('./internal/streams/stream')", replace: "require('stream')" },
              { search: '.keys || function (', replace: '.keys; function objKeys(' },
            ],
          },
        },
      ],
    },
  }),
  webpackConfig('/graceful-fs', {
    entry: { 'vendor/graceful-fs': './node_modules/graceful-fs/graceful-fs' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/cacache', {
    entry: { 'vendor/cacache': './node_modules/cacache/locales/en.js' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      bluebird: 'commonjs2 ./bluebird',
      glob: 'commonjs2 ./glob',
      'readable-stream': 'commonjs2 ./readable-stream',
      'graceful-fs': 'commonjs2 ./graceful-fs',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/](concat|duplexify|flush|from2|pumpify)\b.*index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\(['"])(inherits)(['"]\))/, replace: '$1util$3.$2' },
        },
        {
          test: /node_modules[\\/]mississippi\b.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^.*\bexports\.(each|duplex|parallel) *= *require\b/gm, replace: '//$&' },
        },
        {
          test: /node_modules[\\/]cacache\b.*\b[\w-]+\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^(setLocale\(|(const (Y|setLocale)|x\.setLocale) *=)/gm, replace: '//$&' },
              { search: /(\(\s*)Y`/g, replace: '$1`' },
            ],
          },
        },
        {
          test: /node_modules[\\/]cacache\b.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"description":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    resolve: {
      alias: { '../verify.js$': path.resolve(__dirname, 'node_modules/cacache/lib/verify.js') },
    },
  }),
  //
  webpackConfig('/source-map', {
    entry: { 'vendor/source-map': './node_modules/source-map/source-map' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/terser-bin', {
    entry: { 'bin/terser': './node_modules/terser/bin/terser' },
    externals: {
      '..': 'commonjs2 ../vendor/terser',
      acorn: 'commonjs ../vendor/acorn',
      'source-map': 'commonjs2 ../vendor/source-map',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]terser\b.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"engines":[\s\S]*/, replace: '\n}' },
        },
        {
          test: /node_modules[\\/]source-map-support.source-map-support\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / dynamicRequire\(module,/g, replace: ' __non_webpack_require__(' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/acorn/dist/acorn.js', to: 'vendor/', transform: minifyContent }, //
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    ],
  }),
  webpackConfig('/webpack-sources', {
    entry: { 'lib/webpack-sources': './node_modules/webpack-sources/lib/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'source-map': 'commonjs2 ../vendor/source-map' },
  }),
  webpackConfig('/terser-plugin', {
    entry: { 'lib/terser-plugin': './node_modules/terser-webpack-plugin/dist/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      cacache: 'commonjs2 ../vendor/cacache',
      'find-cache-dir': 'commonjs2 ../vendor/find-cache-dir',
      'source-map': 'commonjs2 ../vendor/source-map',
      terser: 'commonjs2 ../vendor/terser',
      'worker-farm': 'commonjs2 ../vendor/worker-farm',
      'schema-utils': 'commonjs2 ./schema-utils',
      'webpack-sources': 'commonjs2 ./webpack-sources',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]terser-webpack-plugin\b.dist.TaskRunner\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /\brequire(\.resolve\(['"])\.\/worker\b/,
            replace: '__non_webpack_require__$1./terser-worker',
          },
        },
        {
          test: /node_modules[\\/](terser-webpack-plugin|terser).package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /^(\s*)("name":.*")[\s\S]*\n\1("version":.*")[\s\S]*/m, replace: '$2,$3}' },
        },
        {
          test: /node_modules[\\/]webpack\b.lib.ModuleFilenameHelpers\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^const createHash *= *require\b/m, replace: '//$&' },
              { search: /^ModuleFilenameHelpers\.(?!match)(\w+) *=/gm, replace: 'const $1 =' },
            ],
          },
        },
      ],
    },
  }),
  //
  webpackConfig('/terser-worker', {
    entry: { 'lib/terser-worker': './node_modules/terser-webpack-plugin/dist/worker' },
    output: { libraryTarget: 'commonjs2' },
    externals: { terser: 'commonjs2 ../vendor/terser' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]terser-webpack-plugin\b.dist.worker\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /(, 'require')(.*) require,/,
            replace: "$1, '__webpack_require__'$2 __non_webpack_require__, __webpack_require__,",
          },
        },
      ],
    },
  }),
  webpackConfig('/worker-farm', {
    entry: { 'vendor/worker-farm': './node_modules/worker-farm/lib/index' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]worker-farm\b.lib.fork\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /\brequire(\.resolve\(['"])\.\/child\/index\b/,
            replace: '__non_webpack_require__$1./worker-child',
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/worker-farm/lib/child/index.js', to: 'vendor/worker-child.js', transform: minifyContent },
      ]),
    ],
  }),
  //
  webpackConfig('/micromatch', {
    entry: { 'vendor/micromatch': './node_modules/micromatch/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'source-map': 'commonjs2 ./source-map' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]((micro|nano)match|braces|fill|expand|extglob|(to-)?regex|snapdragon|set-value|split)\b.*\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire\(['"]extend-shallow['"]\)/g, replace: 'Object.assign' },
        },
        {
          test: /node_modules[\\/](snapdragon-util|object-copy|to-object-path)\b.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\(['"])(kind-of['"]\))/g, replace: '$1is-number/node_modules/$2' },
        },
      ],
    },
  }),
  webpackConfig('/eh-resolve', {
    entry: { 'lib/enhanced-resolve': './node_modules/enhanced-resolve/lib/node' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'graceful-fs': 'commonjs2 ../vendor/graceful-fs' },
  }),
  webpackConfig('/chokidar', {
    entry: { 'vendor/chokidar': './node_modules/chokidar/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: ['fsevents'],
    resolve: {
      alias: {
        picomatch$: path.resolve(__dirname, 'node_modules/picomatch/lib/picomatch.js'),
        'binary-extensions$': path.resolve(__dirname, 'node_modules/binary-extensions/binary-extensions.json'),
      },
    },
  }),
  webpackConfig('/webpack', {
    entry: { 'lib/webpack': './node_modules/webpack/lib/webpack' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ../vendor/wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ../vendor/wasm-parser',
      '@webassemblyjs/wasm-edit': 'commonjs ../vendor/wasm-edit',
      acorn: 'commonjs ../vendor/acorn',
      'ajv-keywords': 'commonjs2 ../vendor/ajv-keywords',
      ajv: 'commonjs2 ../vendor/ajv',
      micromatch: 'commonjs2 ../vendor/micromatch',
      'loader-utils': 'commonjs2 ./loader-utils',
      'schema-utils': 'commonjs2 ./schema-utils',
      'terser-webpack-plugin': 'commonjs2 ./terser-plugin',
      'copy-webpack-plugin': 'commonjs2 ./copy-plugin',
      chokidar: 'commonjs2 ../vendor/chokidar',
      'neo-async': 'commonjs2 ../vendor/neo-async',
      'readable-stream': 'commonjs2 ../vendor/readable-stream',
      'graceful-fs': 'commonjs2 ../vendor/graceful-fs',
      'enhanced-resolve': 'commonjs2 ./enhanced-resolve',
      'webpack-sources': 'commonjs2 ./webpack-sources',
      // inspector: 'commonjs2 inspector',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]loader-runner\b.lib.loadLoader\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              // Node.js 6 doesn't support dynamic `import()`
              { search: /\bSystem\b/g, replace: '__non_webpack_System' },
              { search: /\brequire(\(\w+)/, replace: '__non_webpack_require__$1' },
            ],
          },
        },
        {
          test: /node_modules[\\/]webpack\b.lib.(node.NodeSourcePlugin|dependencies.SystemPlugin)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\brequire(\.resolve\(["`])node[\w-]+/g, replace: '__non_webpack_require__$1../web_modules' },
              { search: /\brequire(\.resolve\(['"])(\.\.\/)+/g, replace: '__non_webpack_require__$1../' },
            ],
          },
        },
        {
          test: /node_modules[\\/]node-libs-browser\b.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /\brequire(\.resolve\(['"])(.*?)(\/|(?:\/browser|\/util)?\.js)?(['"]\))/g,
            replace: '__non_webpack_require__$1../web_modules/$2$4',
          },
        },
        //
        {
          test: /node_modules[\\/]webpack\b.lib.(dependencies.AMDPlugin|node.Node(Environment|Source)Plugin)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /\b(require\(['"]enhanced-resolve)\/lib\/(\w+)(['"]\))/g, replace: '$1$3.$2' },
              { search: /(\(\s*__dirname)(,\s*['"]\.\.['"]){2,}/g, replace: '$1$2' },
            ],
          },
        },
        {
          test: /node_modules[\\/]estraverse\b.estraverse\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^ *exports\.(?!Syntax\b|VisitorKeys)(\w+) *= *\1/gm, replace: '//$&' },
              { search: /^ *(\w+)\.prototype[.\['"]+(\w+)['"\]]* *= *(function)( \w*)?\(/gm, replace: '$3 $1_$2(' },
            ],
          },
        },
        {
          test: /node_modules[\\/](webpack|estraverse|esrecurse|eslint-scope)\b.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /^(\s*)("name":.*)[\s\S]*\n\1("version":.*")[\s\S]*/m, replace: '$2$3}' },
        },
      ],
    },
    resolve: {
      alias: {
        '@webassemblyjs/helper-module-context': __dirname + '/node_modules/@webassemblyjs/helper-module-context/lib',
      },
    },
    plugins: [
      /** @type {Array<(ObjectPattern|string)>} */
      new CopyPlugin([
        { from: '{LICENSE*,*.md,declarations/**}', context: 'node_modules/webpack' },
        {
          from: 'node_modules/webpack/package.json',
          transform(content) {
            const pkg = JSON.parse(String(content).replace('"schemas/"', '"vendor/"'));
            pkg.devDependencies = pkg.dependencies;
            ['dependencies', 'scripts', 'bin', 'web', 'jest', 'husky', 'lint-staged'].forEach((k) => delete pkg[k]);

            pkg.optionalDependencies = require('chokidar/package.json').optionalDependencies;
            return (pkg.version += '-1'), JSON.stringify(pkg, null, 2) + '\n';
          },
        },
        { from: 'node_modules/webpack/buildin/', to: 'buildin/', transform: minifyContent },
        { from: 'node_modules/neo-async/async.js', to: 'vendor/neo-async.js', transform: minifyContent },
      ]),
      new ReplaceCodePlugin({ search: /__non_webpack_System\b/g, replace: 'System' }),
    ],
  }),
  //
  webpackConfig('/node-libs', {
    entry: {
      'crypto-browserify': './node_modules/crypto-browserify/index',
      assert: './node_modules/assert/assert',
      buffer: './node_modules/buffer/index',
      'stream-http': './node_modules/stream-http/index',
      'querystring-es3': './node_modules/querystring-es3/index',
      'readable-stream/readable': './node_modules/readable-stream/readable',
      string_decoder: './node_modules/string_decoder/lib/string_decoder',
      util: './node_modules/util/util',
      url: './node_modules/url/url',
      'browserify-zlib': './node_modules/browserify-zlib/lib/index',
    },
    output: { path: path.join(__dirname, 'dist', 'web_modules'), libraryTarget: 'commonjs2' },
    externals: {
      'util/': 'commonjs2 ./util',
      querystring: 'commonjs2 ./querystring-es3',
      punycode: 'commonjs2 ./punycode',
      'string_decoder/': 'commonjs2 ../string_decoder',
      'util/util': 'commonjs2 ../util',
      'readable-stream': 'commonjs2 ./readable-stream/readable',
      string_decoder: 'commonjs2 ./string_decoder',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]readable-stream\b.lib\b.*\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\(['"])(util-)?(deprecate|inherits)(['"]\))/g, replace: '$1util/util$4.$3' },
        },
        {
          test: /node_modules[\\/]elliptic\b.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"description":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    resolve: {
      // aliasFields: ['browser'],
      alias: [
        ...['create-hash', 'create-hmac', 'browserify-aes', 'browserify-cipher', 'browserify-sign'],
        ...['builtin-status-codes', 'randombytes', 'diffie-hellman'],
      ].reduce((o, v) => ((o[v + '$'] = require.resolve(v + '/browser')), o), {
        './support/isBuffer': __dirname + '/node_modules/util/support/isBufferBrowser',
        './internal/streams/stream': __dirname + '/node_modules/readable-stream/lib/internal/streams/stream-browser',
        'browserify-sign/algos$': __dirname + '/node_modules/browserify-sign/browser/algorithms.json',
      }),
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/node-libs-browser/mock/', to: 'mock/', transform: minifyContent },
        { from: 'node_modules/constants-browserify/constants.json', to: 'constants-browserify.json' },
        {
          from: 'node_modules/{events/events,punycode/puny*,{domain-browser/source,{console,https,path,tty,vm}-browserify}/index,{os-browserify,process}/browser}.js',
          transform: minifyContent, // replace(/\b(require\(")((assert|util|events|url)"\))/g, '$1./$2')
          transformPath: (_, file) => `${file.match(/(?<=\bnode_modules[\\/])[^\\/]+/)[0]}.js`,
        },
        { from: 'readable-stream/{pass*,duplex,transform}.js', context: 'node_modules', transform: minifyContent },
        {
          from: 'node_modules/readable-stream/duplex.js',
          to: 'readable-stream/writable.js',
          transform: (content) => minifyContent(content).replace('.Duplex;', '.Writable;'),
        },
        {
          from: 'node_modules/timers-browserify/main.js',
          to: 'timers-browserify.js',
          transform(content) {
            const s = fs.readFileSync(path.resolve(__dirname, 'node_modules/setimmediate/setImmediate.js'));
            return minifyContent(String(content).replace('require("setimmediate");', s));
          },
        },
        {
          from: 'node_modules/stream-browserify/index.js',
          to: 'stream-browserify.js',
          transform: (s) =>
            minifyContent(String(s).replace(/\('(inherits)'\)/, '("./util").$1')).replace(/\("(readable-)/g, '("./$1'),
        },
      ]),
    ],
  }),
];
