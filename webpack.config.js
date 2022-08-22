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
  target: 'node',
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
    entry: './node_modules/ajv/lib/ajv',
    output: { filename: 'lib/ajv.js', libraryTarget: 'commonjs2' },
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
    entry: './node_modules/fast-glob/out/index',
    output: { filename: 'out/index.js', libraryTarget: 'commonjs2' },
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
];
