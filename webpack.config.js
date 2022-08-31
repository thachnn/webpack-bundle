'use strict';

const path = require('path');
const { minify: terserMinify } = require('terser'); // ./dist/vendor/terser
// const { TerserPlugin, CopyPlugin, ReplaceCodePlugin } = require('./dist/');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceCodePlugin = require('./scripts/ReplaceCodePlugin');

/** @typedef {import("webpack").Configuration} Configuration */

/** @typedef {{ from: String, to?: String | Function, context?: String, transform?: Function }} ObjectPattern */

/** @type {import("terser").MinifyOptions} */
const baseTerserOpts = {
  compress: { passes: 1 },
  mangle: false,
  output: { comments: false, beautify: true, indent_level: 2 },
};

/**
 * @param {String} name
 * @param {Configuration} config
 * @returns {Configuration}
 */
const webpackConfig = (name, config, clean = name.charAt(0) !== '/') =>
  Object.assign(config, {
    mode: 'production',
    name: clean ? name : name.substring(1),
    output: Object.assign({ path: path.join(__dirname, 'dist', clean ? name : '') }, config.output || {}),
    context: __dirname,
    target: 'node',
    node: { __filename: false, __dirname: false },
    cache: true,
    stats: { modules: true, maxModules: Infinity, children: true },
    optimization: {
      nodeEnv: false,
      // minimize: false,
      minimizer: [
        new TerserPlugin({
          test: /(\.m?js|[\\/][^.]+)$/i,
          cache: true,
          parallel: true,
          terserOptions: Object.assign({}, baseTerserOpts, ((config.optimization || {}).minimizer || [])[0] || {}),
          extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
        }),
      ],
    },
  });

const minifyContent = (content, opts = {}) =>
  terserMinify(String(content), Object.assign({}, baseTerserOpts, typeof opts === 'object' ? opts : {})).code;

