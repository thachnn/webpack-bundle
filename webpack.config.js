'use strict';

const fs = require('fs');
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
        test: /^(?!docs?[\\/]).*\.[cm]?js$/i,
        // cache: true,
        parallel: true,
        terserOptions: {
          mangle: false,
          format: { beautify: true, indent_level: 2, comments: false },
          compress: { passes: 1 },
          ...(((config.optimization || {}).minimizer || [])[0] || {}),
        },
        extractComments: false,
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

const resolveDepPath = (rel, alt = '', base = 'node_modules/npm/node_modules') =>
  fs.existsSync((rel = path.resolve(__dirname, base, rel))) ? rel : alt && path.resolve(__dirname, base, alt);

const camelize = (s) => s.replace(/[^A-Za-z0-9]+(.)/g, (_, c) => c.toUpperCase());

module.exports = [
  webpackConfig('/npm', {
    entry: {
      'lib/normalize-package-data': {
        import: './node_modules/npm/node_modules/normalize-package-data/lib/normalize',
        library: { type: 'commonjs2' },
      },
      'lib/npm': { import: './node_modules/npm/lib/npm', library: { type: 'commonjs2' } },
      //
      'lib/npm-package-arg': {
        import: './node_modules/npm/node_modules/npm-package-arg/lib/npa',
        library: { type: 'commonjs2' },
      },
      'vendor/validate-npm-package-license': {
        import: './node_modules/npm/node_modules/validate-npm-package-license/index',
        library: { type: 'commonjs2' },
      },
      'lib/init-package-json': {
        import: './node_modules/npm/node_modules/init-package-json/lib/default-input',
        library: { type: 'commonjs' },
      },
      //
      'lib/cacache': { import: './node_modules/npm/node_modules/cacache/lib/index', library: { type: 'commonjs2' } },
      'lib/minipass-fetch': {
        import: './node_modules/npm/node_modules/minipass-fetch/lib/index',
        library: { type: 'commonjs2' },
      },
      'lib/make-fetch-happen': {
        import: './node_modules/npm/node_modules/make-fetch-happen/lib/index',
        library: { type: 'commonjs2' },
      },
      'lib/tar': { import: './node_modules/npm/node_modules/tar/index', library: { type: 'commonjs' } },
      'lib/semver': { import: './node_modules/npm/node_modules/semver/index', library: { type: 'commonjs2' } },
      'lib/node-gyp': {
        import: './node_modules/npm/node_modules/node-gyp/lib/node-gyp',
        library: { type: 'commonjs2' },
      },
      //
      'vendor/minimatch': {
        import: './node_modules/npm/node_modules/minimatch/minimatch',
        library: { type: 'commonjs2' },
      },
      'vendor/glob': { import: './node_modules/npm/node_modules/glob/glob', library: { type: 'commonjs2' } },
      'vendor/rimraf': { import: './node_modules/npm/node_modules/rimraf/rimraf', library: { type: 'commonjs2' } },
      'lib/npmlog': { import: './node_modules/npm/node_modules/npmlog/lib/log', library: { type: 'commonjs2' } },
    },
    target: 'node12',
    externals: {
      'normalize-package-data': 'commonjs2 ../lib/normalize-package-data',
      //
      'lru-cache': 'commonjs2 ../vendor/lru-cache',
      'npm-package-arg': 'commonjs2 ../lib/npm-package-arg',
      'validate-npm-package-license': 'commonjs2 ../vendor/validate-npm-package-license',
      //
      minipass: 'commonjs2 ../vendor/minipass', // ssri, minipass ?
      ssri: 'commonjs2 ../lib/ssri',
      cacache: 'commonjs2 ../lib/cacache',
      'minipass-fetch': 'commonjs2 ../lib/minipass-fetch',
      'make-fetch-happen': 'commonjs2 ../lib/make-fetch-happen',
      tar: 'commonjs ../lib/tar',
      semver: 'commonjs2 ../lib/semver',
      // node-gyp
      minimatch: 'commonjs2 ../vendor/minimatch',
      glob: 'commonjs2 ../vendor/glob',
      rimraf: 'commonjs2 ../vendor/rimraf',
      npmlog: 'commonjs2 ../lib/npmlog',
      bluebird: 'commonjs2 bluebird',
    },
    module: {
      rules: [
        // Prevent duplications
        {
          test: resolveDepPath('read-package-json-fast/node_modules/npm-normalize-package-bin')
            ? /node_modules.npm.node_modules.read-package-json-fast.index\.js$/i
            : /npm.node_modules.(read-package-json.lib.read-json|(npm-bundled|npm-packlist|npm-pick-manifest).lib.index)\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /\b(require\(')(npm-normalize-package-bin'\))/,
            replace: resolveDepPath('bin-links/node_modules/npm-normalize-package-bin')
              ? '$1bin-links/node_modules/$2'
              : '$1@npmcli/installed-package-contents/node_modules/$2',
          },
        },
        //
        {
          test: /node_modules.npm.node_modules.rimraf.rimraf\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: ' require("glob")', replace: ' require("node-gyp/node_modules/glob")' },
              { search: /\bexports *= *rimraf;?$/m, replace: '$&\nrimraf._glob = glob' },
            ],
          },
        },
        {
          test: /node_modules.npm.node_modules.node-gyp.lib.build\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('glob')", replace: " require('rimraf')._glob" },
        },
        {
          test: /node_modules.node-gyp.node_modules.glob.(glob|common|sync)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\(['"])minimatch\b/, replace: '$1../minimatch' },
        },
        //
        {
          test: /node_modules.npm.node_modules.semver.classes.range\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('lru-cache')", replace: " require('../node_modules/lru-cache')" },
        },
        // Reuse nested dependencies
        {
          test: /node_modules.npm.node_modules.npm-package-arg.lib.npa\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^function npa *\(/m,
            replace: 'module.exports._validateName = validatePackageName\nmodule.exports._hostedGit = HostedGit\n$&',
          },
        },
        {
          test: /node_modules.npm.(lib.package-url-cmd|node_modules.normalize-package-data.lib.fixer)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('hosted-git-info')", replace: " require('npm-package-arg')._hostedGit" },
        },
        {
          test: /node_modules.npm.node_modules.@npmcli.arborist.lib.arborist.reify\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('hosted-git-info')", replace: ' npa._hostedGit' },
        },
        {
          test: /node_modules.npm.node_modules.init-package-json.lib.default-input\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^var validateName *= *require\('validate-npm-package-.*\nvar npa *= *require\b.*/m,
            replace: '// $&\nvar validateName = npa._validateName',
          },
        },
        // Fix `node-gyp` usages
        {
          test: /node_modules.npm.node_modules.@npmcli.run-script.lib.make-spawn-args\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require.resolve('node-gyp/", replace: " resolve(__dirname, '../" },
        },
        {
          test: /node_modules.npm.node_modules.@npmcli.run-script.lib.set-path\.js$/i,
          loader: 'string-replace-loader',
          options: { search: "__dirname, '../lib/node-gyp-", replace: "__dirname, '../bin/node-gyp-" },
        },
        // Correct paths
        {
          test: /node_modules.npm.lib.utils.npm-usage\.js$/i,
          loader: 'string-replace-loader',
          options: { search: 'dirname(dirname(__dirname))', replace: 'dirname(__dirname)' },
        },
        {
          test: /node_modules.npm.lib.commands.(completion|help|help-search)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(resolve\(__dirname, ')\.\.(', '|\/)/g, replace: '$1' },
        },
        {
          test: /node_modules.npm.node_modules.init-package-json.lib.init-package-json\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: " require.resolve('./default-input.js')",
            replace: " path.join(__dirname, 'init-package-json.js')",
          },
        },
        // Optimize the output
        {
          test: /node_modules.readable-stream.lib._stream_readable\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\brequire\('string_decoder\/'\)/g, replace: "require('string_decoder')" },
        },
        {
          test: /node_modules.npm.node_modules.(npm-registry-fetch|make-fetch-happen|node-gyp).package\.json$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^[\s\S]*/,
            replace: (m) => `{ ${m.match(/^  "(name|(installV|v)ersion|description)": (".*"|\w+)/gm).join(',')} }`,
          },
        },
        {
          test: /node_modules.npm.node_modules.normalize-package-data.lib.fixer\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\b(require\('semver)\/functions\/(\w+)('\))/g, replace: '$1$3.$2' },
        },
        //
        {
          test: /node_modules.npm.lib.utils.config.definitions\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\{ *(\w+): (\w+) *\}( *= *require\('\.[^']*\/package\.json'\))/, replace: '$2$3.$1' },
        },
        {
          test: /node_modules.npm.lib.npm\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: / require\('\.[^']*\/package\.json'\)/, replace: ' { version:$&.version }' },
              {
                search: /\b(module\.)?exports *= *(Npm);?$/m,
                replace: `$&\n$2._config = { definitions, shorthands }\n$2._log = log
            $2._didYouMean = require('./utils/did-you-mean')\n$2._exitHandler = require('./utils/exit-handler')`,
              },
            ],
          },
        },
        // Optimize ESM usages
        {
          test: /node_modules.npm.node_modules.libnpmdiff.lib.format-diff\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / require\('diff'\)/, replace: ' { createTwoFilesPatch:$&.createTwoFilesPatch }' },
        },
        {
          test: /node_modules.npm.node_modules.parse-conflict-json.lib.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\{ *(\w+) *\}( *= *require\('just-diff(-apply)?'\))/g, replace: '$1$2.$1' },
        },
        {
          test: /node_modules.npm.node_modules.diff.lib.index\.mjs$/i,
          loader: 'string-replace-loader',
          options: { search: /^var characterDiff *= *new Diff\b/m, replace: '// $&' },
        },
        // Bypass old packages
        {
          test: /node_modules.npm.node_modules.is-core-module.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^var has *= *require\('has'\)/m, replace: '// $&' },
              { search: /\bhas *\(/g, replace: 'Object.prototype.hasOwnProperty.call(' },
            ],
          },
        },
        // Correct `node-gyp` paths
        {
          test: /node_modules.npm.node_modules.node-gyp.lib.find-node-directory\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /(\.join\(scriptLocation, '\.\.)(\/\.\.){3}'/, replace: "$1/..'" },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: '{npmrc,lib/**/*.sh}', context: 'node_modules/npm' },
        { from: '{lib/*.cs,gyp/**,*.{gypi,py},src/*.cc}', context: 'node_modules/npm/node_modules/node-gyp' },
        {
          from: 'bin/node-gyp-bin/*',
          context: 'node_modules/npm',
          transform: (content) => String(content).replace(/(\\|\/)node_modules\1node-gyp\1/, '$1'),
        },
        {
          from: 'node_modules/npm/node_modules/{lru-cache,minipass}/*.js',
          to: ({ absoluteFilename: f }) => `vendor/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}[ext]`,
        },
        {
          from: 'node_modules/npm/node_modules/ssri/lib/*.js',
          to: 'lib/ssri[ext]',
          transform: (content) => String(content).replace(/\b(require\(['"])(minipass)\b/, '$1../vendor/$2'),
        },
      ]),
      new ReplaceCodePlugin([
        { search: /( require\(")\.\.\/lib\//g, replace: '$1./', test: /\blib[\\/][\w-]*\.js$/ },
        { search: /( require\(")\.\.\/vendor\//g, replace: '$1./', test: /\bvendor[\\/][\w-]*\.js$/ },
      ]),
    ],
    resolve: {
      // Use modules instead
      conditionNames: ['import', 'node'],
      alias: {
        ms$: path.resolve(__dirname, 'node_modules/npm/node_modules/ms/index.js'),
        'binary-extensions$': resolveDepPath('binary-extensions/binary-extensions.json'),
        'cli-table3$': path.resolve(__dirname, 'node_modules/npm/node_modules/cli-table3/src/table.js'),
        retry$: path.resolve(__dirname, 'node_modules/npm/node_modules/retry/lib/retry.js'),
        '@colors/colors/safe': resolveDepPath('@colors/colors/lib/colors.js'),
      },
      restrictions: [/.*(?<!\.cs)$/i],
    },
  }),
  webpackConfig('/npm-cli', {
    entry: {
      'lib/cli': { import: './node_modules/npm/lib/cli', library: { type: 'commonjs2' } },
      'bin/node-gyp': { import: './node_modules/npm/node_modules/node-gyp/bin/node-gyp' },
    },
    target: 'node12',
    externals: {
      './npm.js': 'commonjs2 ./npm',
      semver: 'commonjs2 ./semver',
      //
      '../': 'commonjs2 ../lib/node-gyp',
      npmlog: 'commonjs2 ../lib/npmlog',
    },
    module: {
      rules: [
        {
          test: /node_modules.npm.node_modules.env-paths.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^\s*(const (tmpdir|appData|username) *=|(data|config|log|temp):|throw new TypeError)/gm,
            replace: '// $&',
          },
        },
        {
          test: /node_modules.npm.lib.cli\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^[ \t]*const Npm *= *require\b/m, replace: '// $&' },
              { search: /^/, replace: "const Npm = require('./npm.js')\n" },
              { search: /$/, replace: 'module.exports._config = Npm._config\n' },
              {
                search: /\brequire\('\.\/utils\/(?:(log)-shim|([\w-]*))(\.js)?'\)/g,
                replace: (_m, p1, p2) => `Npm._${camelize(p1 || p2)}`,
              },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        {
          from: 'node_modules/npm/package.json',
          transform(content) {
            const pkg = JSON.parse(String(content).replace(/"dependencies":[\s\S]*("license":)/, '$1'));
            delete pkg.workspaces;

            pkg.version += /-\d*$/.test(pkg.version) ? 'b' : '-0';
            pkg.directories.doc = pkg.directories.doc.replace(/doc$/, '$&s');
            return JSON.stringify(pkg, null, 2);
          },
        },
        { from: '{bin/{*.cmd,np[mx]},{docs,man}/**,{LICENSE,README,CHANGELOG}*}', context: 'node_modules/npm' },
        {
          from: '{index,bin/np[mx]-cli}.js',
          context: 'node_modules/npm',
          transform(content) {
            return String(content)
              .replace(/^.*\b(require\('\.+)/m, "$1/vendor/v8-compile-cache')\n$&")
              .replace(/\brequire\('\.+\/lib\/utils\/config\b.*/m, 'cli._config');
          },
        },
        { from: 'node_modules/v8-compile-cache/v8-compile-cache.js', to: 'vendor/' },
      ]),
      new BannerPlugin({
        banner: '#!/usr/bin/env node\nrequire("../vendor/v8-compile-cache");',
        raw: true,
        test: /-gyp\.js$/,
      }),
    ],
  }),
];
