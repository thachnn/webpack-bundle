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
    extractComments: { condition: /(@preserve|@lic|@cc_on|^\**!)[^*]/i, banner: false },
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

// Constants for Yarn bundling
const preInstallCmd = 'node ./preinstall.js';

const babelPresetOpt = {
  // debug: true,
  targets: { node: '4' },
  modules: false,
  loose: true,
  exclude: [/^transform-(regenerator|classes|for-of|arrow|function)\b/],
  // useBuiltIns: 'usage',
  // corejs: { version: '3.21.1', proposals: false },
};
const babelRuntimeOpt = { regenerator: false, version: '7.17.9', useESModules: true };

const usedRxjsFn =
  'Subject|defer|empty|from|fromEvent|of|concatMap|filter|flatMap|map|publish|reduce|share|take|takeUntil';

const usedLodashFn = [
  ...['findIndex', 'flatten', 'last', 'uniq'], // Array
  ...['filter', 'find', 'map', 'sum'], // Collection + Math
  ...['clone', 'isArray', 'isBoolean', 'isFunction', 'isNumber', 'isPlainObject', 'isString'], // Lang
  ...['assign', 'defaults', 'extend', 'omit', 'set'], // Object
];

module.exports = [
  webpackConfig('babel-plugin', {
    entry: {
      'build/index': './node_modules/babel-plugin-inline-import/build/index',
    },
    output: { libraryTarget: 'commonjs' },
    target: 'node4',
    module: {
      rules: [
        {
          test: /node_modules[\\/]require-resolve\b.src\b.lib\b.locate\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/babel-plugin-inline-import/{LICENSE*,*.md}', to: '[name][ext]' },
        {
          from: 'node_modules/babel-plugin-inline-import/package.json',
          transform: (content) => String(content).replace(/,\s*"scripts":[\s\S]*/, '\n}\n'),
        },
      ]),
    ],
  }),
  //
  webpackConfig('yarn-cli', {
    entry: { 'lib/cli': './node_modules/yarn/src/cli/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    module: {
      rules: [
        // Transpile to ES5
        {
          test: /node_modules[\\/]yarn\b.src\b.*\.js$/i,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', babelPresetOpt], '@babel/preset-flow'],
            plugins: [
              ['@babel/plugin-transform-runtime', babelRuntimeOpt],
              ['babel-plugin-inline-import', { extensions: ['.tpl.js'] }],
            ],
            overrides: [
              {
                test: /[\\/]src\b.(registries.yarn-registry|cli\b.commands.policies)\.js$/i,
                plugins: ['babel-plugin-array-includes'],
              },
            ],
          },
        },
        {
          test: /\.[cm]?js$/i,
          exclude: [
            /node_modules[\\/](yarn|@babel.runtime)\b/,
            /node_modules[\\/](ajv|arr|array|asap|balanced|bcrypt|braces|bytes|ci|cli-width|code|currently|decode|escape|expand|extend|external|extglob|fast|fill|for|glob-\w*|har|hash|heimdalljs|http|iconv|invariant|is-(ci|deflate|equal|extendable|fullwidth|gzip|number|plain|primitive|windows)|isobject|js-yaml|jsbn|json-schema|kind|leven|loud|micromatch|mime|mute|node|number|object|os|parse|path|prepend|preserve|process|qs|query|randomatic|regex|repeat|request|run|safer?|spdx|strict|strip|tough|tunnel|tweetnacl)\b/,
            /(?<!node_modules[\\/]\w+.)node_modules[\\/](string)\b/,
          ],
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', { ...babelPresetOpt, modules: 'cjs' }]],
            plugins: [['@babel/plugin-transform-runtime', { ...babelRuntimeOpt, useESModules: false }]],
          },
        },
        // Optimize common dependencies
        {
          test: /node_modules[\\/]ssri.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /^module\.exports\.(?!(parse|stringify|from(Hex|Data)|integrityStream)\b)\w+ *=/gm,
            replace: '//$&',
          },
        },
        {
          test: /node_modules[\\/]js-yaml\b.lib\b.js-yaml.loader\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /^(var DEFAULT_FULL_SCHEMA)( *= *require\('\.\/schema)\/default_full\b/m,
            replace: '$1 = module.exports.FAILSAFE_SCHEMA$2/failsafe',
          },
        },
        {
          test: /node_modules[\\/]((safe-buffer|kind-of|spdx-correct).index|(@babel.runtime\b.helpers|(har-validator|http-signature)\b.lib|mute-stream)\b.\w*)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^('use strict';?)?/, replace: "'use strict';\n" },
        },
        {
          test: /node_modules[\\/]yarn\b.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"packageManager":[\s\S]*/, replace: '\n}' },
        },
        // Fix circular dependencies
        {
          test: /node_modules[\\/]yarn\b.src\b.util.execute-lifecycle-script\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^import .*? from '\.+\/cli\/commands\/global\b/m, replace: '//$&' },
        },
        {
          test: /node_modules[\\/]yarn\b.src\b.cli.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /\b(autoRun) *= *module\.children\.length\b(.*;\s*if \()require\.main *=== *module\b/,
            replace: '$1 = 0$2$1',
          },
        },
        {
          test: /node_modules[\\/]hash-for-dep\b.lib.pkg\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\brequire(\(\w+)/g, replace: '__non_webpack_require__$1' },
        },
        // Too old packages
        {
          test: /node_modules[\\/](mz\b.fs|thenify.index)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^var Promise *= *require\(['"]any-promise\b/m, replace: '//$&' },
        },
        {
          test: /node_modules[\\/]heimdalljs\b.dist.heimdalljs\.cjs\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^var rsvp *= *require\b.*([\s\S]* )rsvp\.(Promise)\b/m, replace: "'use strict';$1$2" },
        },
        {
          test: /node_modules[\\/]readable-stream\b.lib._stream_readable\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /\b(require\('string_decoder)\/('\))/g, replace: '$1$2' },
        },
        // Optimize dependencies
        {
          test: /node_modules[\\/]rxjs\b._esm\w*.(operators\b.)?index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: new RegExp(`^export\\s+\\{[^{}]*\\b(?!(${usedRxjsFn})\\b)\\w+\\s*\\}`, 'gm'),
            replace: '//$&',
          },
        },
        {
          test: /node_modules[\\/]lodash.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: /^(module\.exports *= *)(require\('\.\/)lodash('\))/m,
            replace: `$1{\n${usedLodashFn.map((f) => f + ': $2' + f + '$3').join(',\n')}\n}`,
          },
        },
        {
          test: /node_modules[\\/]jsprim\b.lib.jsprim\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^(var mod_(util|verror|jsonschema)|exports\.validateJson\w*) *=/gm, replace: '//$&' },
        },
        {
          test: /node_modules[\\/]external-editor\b.main.index\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              {
                search: /^Object\.defineProperty\(exports\b[\s\S]*?\nvar (\w+Error)_1 *=/m,
                replace: (m, p) =>
                  /^var __extends *=.*\{\n[\s\S]*?\n\}.*/m.exec(
                    fs.readFileSync(resolveDepPath(`external-editor/main/errors/${p}.js`), 'utf8')
                  )[0] + m,
              },
              {
                search: /^var (\w+Error)_1 *= *require\(['"]\.\/errors\/\1\b.*/gm,
                replace: (_, p) =>
                  new RegExp(`^var ${p} *=.*\\{\\n[\\s\\S]*?\\n\\}.*`, 'm').exec(
                    fs.readFileSync(resolveDepPath(`external-editor/main/errors/${p}.js`), 'utf8')
                  )[0],
              },
              { search: / \w+Error_1\./g, replace: ' ' },
            ],
          },
        },
        // Correct ESM imports
        {
          test: /node_modules[\\/]yarn\b.src\b.*\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              {
                search: /^\s*import\s+(\*\s+as\s+)?(\w+)\s+from\s*(['"][a-zA-Z_@][^'"]*['"])/gm,
                replace: 'const $2 = require($3)',
              },
              {
                search: /^\s*import\s*(\{[^{}]*\})\s*from\s*(['"][a-zA-Z_@][^'"]*['"])/gm,
                replace: (_, p1, p2) => `const ${p1.replace(/\s+as\s+/g, ': ')} = require(${p2})`,
              },
              {
                search: /^\s*const\s+(\w+) *= *require\((['"][./][^'"]*['"])\)\.default\b/gm,
                replace: 'import $1 from $2',
              },
              {
                search: /^\s*const\s*(\{[^{}]*\}) *= *require\((['"][./][^'"]*['"])\)/gm,
                replace: (m, p1, p2) => `import ${p1.replace(/:\s*/g, ' as ')} from ${p2}`,
              },
            ],
          },
        },
      ],
    },
    resolve: {
      mainFields: ['es2015', 'module', 'main'],
      alias: {
        'js-yaml$': path.resolve(__dirname, 'node_modules/js-yaml/lib/js-yaml/loader.js'),
        retry$: path.resolve(__dirname, 'node_modules/retry/lib/retry.js'),
        'node-emoji$': path.resolve(__dirname, 'node_modules/node-emoji/lib/emoji.js'),
        lodash$: path.resolve(__dirname, 'node_modules/lodash/index.js'),
        'cli-table3$': path.resolve(__dirname, 'node_modules/cli-table3/src/table.js'),
        'mime-db$': path.resolve(__dirname, 'node_modules/mime-db/db.json'),
        'colors/safe$': path.resolve(__dirname, 'node_modules/colors/lib/colors.js'),
        'http-signature$': path.resolve(__dirname, 'node_modules/http-signature/lib/signer.js'),
      },
    },
    plugins: [
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bcli\.js$/ }),
      newCopyPlugin([
        { from: 'node_modules/yarn/{LICENSE*,README*,scripts/preinstall.*}', to: '[name][ext]' },
        {
          from: 'node_modules/yarn/package.json',
          transform(content) {
            const { dependencies: _, devDependencies: _d, jest: _j, resolutions: _r, ...pkg } = JSON.parse(content);

            Object.assign(pkg, { installationMethod: 'tar', scripts: { preinstall: preInstallCmd } });
            return delete pkg.config, (pkg.version += '-r1'), JSON.stringify(pkg, null, 2) + '\n';
          },
        },
        { from: 'node_modules/yarn/bin/', to: 'bin/', transform: (s) => String(s).replace(/__dirname \+ '\//g, "'") },
        { from: 'node_modules/v8-compile-cache/v8-compile-cache.js', to: 'lib/' },
      ]),
      // Fix circular dependencies
      new ReplaceCodePlugin([
        { search: ' getGlobalBinFolder(', replace: ' getBinFolder(', test: /\bcli\.js$/ },
        { search: ' globalRun(', replace: ' global_run(', test: /\bcli\.js$/ },
      ]),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /\bnode_modules[\\/](?!yarn\b|@babel.runtime\b.\w*.esm\b)/,
            chunks: 'all',
            name: 'lib/vendors',
          },
        },
      },
    },
  }),
];
