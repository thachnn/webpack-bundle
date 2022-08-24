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
  target: config.target || 'node',
  node: { __filename: false, __dirname: false },
  cache: { type: 'filesystem' },
  stats: { modulesSpace: Infinity },
  optimization: {
    nodeEnv: false,
    // minimize: false,
    minimizer: [
      new TerserPlugin({
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
    target: 'node10',
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
];
