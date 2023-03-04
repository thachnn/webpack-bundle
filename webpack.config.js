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
      // 'lib/gentle-fs': { import: './node_modules/npm/node_modules/gentle-fs/index', library: { type: 'commonjs2' } },
      'vendor/sorted-union-stream': {
        import: './node_modules/npm/node_modules/sorted-union-stream/index',
        library: { type: 'commonjs2' },
      },
      'lib/readable-stream': {
        import: './node_modules/npm/node_modules/readable-stream/readable',
        library: { type: 'commonjs2' },
      },
      'vendor/graceful-fs': {
        import: './node_modules/npm/node_modules/graceful-fs/graceful-fs',
        library: { type: 'commonjs2' },
      },
      'lib/tar': { import: './node_modules/npm/node_modules/tar/index', library: { type: 'commonjs' } },
      'lib/node-gyp': {
        import: './node_modules/npm/node_modules/node-gyp/lib/node-gyp',
        library: { type: 'commonjs2' },
      },
      'lib/cacache': { import: './node_modules/npm/node_modules/cacache/index', library: { type: 'commonjs2' } },
      'vendor/glob': { import: './node_modules/npm/node_modules/glob/glob', library: { type: 'commonjs2' } },
      /*
      'lib/fs-write-stream-atomic': {
        import: './node_modules/npm/node_modules/fs-write-stream-atomic/index',
        library: { type: 'commonjs2' },
      },
      */
      'lib/move-concurrently': {
        import: './node_modules/npm/node_modules/move-concurrently/move',
        library: { type: 'commonjs2' },
      },
      'vendor/sshpk': { import: './node_modules/npm/node_modules/sshpk/lib/index', library: { type: 'commonjs2' } },
      'vendor/ajv': {
        import: `${resolveDepPath('ajv', 'har-validator/node_modules/ajv')}/lib/ajv`,
        library: { type: 'commonjs2' },
      },
      'vendor/request': { import: './node_modules/npm/node_modules/request/index', library: { type: 'commonjs2' } },
      'lib/normalize-package-data': {
        import: './node_modules/npm/node_modules/normalize-package-data/lib/normalize',
        library: { type: 'commonjs2' },
      },
      'vendor/validate-npm-package-license': {
        import: './node_modules/npm/node_modules/validate-npm-package-license/index',
        library: { type: 'commonjs2' },
      },
      'lib/npm-package-arg': {
        import: './node_modules/npm/node_modules/npm-package-arg/npa',
        library: { type: 'commonjs2' },
      },
      'lib/init-package-json': {
        import: './node_modules/npm/node_modules/init-package-json/default-input',
        library: { type: 'commonjs' },
      },
      'vendor/mime-types': {
        import: './node_modules/npm/node_modules/mime-types/index',
        library: { type: 'commonjs' },
      },
      'vendor/bluebird': {
        import: './node_modules/npm/node_modules/bluebird/js/release/bluebird',
        library: { type: 'commonjs2' },
      },
      'vendor/mississippi': {
        import: './node_modules/npm/node_modules/mississippi/index',
        library: { type: 'commonjs2' },
      },
      'lib/node-fetch-npm': {
        import: './node_modules/npm/node_modules/node-fetch-npm/src/index',
        library: { type: 'commonjs2' },
      },
      'vendor/make-fetch-happen': {
        import: './node_modules/npm/node_modules/make-fetch-happen/index',
        library: { type: 'commonjs2' },
      },
      //
      'lib/pacote': { import: './node_modules/npm/node_modules/pacote/index', library: { type: 'commonjs2' } },
      'lib/libnpx': { import: './node_modules/npm/node_modules/libnpx/index', library: { type: 'commonjs2' } },
      'vendor/update-notifier': {
        import: './node_modules/npm/node_modules/update-notifier/index',
        library: { type: 'commonjs2' },
      },
      'lib/nopt': { import: './node_modules/npm/node_modules/nopt/lib/nopt', library: { type: 'commonjs2' } },
      'lib/npmlog': { import: './node_modules/npm/node_modules/npmlog/log', library: { type: 'commonjs2' } },
      'lib/npm': { import: './node_modules/npm/lib/npm', library: { type: 'commonjs2' } },
    },
    target: 'node6.2',
    externals: {
      // 'gentle-fs': 'commonjs2 ../lib/gentle-fs',
      'sorted-union-stream': 'commonjs2 ../vendor/sorted-union-stream',
      'readable-stream': 'commonjs2 ../lib/readable-stream',
      'graceful-fs': 'commonjs2 ../vendor/graceful-fs',
      tar: 'commonjs ../lib/tar',
      // 'lodash.clonedeep': 'commonjs2 ../vendor/lodash.clonedeep',
      semver: 'commonjs ../lib/semver',
      cacache: 'commonjs2 ../lib/cacache',
      glob: 'commonjs2 ../vendor/glob',
      // 'fs-write-stream-atomic': 'commonjs2 ../lib/fs-write-stream-atomic',
      'move-concurrently': 'commonjs2 ../lib/move-concurrently',
      sshpk: 'commonjs2 ../vendor/sshpk',
      ajv: 'commonjs2 ../vendor/ajv',
      request: 'commonjs2 ../vendor/request',
      'normalize-package-data': 'commonjs2 ../lib/normalize-package-data',
      'validate-npm-package-license': 'commonjs2 ../vendor/validate-npm-package-license',
      'npm-package-arg': 'commonjs2 ../lib/npm-package-arg',
      'mime-types': 'commonjs ../vendor/mime-types',
      bluebird: 'commonjs2 ../vendor/bluebird',
      mississippi: 'commonjs2 ../vendor/mississippi',
      'node-fetch-npm': 'commonjs2 ../lib/node-fetch-npm',
      'make-fetch-happen': 'commonjs2 ../vendor/make-fetch-happen',
      //
      './utils/metrics-launch.js': 'commonjs2 ./metrics-launch',
      './metrics-launch.js': 'commonjs2 ./metrics-launch',
      pacote: 'commonjs2 ../lib/pacote',
      './extract-worker.js': 'commonjs2 ../lib/extract-worker',
      './install/action/extract-worker.js': 'commonjs2 ../lib/extract-worker',
      './worker.js': 'commonjs2 ../lib/extract-worker',
      libnpx: 'commonjs2 ../lib/libnpx',
      'update-notifier': 'commonjs2 ../vendor/update-notifier',
      nopt: 'commonjs2 ../lib/nopt',
      npmlog: 'commonjs2 ../lib/npmlog',
      '../bin/npm-cli.js': 'commonjs2 ../bin/npm-cli',
      originalRequire: 'commonjs2 ./originalRequire',
      iconv: 'commonjs2 iconv',
    },
    module: {
      rules: [
        {
          test: /node_modules.npm.(lib.(npm|pack|install.action.extract)|node_modules.((libnpx|require-main-filename|yargs-parser).index|uid-number.uid-number|yargs.(yargs|index|lib.apply-extends)))\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /( require)(\(\w+|\.resolve|\)|;?$)/gm, replace: "$1('originalRequire')$2" },
        },
        {
          test: /node_modules.npm.node_modules.libcipm.lib.extract\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /( require)(\.resolve\('\.\/)worker\b/, replace: "$1('originalRequire')$2extract-worker" },
        },
        {
          test: /node_modules.npm.node_modules.worker-farm.lib.fork\.js$/i,
          loader: 'string-replace-loader',
          options: {
            search: /( require)(\.resolve\('\.\/)child\/index\b/,
            replace: "$1('originalRequire')$2worker-farm-child",
          },
        },
        {
          test: /node_modules.npm.node_modules.init-package-json.init-package-json\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require.resolve('./default-input", replace: " path.join(__dirname, 'init-package-json" },
        },
        {
          test: /node_modules.npm.node_modules.npm-lifecycle.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^const resolveFrom *= *require\b/m, replace: '// $&' },
              { search: /\b(resolve)From(\(__dirname, ')node-gyp(\/bin\/node-gyp)'/, replace: "path.$1$2..$3.js'" },
              { search: ".join(__dirname, 'node-gyp-bin'", replace: ".resolve(__dirname, '../bin/node-gyp-bin'" },
            ],
          },
        },
        //
        {
          test: /node_modules.npm.lib.npm\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: " require(path.join(__dirname, a + '.js'))", replace: " require('./' + a + '.js')" },
              {
                search: /^ *var inspect *= *require\b.*/m,
                replace: `$&\nnpm._unsupported = unsupported; npm._config = npmconf;\n${['error-handler', 'metrics']
                  .map((f) => `Object.defineProperty(npm, '_${camelize(f)}', { get: () => require('./utils/${f}') })`)
                  .join('\n')}`,
              },
            ],
          },
        },
        {
          test: /node_modules.npm.node_modules.update-notifier.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^const importLazy *= *require\b/m, replace: '// $&' },
              { search: / importLazy(\('[^']*'\))/g, replace: ' require$1' },
              { search: /(\.join\(__dirname, ')check\b/, replace: '$1update-check' },
            ],
          },
        },
        {
          test: /node_modules.npm.node_modules.encoding.lib.iconv-loader\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^ *(iconv_package) *= *('\w+').*([\s\S]*)require\(\1\)/m, replace: '$3require($2)' },
        },
        {
          test: /node_modules.npm.node_modules.(got|npm-registry-fetch|make-fetch-happen|node-gyp).package\.json$/i,
          loader: 'string-replace-loader',
          options: {
            search: /^[\s\S]*/,
            replace: (m) => `{ ${m.match(/^  "(name|(installV|v)ersion|description)": (".*"|\w+)/gm).join(',')} }`,
          },
        },
        // Remove `execa` dependency
        {
          test: /node_modules.npm.node_modules.term-size.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^\s*try \{\s*const columns *= *execa\b/m, replace: 'if (process.env.TERM)\n$&' },
              {
                search: /^const execa *= *require\b.*/m,
                replace: `const {execFileSync} = require('child_process');
            const exec = (command, args, shell) => execFileSync(command, args, {encoding: 'utf8', shell}).trim();`,
              },
              { search: / execa\.sync\((.*?)\)\.stdout\b/g, replace: ' exec($1)' },
              { search: / execa\.shellSync\((.*?)\)\.stdout\b/g, replace: ' exec($1, [], true)' },
            ],
          },
        },
        {
          test: /node_modules.npm.(lib.install.action.extract-worker|node_modules.libnpm.[temp]\w*)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / require\('pacote\/(\w*)'\)/, replace: " require('pacote').$1" },
        },
        {
          test: /node_modules.npm.lib.publish\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /\{ *(\w+), *(\w+) *\}( *= *require\('libnpm)('\))/, replace: '$1$3/$1$4, $2$3/$2$4' },
        },
        {
          test: /node_modules.npm.node_modules.ecc-jsbn.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /^var ECPointFp *= *require\b/m, replace: '// $&' },
        },
        // Remove `es-abstract` dependency
        {
          test: /node_modules.npm.node_modules.util-promisify.index\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^(const ObjectGet)(OwnPropertyDescriptors) = require\b.*/m, replace: '$1$2 = Object.get$2;' },
              { search: /\b(return) (\S*\bfn, )(ObjectGetOwnPropertyDescriptors)\b/, replace: '$1 !$3 ? fn : $2$3' },
            ],
          },
        },
        {
          test: /node_modules.readable-stream.lib._stream_readable\.js$/i,
          loader: 'string-replace-loader',
          options: { search: / require\('string_decoder\/'\)/g, replace: " require('string_decoder')" },
        },
        {
          test: /node_modules.npm.node_modules.through2.through2\.js$/i,
          loader: 'string-replace-loader',
          options: { search: "require('readable-stream/transform')", replace: "require('readable-stream').Transform" },
        },
        {
          test: /node_modules.npm.node_modules.sorted-union-stream.node_modules.from2.index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('readable-stream')", replace: " require('../readable-stream')" },
        },
        /* Bundle package `punycode`
        {
          test: /node_modules.npm.node_modules.(tough-cookie.lib.cookie|psl.index|uri-js.dist.esnext.(uri|schemes.mailto))\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /('|")(punycode)\1/, replace: '$1$2/$1' },
        },
        */
        // Prepare Y18N locales
        {
          test: /node_modules.npm.node_modules.libnpx.y\.js$/i,
          loader: 'string-replace-loader',
          options: { search: ".join(__dirname, 'locales')", replace: ".resolve(__dirname, '../locales/libnpx')" },
        },
        {
          test: /node_modules.npm.node_modules.cacache.lib.util.y\.js$/i,
          loader: 'string-replace-loader',
          options: { search: ".join(__dirname, '../../locales'", replace: ".resolve(__dirname, '../locales/cacache'" },
        },
        {
          test: /node_modules.npm.node_modules.yargs.yargs\.js$/i,
          loader: 'string-replace-loader',
          options: { search: "(__dirname, './locales')", replace: "(__dirname, '../locales/yargs')" },
        },
        // Prevent duplicated packages
        {
          test: /node_modules.npm.node_modules.(run-queue.queue|move-concurrently.move|gentle-fs.lib.rm|copy-concurrently.copy)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('aproba')", replace: " require('gauge/node_modules/aproba')" },
        },
        {
          test: /node_modules.npm.node_modules.wide-align.align\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('string-width')", replace: " require('gauge/node_modules/string-width')" },
        },
        {
          test: /node_modules.npm.node_modules.(wrap-ansi|cliui).index\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /( require)\('(string-width|strip-ansi)'\)/g, replace: "$1('yargs/node_modules/$2')" },
        },
        {
          test: /node_modules.npm.node_modules.(fs-write-stream-atomic.index|copy-concurrently.copy)\.js$/i,
          loader: 'string-replace-loader',
          options: { search: " require('iferr')", replace: " require('gentle-fs/node_modules/iferr')" },
        },
        // Correct paths
        {
          test: /node_modules.npm.node_modules.node-gyp.lib.find-node-directory\.js$/i,
          loader: 'string-replace-loader',
          options: { search: /(\.join\(scriptLocation, '\.\.)(\/\.\.){3}'/, replace: "$1/..'" },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/npm/node_modules/worker-farm/lib/child/index.js', to: 'lib/worker-farm-child.js' },
        {
          from: 'node_modules/npm/node_modules/update-notifier/check.js',
          to: 'vendor/update-check.js',
          transform: (content) => String(content).replace(" require('.')", " require('./update-notifier')"),
        },
        { from: 'node_modules/npm/node_modules/{semver/semver,uid-number/get-uid-*}.js', to: 'lib/[name].js' },
        {
          from: 'node_modules/npm/lib/install/action/extract-worker.js',
          to: 'lib/',
          transform(content) {
            return String(content)
              .replace(" require('bluebird')", " require('../vendor/bluebird')")
              .replace(" require('pacote/extract')", " require('./pacote').extract");
          },
        },
        {
          from: 'node_modules/npm/lib/utils/metrics-launch.js',
          to: 'lib/',
          transform(content) {
            return String(content)
              .replace(" require('graceful-fs')", " require('../vendor/graceful-fs')")
              .replace(" require('../npm.js')", " require('./npm.js')")
              .replace(" require('./metrics.js')", " require('./npm.js')._metrics");
          },
        },
        // { from: 'node_modules/npm/node_modules/lodash.clonedeep/index.js', to: 'vendor/lodash.clonedeep.js' },
        {
          from: 'node_modules/npm/node_modules/{cacache,libnpx,yargs}/locales/*.json',
          to: ({ absoluteFilename: f }) => `locales/${f.replace(/^.*\bnode_modules[\\/]|[\\/].*$/g, '')}/[name][ext]`,
        },
        { from: 'node_modules/npm/node_modules/term-size/vendor/', to: 'vendor/vendor/' },
        { from: '{lib/*.cs,gyp/!(samples)**,*.gypi,src/*.cc}', context: 'node_modules/npm/node_modules/node-gyp' },
        {
          from: '{bin/node-gyp-bin/*,lib/**/*.sh,npmrc}',
          context: 'node_modules/npm',
          transform: (content) => String(content).replace(/\bnode_modules[\\/]node-gyp[\\/]/, ''),
        },
      ]),
      new ReplaceCodePlugin([
        { search: ' require("./originalRequire")', replace: ' require', test: /\b(npm|libnpx)\.js$/ },
        { search: /( require\(")\.\.\/lib\//g, replace: '$1./', test: /\blib[\\/][\w-]*\.js$/ },
        { search: /( require\(")\.\.\/vendor\//g, replace: '$1./', test: /\bvendor[\\/][\w-]*\.js$/ },
      ]),
    ],
    resolve: {
      // Use modules instead
      alias: {
        'uri-js$': resolveDepPath('uri-js/dist/esnext/index.js'),
        'es6-promise$': resolveDepPath('es6-promise/lib/es6-promise.js'),
        'byte-size$': resolveDepPath('byte-size/index.mjs'),
        // Prune the output
        'mime-db$': resolveDepPath('mime-db/db.json'),
        'cli-boxes$': resolveDepPath('cli-boxes/boxes.json'),
        retry$: resolveDepPath('retry/lib/retry.js'),
        'cli-table3$': resolveDepPath('cli-table3/src/table.js'),
        'colors/safe': resolveDepPath('colors/lib/colors.js'),
        cacache$: resolveDepPath('cacache/locales/en.js'),
      },
      restrictions: [/.*(?<!\.cs)$/i],
    },
  }),
  webpackConfig('/npm-cli', {
    entry: {
      'bin/npm-cli': { import: './node_modules/npm/bin/npm-cli' },
      'bin/node-gyp': { import: './node_modules/npm/node_modules/node-gyp/bin/node-gyp' },
    },
    target: 'node6.2',
    externals: {
      '../': 'commonjs2 ../lib/node-gyp',
      //
      'update-notifier': 'commonjs2 ../vendor/update-notifier',
      nopt: 'commonjs2 ../lib/nopt',
      npmlog: 'commonjs2 ../lib/npmlog',
      '../lib/npm.js': 'commonjs2 ../lib/npm',
    },
    module: {
      rules: [
        {
          test: /node_modules.npm.package\.json$/i,
          loader: 'string-replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*(,\s*"license":)/, replace: '$1' },
        },
        {
          test: /node_modules.npm.bin.npm-cli\.js$/i,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: /^( *var unsupported *=[\s\S]*)\n( *var npm *= *require\b.*)/m, replace: '$2\n$1' },
              { search: " require('../lib/config/core.js')", replace: ' npm._config' },
              { search: /\brequire\('\.+\/lib\/utils\/([eu][\w-]*).*'\)/g, replace: (_, f) => `npm._${camelize(f)}` },
            ],
          },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/v8-compile-cache/v8-compile-cache.js', to: 'vendor/' },
        {
          from: 'node_modules/npm/package.json',
          transform(content) {
            const pkg = JSON.parse(String(content).replace(/"dependencies":[\s\S]*("license":)/, '$1'));

            pkg.version += /-\d*$/.test(pkg.version) ? 'b' : '-0';
            pkg.directories.doc = pkg.directories.doc.replace(/doc$/, '$&s');
            return JSON.stringify(pkg, null, 2);
          },
        },
        { from: '{bin/{*.cmd,np[mx]},{LICENSE,README}*,{docs/{content,output},man}/**}', context: 'node_modules/npm' },
        {
          from: 'node_modules/npm/bin/npx-cli.js',
          to: 'bin/',
          transform: (content) =>
            String(content).replace(/^(.* )(require\(')(libnpx)\b/m, "$2../vendor/v8-compile-cache')\n$1$2../lib/$3"),
        },
      ]),
      new BannerPlugin({
        banner: '#!/usr/bin/env node\nrequire("../vendor/v8-compile-cache");',
        raw: true,
        test: /\b-(cli|gyp)\.js$/,
      }),
    ],
  }),
];
