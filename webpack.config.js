const path = require('path');
const { BannerPlugin, CopyPlugin, TerserPlugin } = require('webpack');

const webpackConfig = (name, config) => ({
  ...config,
  mode: 'production',
  name,
  output: {
    path: path.join(__dirname, 'dist', name),
    clean: true,
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
        test: /(\.[cm]?js|[\/\\][^.]+)$/i,
        // cache: true,
        parallel: true,
        terserOptions: { mangle: false, format: { beautify: true, indent_level: 2 } },
        extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
      }),
    ],
    ...(config.optimization || {}),
  },
});

module.exports = [
  webpackConfig('glob', {
    entry: { glob: './node_modules/glob/glob' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node0.10',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/glob/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/glob/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, tap: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('ajv', {
    entry: { 'lib/ajv': './node_modules/ajv/lib/ajv' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node6',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: '{LICENSE*,README*,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'ajv') },
          {
            from: 'node_modules/ajv/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, nyc: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('fast-glob', {
    entry: { 'out/index': './node_modules/fast-glob/out/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8.6',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/fast-glob/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/fast-glob/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, 2);
            },
          },
          // dts-bundle --name fast-glob --main out/index.d.ts --baseDir . --out dist/index.d.ts
        ],
      }),
    ],
  }),
  webpackConfig('globby', {
    entry: { index: './node_modules/globby/index' },
    output: { libraryTarget: 'commonjs2' },
    externals: ['fast-glob'],
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/globby/{license,readme,index.d}*', to: '[name][ext]' },
          {
            from: 'node_modules/globby/package.json',
            transform(content) {
              const { devDependencies: _1, scripts: _2, xo: _3, ...pkg } = JSON.parse(content);
              pkg.dependencies = { 'fast-glob': pkg.dependencies['fast-glob'] };
              return JSON.stringify(pkg, null, '\t');
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('@babel-core', {
    entry: { 'lib/index': './node_modules/@babel/core/lib/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      browserslist: 'commonjs2 browserslist',
      chalk: 'commonjs2 chalk',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.core.lib.config.files.(configuration|module-types|plugins|import)\.js$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              { search: ' require.resolve ', replace: ' require("originalRequire").resolve ' },
              { search: ' require(filepath)', replace: ' require("originalRequire")(filepath)' },
              { search: ' import(filepath)', replace: ' import(/* webpackIgnore: true */ filepath)' },
            ],
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/@babel/core/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/@babel/core/package.json',
            transform(content) {
              const { devDependencies: _1, ...pkg } = JSON.parse(content);
              const { dependencies: dep1 } = require('@babel/helper-compilation-targets/package.json');
              const { dependencies: dep2 } = require('@babel/highlight/package.json');

              pkg.dependencies = { browserslist: dep1.browserslist, chalk: dep2.chalk };
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
      // sed -i- 's/("\.\/originalRequire")//' dist/@babel-core/lib/*.js
    ],
  }),
  webpackConfig('@babel-preset', {
    entry: { 'lib/index': './node_modules/@babel/preset-env/lib/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node6.9',
    externals: {
      '@babel/core': 'commonjs @babel/core',
      browserslist: 'commonjs2 browserslist',
      chalk: 'commonjs2 chalk',
      'regexpu-core': 'commonjs2 regexpu-core',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.@babel.helper-define-polyfill-provider.lib.node.dependencies\.js$/,
          loader: 'string-replace-loader',
          options: { search: ' require\\.resolve\\(', flags: 'g', replace: ' require("originalRequire").resolve(' },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/@babel/preset-env/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/@babel/preset-env/package.json',
            transform(content) {
              const { devDependencies: _1, ...pkg } = JSON.parse(content);
              const { dependencies: d1 } = require('core-js-compat/package.json');
              const { dependencies: d2 } = require('@babel/helper-create-regexp-features-plugin/package.json');
              const { dependencies: d3 } = require('@babel/highlight/package.json');

              pkg.dependencies = { browserslist: d1.browserslist, chalk: d3.chalk, 'regexpu-core': d2['regexpu-core'] };
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('@wasm-ast', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/ast/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/@webassemblyjs/ast/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/@webassemblyjs/ast/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, module: _3, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('@wasm-parser', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-parser/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: ['@webassemblyjs/ast'],
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/@webassemblyjs/wasm-parser/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/@webassemblyjs/wasm-parser/package.json',
            transform(content) {
              const { devDependencies: _1, module: _2, ...pkg } = JSON.parse(content);
              pkg.dependencies = { '@webassemblyjs/ast': pkg.dependencies['@webassemblyjs/ast'] };
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('@wasm-edit', {
    entry: { 'lib/index': './node_modules/@webassemblyjs/wasm-edit/esm/index' },
    output: { libraryTarget: 'commonjs' },
    target: 'node0.10',
    externals: ['@webassemblyjs/ast', '@webassemblyjs/wasm-parser'],
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/@webassemblyjs/wasm-edit/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/@webassemblyjs/wasm-edit/package.json',
            transform(content) {
              const { devDependencies: _1, module: _2, ...pkg } = JSON.parse(content);
              pkg.dependencies = {
                '@webassemblyjs/ast': pkg.dependencies['@webassemblyjs/ast'],
                '@webassemblyjs/wasm-parser': pkg.dependencies['@webassemblyjs/wasm-parser'],
              };
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('chalk', {
    entry: { index: './node_modules/chalk/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: '{license*,readme*,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'chalk') },
          {
            from: 'node_modules/chalk/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, xo: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, '\t');
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('regexpu-core', {
    entry: { 'rewrite-pattern': './node_modules/regexpu-core/rewrite-pattern' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node4',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/regexpu-core/{LICENSE,README}*', to: '[name][ext]' },
          {
            from: 'node_modules/regexpu-core/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, '\t');
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('execa', {
    entry: { index: './node_modules/execa/index' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/execa/{license,readme,index.d}*', to: '[name][ext]' },
          {
            from: 'node_modules/execa/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, nyc: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, '\t');
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('terser', {
    entry: {
      main: { import: './node_modules/terser/main', library: { name: 'Terser', type: 'umd' } },
      bin: { import: './node_modules/terser/bin/terser', filename: 'bin/terser' },
    },
    externals: { '..': 'commonjs2 ../main' },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/,
          loader: 'string-replace-loader',
          options: { search: ' require("acorn")', replace: ' import(/* webpackMode: "eager" */ "acorn").acorn' },
        },
        {
          test: /node_modules.terser.package\.json$/,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"engines":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: '{LICENSE*,*.md,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'terser') },
          {
            from: 'node_modules/terser/package.json',
            transform(content) {
              const { devDependencies: _1, scripts: _2, type: _3, module: _4, ...pkg } = JSON.parse(content);
              pkg.dependencies = {};
              return JSON.stringify(pkg, null, 2).replace(/\bdist\/bundle\.min\b/g, 'main');
            },
          },
        ],
      }),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /\bterser$/ }),
      // sed -i- 's/Promise\.resolve()\.then.*[( ,]\([0-9]*\))*\.acorn/__webpack_require__(\1)/' dist/terser/*.js
    ],
  }),
  webpackConfig('import-local', {
    entry: { index: './node_modules/import-local/index' },
    output: { libraryTarget: 'commonjs2' },
    target: 'node8',
    externals: { originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules.import-local.index\.js$/,
          loader: 'string-replace-loader',
          options: { search: ' require(\\([\\w.]+)', flags: 'g', replace: ' require("originalRequire")$1' },
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: '{license*,readme*,**/cli.js}', context: path.join(__dirname, 'node_modules', 'import-local') },
          {
            from: 'node_modules/import-local/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, xo: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, '\t');
            },
          },
        ],
      }),
    ],
  }),
  webpackConfig('webpack-merge', {
    entry: { 'dist/index': './node_modules/webpack-merge/dist/index' },
    output: { libraryTarget: 'commonjs' },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: '{LICENSE*,*.md,**/*.d.ts}', context: path.join(__dirname, 'node_modules', 'webpack-merge') },
          {
            from: 'node_modules/webpack-merge/package.json',
            transform(content) {
              const { dependencies: _1, devDependencies: _2, scripts: _3, husky: _4, ...pkg } = JSON.parse(content);
              return JSON.stringify(pkg, null, 2);
            },
          },
        ],
      }),
    ],
  }),
];
