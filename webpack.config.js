const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        test: /(\.[cm]?js|[\\/][^.]+)$/i,
        exclude: /\bvendor\b.*\.js$/i,
        // cache: true,
        parallel: true,
        terserOptions: { compress: { passes: 1 }, mangle: false, format: { beautify: true, indent_level: 2 } },
        extractComments: { condition: /@preserve|@lic|@cc_on|^\**!/i, banner: false },
      }),
    ],
    ...(config.optimization || {}),
  },
});

const newCopyPlugin = (patterns) => new CopyPlugin({ patterns });

module.exports = [
  webpackConfig('terser', {
    entry: { terser: './node_modules/terser/main' },
    output: { library: { name: 'Terser', type: 'umd' } },
    module: {
      rules: [
        {
          test: /node_modules.terser.lib.cli\.js$/,
          loader: 'string-replace-loader',
          options: { search: ' require("acorn")', replace: ' import(/* webpackMode: "eager" */ "acorn").acorn' },
        },
      ],
    },
  }),
  webpackConfig('webpack', {
    entry: {
      'lib/index': './node_modules/webpack/lib/index',
    },
    output: { libraryTarget: 'commonjs2' },
    externals: {
      browserslist: 'commonjs2 ../vendor/browserslist',
      terser: 'commonjs2 ../vendor/terser',
      'terser-webpack-plugin': 'commonjs2 ./terser-plugin',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules.webpack.lib.index\.js$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              {
                search: '^(\\s*)get UsageState\\(\\) ',
                flags: 'm',
                replace: '$1get TerserPlugin() { return require("terser-webpack-plugin"); },\n$&',
              },
            ],
          },
        },
        {
          test: /node_modules.webpack.package\.json$/,
          loader: 'string-replace-loader',
          options: { search: ',\\s*"dependencies":[\\s\\S]*', flags: '', replace: '\n}' },
        },
      ],
    },
    plugins: [
      newCopyPlugin([
        { from: 'node_modules/webpack/{LICENSE*,*.md,*.d.ts}', to: '[name][ext]' },
        {
          from: 'node_modules/webpack/package.json',
          transform(content) {
            const { dependencies: d, scripts: _s, bin: _b, jest: _j, 'lint-staged': _, ...pkg } = JSON.parse(content);
            pkg.devDependencies = d;
            return JSON.stringify(pkg, null, 2);
          },
        },
        { from: 'dist/!(terser|webpack)/*.js', to: 'vendor/[name][ext]', noErrorOnMissing: true },
        {
          from: 'dist/terser/*.js',
          to: 'vendor/[name][ext]',
          transform(content) {
            return String(content).replace(/Promise\.resolve.*\.then.*[( ,](\d+)\)+\.acorn/, '__webpack_require__($1)');
          },
          noErrorOnMissing: true,
        },
      ]),
    ],
  }),
];
