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

String.prototype.camelize = function () {
  return this.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase());
};
String.prototype.replaceBulk = function (...arr) {
  return arr.reduce((s, i) => String.prototype.replace.apply(s, i), this);
};

/** Cleanup bundled file of URI.js */
const patchUriJS = (content) =>
  String(content).replaceBulk(
    [/^[\s\S]*\(this, *\(?function *\(exports\) *\{|\n\}\)\)+;?(\n\/\/#.*)?\s*$/g, ''],
    [
      /^\s*for ?\(var _len *= *(arguments)\.length\b.*\) *\{\s+(\w+)(\[_key\]) *= *\1\3;?\s+\}/gm,
      'var $2 = Array.prototype.slice.call($1);',
    ],
    [/^var (slicedTo|toConsumable)Array *= *function\b.*\{\n[\s\S]*?\n\}(\(\))?;?$/gm, ''],
    [/\btoConsumableArray(?=\s*\()/g, 'Array.from'],
    [/\bslicedToArray\s*\(([\w$]+)[^()]*\)/g, '$1'],
    [
      /^(\s*)var _(iterator)NormalCompletion[\s\S]*?\n\s*for *\(var _\2\w* *= *(\w+)\[Symbol\.\2\].*\{\s+var (\w+) *= *_step\w*\.value;?$/gm,
      '$1for (var $4 of $3) {',
    ],
    [/^(\s*)\} *catch\b.*\{\s+_didIteratorError[\s\S]*?\n\1\}$/gm, '']
  );

module.exports = [
  webpackConfig('glob', {
    entry: {
      glob: './node_modules/glob/glob',
      minimatch: './node_modules/minimatch/minimatch',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
    externals: { minimatch: 'commonjs2 ./minimatch' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/glob/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/glob/package.json',
          transform: (content) =>
            String(content).replaceBulk([/"dependencies":[\s\S]*(?="license":)/, ''], ['"common.', '"minimatch.']),
        },
      ]),
    ],
  }),
  webpackConfig('ajv', {
    entry: { 'lib/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    externals: { 'uri-js': 'commonjs ./uri-js' },
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,README*,lib/*.d.ts}', context: 'node_modules/ajv' },
        {
          from: 'node_modules/ajv/package.json',
          transform: (content) =>
            String(content).replace(/"scripts":[\s\S]*(?="repository":)|"dependencies":[\s\S]*(?="collective":)/g, ''),
        },
        { from: 'node_modules/uri-js/dist/es5/uri.all.js', to: 'lib/uri-js.js', transform: patchUriJS },
      ]),
    ],
  }),
  //
  webpackConfig('fast-glob', {
    entry: {
      'out/index': './node_modules/fast-glob/out/index',
      'out/micromatch': './node_modules/micromatch/index',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
    externals: { micromatch: 'commonjs2 ./micromatch' },
    resolve: {
      alias: { picomatch$: path.resolve(__dirname, 'node_modules/picomatch/lib/picomatch.js') },
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/fast-glob/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/fast-glob/package.json',
          transform: (content) => String(content).replace(/,\s*"devDependencies":[\s\S]*/, '\n}\n'),
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
    externals: { 'fast-glob': 'commonjs2 ./fast-glob' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/globby/{license*,readme*,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/globby/package.json',
          transform: (content) =>
            String(content)
              .replace(/"scripts":[\s\S]*(?="files":)|,\s*"dependencies":[\s\S]*(?=\n\})/g, '')
              .replaceBulk(['"gitignore.', '"fast-glob.'], ['"stream-utils.', '"micromatch.']),
        },
      ]),
    ],
  }),
  //
  webpackConfig('@wasm-ast', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: { '@xtuc/long': 'commonjs2 ./long' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/ast/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/ast/package.json',
          transform: (s) => String(s).replace(/,\s*"((d|devD)ependencies": *\{[^{}]*\}|module": *"[^"]*")/g, ''),
        },
        { from: 'node_modules/@xtuc/long/src/long.js', to: 'lib/' },
      ]),
    ],
  }),
  webpackConfig('@wasm-parser', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: {
      '@xtuc/long': 'commonjs2 ./long',
      '@webassemblyjs/ast': 'commonjs ./ast',
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/wasm-parser/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/wasm-parser/package.json',
          transform: (content) =>
            String(content).replace(/,\s*"(((d|devD)ependencies|scripts)": *\{[^{}]*\}|module": *"[^"]*")/g, ''),
        },
      ]),
    ],
  }),
  webpackConfig('@wasm-edit', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: {
      '@xtuc/long': 'commonjs2 ./long',
      '@webassemblyjs/ast': 'commonjs ./ast',
      '@webassemblyjs/wasm-parser': 'commonjs ./parser',
    },
    module: {
      rules: [
        {
          test: /node_modules.@webassemblyjs.(wasm-edit.esm.(index|apply)|wasm-opt.esm.leb128)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(from "@webassemblyjs\/[\w-]+)\/lib\/[^"]+/, replace: '$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@webassemblyjs/wasm-edit/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@webassemblyjs/wasm-edit/package.json',
          transform: (content) =>
            String(content).replace(/,\s*"(((d|devD)ependencies|scripts)": *\{[^{}]*\}|module": *"[^"]*")/g, ''),
        },
      ]),
    ],
  }),
  //
  webpackConfig('terser', {
    entry: {
      main: { import: './node_modules/terser/main', library: { type: 'commonjs' } },
      bin: { import: './node_modules/terser/bin/terser', filename: 'bin/terser' },
      'lib/source-map': { import: './node_modules/source-map/source-map', library: { type: 'commonjs2' } },
    },
    externals: {
      '..': 'commonjs ../main',
      'source-map': 'commonjs2 ./lib/source-map',
    },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: ' require("acorn")', replace: ' require("./lib/acorn")' },
        },
        {
          test: /node_modules.terser.main\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^(export \{ *minify *\}) *from\b.*/m, replace: '$1;' },
        },
        {
          test: /node_modules.terser.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"engines":[\s\S]*/, replace: '\n}' },
        },
        {
          test: /node_modules.source-map-support.source-map-support\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\(')(source-map)('\)\.SourceMapConsumer)/, replace: '$1$2/lib/$2-consumer$3' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{LICENSE*,*.md,tools/*.d.ts}', context: 'node_modules/terser' },
        {
          from: 'node_modules/terser/package.json',
          transform: (content) =>
            String(content)
              .replace(/"type":[\s\S]*(?="types":)|"dependencies":[\s\S]*(?="keywords":)/g, '')
              .replaceBulk([/,\s*"eslintConfig":[\s\S]*/, '\n}\n'], [/\bdist\/bundle\.min\b/g, 'main']),
        },
        { from: 'node_modules/source-map/lib/mappings.wasm', to: 'lib/' },
        {
          from: 'node_modules/acorn/dist/acorn.js',
          to: 'lib/',
          transform: (s) => String(s).replace(/^[\s\S]*\(this, \(?function *\(exports\) \{|\n\}\)+;\s*$/g, ''),
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bbin[\\/][\w.-]+$/ }),
    ],
    optimization: {
      minimizer: [{ test: /(\.[cm]?js|\bbin[\\/][\w-]+)$/i }],
    },
  }),
  //
  webpackConfig('browserslist', {
    entry: {
      index: { import: './node_modules/browserslist/index', library: { type: 'commonjs2' } },
      cli: { import: './node_modules/browserslist/cli' },
    },
    target: 'node6',
    externals: { './': 'commonjs2 ./index' },
    module: {
      rules: [
        {
          test: /node_modules.browserslist.node\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(?=\(\w+|\.resolve\b)/g, replace: '__non_webpack_require__' },
        },
        {
          test: /node_modules.browserslist.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/browserslist/{LICENSE*,README*,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/browserslist/package.json',
          transform: (content) => String(content).replace(/,\s*"(dependencies|browser)": *\{[^{}]*\}/g, ''),
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/ }),
    ],
    optimization: {
      minimizer: [{ exclude: /index\.js$/ }, { test: /index\.js$/, terserOptions: { indent_level: 0 } }],
    },
  }),
];