module.exports = [
  webpackConfig('/ajv', {
    entry: { 'vendor/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/schema-utils', {
    entry: { 'lib/schema-utils': './node_modules/schema-utils/src/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { ajv: 'commonjs2 ../vendor/ajv' },
  }),
  //
  webpackConfig('/wasm-ast', {
    entry: { 'vendor/wasm-ast': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
  }),
  webpackConfig('/wasm-parser', {
    entry: { 'vendor/wasm-parser': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    externals: { '@webassemblyjs/ast': 'commonjs ./wasm-ast' },
  }),
  webpackConfig('/wasm-edit', {
    entry: { 'vendor/wasm-edit': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ./wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ./wasm-parser',
    },
  }),
  //
  webpackConfig('/glob', {
    entry: { 'vendor/glob': './node_modules/glob/glob' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/globby', {
    entry: { 'vendor/globby': './node_modules/globby/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { glob: 'commonjs2 ./glob' },
  }),
  webpackConfig('/loader-utils', {
    entry: { 'lib/loader-utils': './node_modules/loader-utils/lib/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/find-cache-dir', {
    entry: { 'vendor/find-cache-dir': './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/copy-plugin', {
    entry: { 'lib/copy-plugin': './node_modules/copy-webpack-plugin/dist/cjs' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      cacache: 'commonjs2 ../vendor/cacache',
      'find-cache-dir': 'commonjs2 ../vendor/find-cache-dir',
      globby: 'commonjs2 ../vendor/globby',
      'schema-utils': 'commonjs2 ./schema-utils',
      'loader-utils': 'commonjs2 ./loader-utils',
    },
    module: {
      rules: [
        {
          test: /node_modules.copy-webpack-plugin.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"license":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
  }),
  //
  webpackConfig('/readable-stream', {
    entry: { 'vendor/readable-stream': './node_modules/readable-stream/readable' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/mississippi', {
    entry: { 'vendor/mississippi': './node_modules/mississippi/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: { 'readable-stream': 'commonjs2 ./readable-stream' },
  }),
  webpackConfig('/cacache', {
    entry: { 'vendor/cacache': './node_modules/cacache/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      glob: 'commonjs2 ./glob',
      'readable-stream': 'commonjs2 ./readable-stream',
      mississippi: 'commonjs2 ./mississippi',
      async_hooks: 'commonjs2 async_hooks',
    },
    module: {
      rules: [
        {
          test: /node_modules.cacache.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"description":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
  }),
  //
  webpackConfig('/terser', {
    entry: { 'vendor/terser': './node_modules/terser/main' },
    output: { library: 'Terser', libraryTarget: 'umd' },
  }),
  webpackConfig('/webpack-sources', {
    entry: { 'lib/webpack-sources': './node_modules/webpack-sources/lib/index' },
    output: { libraryTarget: 'commonjs2' },
  }),
  webpackConfig('/terser-plugin', {
    entry: {
      'lib/terser-plugin': './node_modules/terser-webpack-plugin/dist/cjs',
      'lib/terser-worker': './node_modules/terser-webpack-plugin/dist/worker',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      cacache: 'commonjs2 ../vendor/cacache',
      'find-cache-dir': 'commonjs2 ../vendor/find-cache-dir',
      terser: 'commonjs2 ../vendor/terser',
      'worker-farm': 'commonjs2 ../vendor/worker-farm',
      'schema-utils': 'commonjs2 ./schema-utils',
      'webpack-sources': 'commonjs2 ./webpack-sources',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.terser-webpack-plugin.dist.TaskRunner\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: " require.resolve('./worker')",
            replace: " require('path').resolve(__dirname, './terser-worker.js')",
          },
        },
        {
          test: /node_modules.terser-webpack-plugin.dist.worker\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: ", 'require'(.*) require,",
            flags: '',
            replace: ", 'require', '__webpack_require__'$1 require('originalRequire'), __webpack_require__,",
          },
        },
        {
          test: /node_modules.(terser-webpack-plugin|terser).package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"(engines|repository)":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /worker\.js$/i }),
    ],
  }),
  //
  webpackConfig('/worker-farm', {
    entry: { 'vendor/worker-farm': './node_modules/worker-farm/lib/index' },
    output: { libraryTarget: 'commonjs2' },
    module: {
      rules: [
        {
          test: /node_modules.worker-farm.lib.fork\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: " require.resolve('./child/index')",
            replace: " require('path').resolve(__dirname, './worker-child.js')",
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
  }),
  webpackConfig('/chokidar', {
    entry: { 'vendor/chokidar': './node_modules/chokidar/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: ['fsevents'],
  }),
  webpackConfig('/webpack', {
    entry: {
      'lib/webpack': './node_modules/webpack/lib/webpack',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      '@webassemblyjs/ast': 'commonjs ../vendor/wasm-ast',
      '@webassemblyjs/wasm-parser': 'commonjs ../vendor/wasm-parser',
      '@webassemblyjs/wasm-edit': 'commonjs ../vendor/wasm-edit',
      ajv: 'commonjs2 ../vendor/ajv',
      micromatch: 'commonjs2 ../vendor/micromatch',
      'loader-utils': 'commonjs2 ./loader-utils',
      'schema-utils': 'commonjs2 ./schema-utils',
      'terser-webpack-plugin': 'commonjs2 ./terser-plugin',
      'copy-webpack-plugin': 'commonjs2 ./copy-plugin',
      chokidar: 'commonjs2 ../vendor/chokidar',
      'readable-stream': 'commonjs2 ../vendor/readable-stream',
      'webpack-sources': 'commonjs2 ./webpack-sources',
      inspector: 'commonjs2 inspector',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.webpack.lib.webpack\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: '^(\\s*)WatchIgnorePlugin: \\(\\) => ',
            flags: 'm',
            replace:
              '$1TerserPlugin: () => require("terser-webpack-plugin"),\n\
              CopyPlugin: () => require("copy-webpack-plugin"),\n\
              ReplaceCodePlugin: () => require("../../../scripts/ReplaceCodePlugin"),\n$&',
          },
        },
        {
          test: /node_modules.loader-runner.lib.loadLoader\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              // Node.js 6 doesn't support dynamic `import()`
              { search: '& typeof System.import ==', replace: '& typeof System.import !=' },
              { search: '.import(loader.path)', replace: '.import(/* webpackIgnore: true */ loader.path)' },
              { search: ' require(loader.path)', replace: 'require("originalRequire")(loader.path)' },
            ],
          },
        },
        {
          test: /node_modules.webpack.lib.(dependencies.SystemPlugin|node.NodeSourcePlugin).js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              {
                search: '\\brequire\\.resolve\\((["`])node-libs-browser',
                flags: 'g',
                replace: 'require("path").resolve(__dirname, $1../web_modules',
              },
              { search: 'require.resolve("../../buildin', replace: 'require("path").resolve(__dirname, "../buildin' },
            ],
          },
        },
        {
          test: /node_modules.node-libs-browser.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: '^', flags: '', replace: "const path = require('path');\n" },
              {
                search: "\\brequire\\.resolve\\('(.*?)/?'\\)",
                flags: 'g',
                replace: "path.resolve(__dirname, '../web_modules/$1')",
              },
            ],
          },
        },
        {
          test: /node_modules.(webpack|elliptic|estraverse|esrecurse|eslint-scope).package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: '("name": ".*")[\\s\\S]*?("version": ".*")[\\s\\S]*', flags: '', replace: '$1,$2}' },
        },
      ],
    },
    plugins: [
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require' }),
      /** @type {Array<ObjectPattern | string>} */
      new CopyPlugin([
        { from: '{LICENSE*,*.md,declarations/**}', context: path.join(__dirname, 'node_modules', 'webpack') },
        {
          from: 'node_modules/webpack/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            pkg.devDependencies = pkg.dependencies;
            ['dependencies', 'scripts', 'bin', 'web', 'jest', 'husky', 'lint-staged'].forEach((k) => delete pkg[k]);

            pkg.optionalDependencies = require('chokidar/package.json').optionalDependencies;
            pkg.version += '-0';
            return JSON.stringify(pkg, null, 2).replace('"schemas/"', '"vendor/"');
          },
        },
        { from: 'node_modules/webpack/buildin/', to: 'buildin/', transform: minifyContent },
      ]),
    ],
  }),
  //
  webpackConfig('/node-libs', {
    entry: {
      assert: './node_modules/assert/assert',
      buffer: './node_modules/buffer/index',
      'crypto-browserify': './node_modules/crypto-browserify/index',
      'stream-http': './node_modules/stream-http/index',
      'querystring-es3': './node_modules/querystring-es3/index',
      'stream-browserify': './node_modules/stream-browserify/index',
      'readable-stream/readable': './node_modules/readable-stream/readable',
      'readable-stream/writable': './node_modules/readable-stream/writable',
      string_decoder: './node_modules/string_decoder/lib/string_decoder',
      'util/util': './node_modules/util/util',
      'timers-browserify': './node_modules/timers-browserify/main',
      url: './node_modules/url/url',
      'browserify-zlib': './node_modules/browserify-zlib/lib/index',
    },
    output: { path: path.join(__dirname, 'dist', 'web_modules'), libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/node-libs-browser/mock/', to: 'mock/', transform: minifyContent },
        { from: 'node_modules/constants-browserify/constants.json', to: 'constants-browserify.json' },
        {
          from: 'node_modules/{events/even*,punycode/puny*,{domain-browser/sour*,{console,https,path,tty,vm}-browserify}/index}.js',
          transform: minifyContent,
          transformPath: (_, file) => `${/\bnode_modules[\\/]([^\\/]+)/.exec(file)[1]}.js`,
        },
        {
          from: 'node_modules/{readable-stream/{passthrou*,duplex,transform},{os-browserify,process}/browser}.js',
          transform: minifyContent,
          transformPath: (_, file) => `${/\bnode_modules[\\/]([^\\/]+)/.exec(file)[1]}/${path.basename(file)}`,
        },
      ]),
    ],
  }),
];
