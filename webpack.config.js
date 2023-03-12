'use strict';

const path = require('path');
const fs = require('fs');
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

const resolveDepPath = (rel, alt = '', base = 'node_modules') =>
  fs.existsSync((rel = path.resolve(__dirname, base, rel))) ? rel : alt && path.resolve(__dirname, base, alt);

let babelPresetPlugins = () => {
  const re = /(?<=\brequire\(")@babel\/(plugin-|preset-modules\/lib\/plugins\/)[^"]+/g;
  const file = resolveDepPath('@babel/preset-env/lib/available-plugins.js');

  const data = fs.readFileSync(file, 'utf8').match(re);
  babelPresetPlugins = () => data;
  return data;
};

module.exports = [
  webpackConfig('chalk', {
    entry: { index: './node_modules/chalk/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    module: {
      rules: [
        {
          test: /node_modules.ansi-styles.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /^Object\.defineProperty\(module, *('|")exports\1, *\{[^{}]*\bget: *(\w+)\s*\}\)/m,
            replace: 'module.exports = $2()',
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{license*,readme*,*.js.flow,types/*.d.ts}', context: 'node_modules/chalk' },
        {
          from: 'node_modules/chalk/package.json',
          transform: (content) => String(content).replace(/,\s*"(d(evD)?ependencies|scripts|xo)": *\{[^{}]*\}/g, ''),
        },
      ]),
    ],
  }),
  webpackConfig('regexpu-core', {
    entry: { 'rewrite-pattern': './node_modules/regexpu-core/rewrite-pattern' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    module: {
      rules: [
        {
          test: /node_modules.(regenerate.regenerate|regjsgen.regjsgen|regjsparser.node_modules.jsesc.jsesc)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /^;\(function\(.*\{\s*(['"]use strict.*)?[\s\S]*?\s+root = freeGlobal;\s*\}$/m, replace: '$1' },
              {
                search:
                  /\/\/ Some AMD build optimizers,[\s\S]*?\s+free((Module\.exports|Exports\.\w+) = \w+;)[\s\S]*\(this\)\);$/m,
                replace: (_, p1) => p1[0].toLowerCase() + p1.slice(1),
              },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/regexpu-core/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/regexpu-core/package.json',
          transform: (content) => String(content).replace(/,\s*"scripts":[\s\S]*/, '\n}\n'),
        },
      ]),
    ],
  }),
  webpackConfig('object.assign', {
    entry: { index: './node_modules/object.assign/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.4',
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/object.assign/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/object.assign/package.json',
          transform: (s) => String(s).replace(/,\s*"(d(evD)?ependencies|scripts|testling)": *\{[^{}]*\}/g, ''),
        },
      ]),
    ],
  }),
  //
  webpackConfig('@babel-core', {
    entry: {
      'lib/index': './node_modules/@babel/core/lib/index',
      'lib/types': './node_modules/@babel/types/lib/index',
      'lib/traverse': './node_modules/@babel/traverse/lib/index',
    },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      '@babel/types': 'commonjs ./types',
      '@babel/traverse': 'commonjs ./traverse',
      '@babel/parser': 'commonjs ./parser',
      globals: 'commonjs2 ./globals.json',
      semver: 'commonjs2 ./semver',
      browserslist: 'commonjs2 ./browserslist',
      chalk: 'commonjs2 ./chalk',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.core.lib.config.files.(configuration|plugins|module-types)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: / require(\(\w+|\.resolve\b)/g, replace: ' require("originalRequire")$1' },
        },
        {
          test: /node_modules.@babel.core.lib.config.files.import\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: / import\((\w+)/g, replace: ' import(/* webpackIgnore: true */ $1' },
        },
      ],
    },
    resolve: {
      mainFields: ['main'],
      alias: {
        '@babel/compat-data': resolveDepPath('@babel/compat-data/data'),
      },
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@babel/core/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@babel/core/package.json',
          transform: (content) => String(content).replace(/,\s*"browser":[\s\S]*/, '\n}\n'),
        },
        {
          from: 'node_modules/{globals/globals.*,semver/semver.*,{browserslist,@babel/parser/lib}/index.js}',
          to: ({ absoluteFilename: f }) => `lib/${f.replace(/^.*\bnode_modules(.@[\w-]*)?[\\/]|[\\/].*$/g, '')}[ext]`,
        },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /\bindex\.js$/ }),
    ],
    optimization: {
      minimizer: [{ exclude: /\bbrowserslist\.js$/i }],
    },
  }),
  webpackConfig('@babel-preset', {
    entry: {
      'lib/index': './node_modules/@babel/preset-env/lib/index',
      // 'lib/types': './node_modules/@babel/types/lib/index',
      // 'lib/traverse': './node_modules/@babel/traverse/lib/index',
      'plugins/transform-jsx-spread': './node_modules/@babel/preset-modules/lib/plugins/transform-jsx-spread/index',
      ...babelPresetPlugins().reduce((acc, p) => {
        const m = /^@babel\/(plugin-|preset-modules\/lib\/plugins\/)(.*)/.exec(p);
        acc[`plugins/${m[2]}`] = `./node_modules/${p}/${m[1] === 'plugin-' ? 'lib/index' : 'index'}`;
        return acc;
      }, {}),
    },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      '@babel/core': 'commonjs @babel/core',
      'core-js-compat/entries': 'commonjs2 ./core-js-compat.json',
      globals: 'commonjs2 ../lib/globals.json',
      semver: 'commonjs2 ../lib/semver',
      browserslist: 'commonjs2 ../lib/browserslist',
      chalk: 'commonjs2 ../lib/chalk',
      'regexpu-core': 'commonjs2 ../lib/regexpu-core',
      originalRequire: 'commonjs2 ./originalRequire',
      '@babel/types': 'commonjs ../lib/types',
      '@babel/traverse': 'commonjs ../lib/traverse',
      '@babel/parser': 'commonjs ../lib/parser',
      '@babel/helper-plugin-utils': 'commonjs ../lib/helper-plugin-utils',
      ...babelPresetPlugins().reduce((acc, p) => {
        const re = /^@babel\/(plugin-|preset-modules\/lib\/plugins\/)/;
        acc[p] = `commonjs ../plugins/${p.replace(re, '')}`;
        return acc;
      }, {}),
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.helper-define-polyfill-provider.lib.node.dependencies\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: / require(\(\w+|\.resolve\b)/g, replace: ' require("originalRequire")$1' },
        },
        {
          test: /node_modules.is-core-module.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /^var has *= *require\b/m, replace: '// $&' },
              { search: /\bhas *\(/g, replace: 'Object.prototype.hasOwnProperty.call(' },
            ],
          },
        },
        {
          test: /node_modules.babel-plugin-polyfill-corejs3.lib.[biu][\w-]*\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\(")\.\.\/(core-js-compat\/[\w-]+)(\.js)?("\))/g, replace: '$1$2$4' },
        },
        {
          test: /node_modules.esutils.lib.[\w-]+\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^\(function *\(\) \{\n([\s\S]*)\n\}\(\)\);$/m, replace: '$1' },
        },
      ],
    },
    resolve: {
      mainFields: ['main'],
      alias: {
        '@babel/compat-data': resolveDepPath('@babel/compat-data/data'),
        'babel-plugin-dynamic-import-node/utils$': resolveDepPath('babel-plugin-dynamic-import-node/lib/utils.js'),
      },
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@babel/preset-env/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@babel/preset-env/package.json',
          transform: (content) => String(content).replace(/,\s*"d(evD)?ependencies": *\{[^{}]*\}/g, ''),
        },
        {
          from: 'node_modules/{core-js-compat/entries.json,@babel/helper-plugin-utils/lib/index.js}',
          to: ({ absoluteFilename: f }) => `lib/${f.replace(/^.*\bnode_modules(.@[\w-]*)?[\\/]|[\\/].*$/g, '')}[ext]`,
        },
      ]),
      new ReplaceCodePlugin([
        { search: ' require("./originalRequire")', replace: ' require', test: /\blib[\\/]index\.js$/ },
        { search: /( require\(")\.\.\/lib\//g, replace: '$1./', test: /\blib[\\/][\w-]*\.js$/ },
        { search: /( require\(")\.\.\/plugins\//g, replace: '$1./', test: /\bplugins[\\/][\w-]*\.js$/ },
      ]),
    ],
  }),
  webpackConfig('@babel-flow', {
    entry: {
      'lib/index': './node_modules/@babel/preset-flow/lib/index',
      'plugins/transform-flow-strip-types': './node_modules/@babel/plugin-transform-flow-strip-types/lib/index',
      'plugins/syntax-flow': './node_modules/@babel/plugin-syntax-flow/lib/index',
    },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      '@babel/core': 'commonjs @babel/core',
      '@babel/helper-plugin-utils': 'commonjs ../lib/helper-plugin-utils',
      '@babel/plugin-transform-flow-strip-types': 'commonjs ../plugins/transform-flow-strip-types',
      '@babel/plugin-syntax-flow': 'commonjs ./syntax-flow',
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/@babel/preset-flow/{LICENSE*,README*}', to: '[name][ext]' },
        {
          from: 'node_modules/@babel/preset-flow/package.json',
          transform: (content) => String(content).replace(/,\s*"d(evD)?ependencies": *\{[^{}]*\}/g, ''),
        },
      ]),
      new ReplaceCodePlugin({ search: /( require\(")\.\.\/lib\//g, replace: '$1./', test: /\blib[\\/]\w*\.js$/ }),
    ],
  }),
  //
  webpackConfig('find-cache-dir', {
    entry: { index: './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8',
    externals: { semver: 'commonjs2 ./semver' },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/{find-cache-dir/{license*,*.md},semver/semver.js}', to: '[name][ext]' },
        {
          from: 'node_modules/find-cache-dir/package.json',
          transform: (s) =>
            String(s).replaceBulk([/,\s*"(d(evD)?ependencies|scripts|nyc)": *\{[^{}]*\}/g, ''], ['"index.', '"*.']),
        },
      ]),
    ],
  }),
  webpackConfig('babel-loader', {
    entry: {
      'lib/index': './node_modules/babel-loader/lib/index',
      'lib/schema-utils': './node_modules/schema-utils/dist/validate',
    },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.9',
    externals: {
      'find-cache-dir': 'commonjs2 ./find-cache-dir',
      ajv: 'commonjs2 ./ajv',
      'schema-utils': 'commonjs2 ./schema-utils',
      semver: 'commonjs2 ./semver',
      originalRequire: 'commonjs2 ./originalRequire',
      '@babel/core': 'commonjs @babel/core',
    },
    module: {
      rules: [
        {
          test: /node_modules.schema-utils.dist.validate\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^exports\.default *= *_/m, replace: 'module.exports = $&' },
        },
        {
          test: /node_modules.babel-loader.lib.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: /\b(require\("loader-utils)("\))/, replace: '{ getOptions: $1/lib/getOptions$2 }' },
              { search: /\brequire(\(\w+)/g, replace: 'require("originalRequire")$1' },
              { search: /\{\s*(\w+)\s*\}( *= *require\("\.+\/package\.json"\))/, replace: '$1$2.$1' },
            ],
          },
        },
        {
          test: /node_modules.loader-utils.lib.parseQuery\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\('json5)('\))/, replace: '{ parse: $1/lib/parse$2 }' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/babel-loader/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/babel-loader/package.json',
          transform: (s) =>
            String(s).replace(/,\s*"(d(evD)?ependencies|scripts|nyc|ava|lint-staged)": *\{([^{}]|\{[^{}]*\})*\}/g, ''),
        },
        { from: 'node_modules/{ajv/lib/*.{js,txt},semver/semver.js}', to: 'lib/[name][ext]' },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /\bindex\.js$/ }),
    ],
    optimization: {
      minimizer: [{ exclude: /\b(ajv|uri-js)\.js$/i }],
    },
  }),
];
