'use strict';

const path = require('path');
const fs = require('fs');
const { minify: terserMinify } = require('webpack/vendor/terser');
const { TerserPlugin, BannerPlugin, CopyPlugin, ReplaceCodePlugin } = require('webpack');

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {{from: string, to?: (string|Function), context?: string, transform?: Function}} ObjectPattern
 */

/** @type {import('terser').MinifyOptions} */
const baseTerserOpts = {
  compress: { passes: 1 },
  mangle: false,
  output: { comments: false, beautify: true, indent_level: 2 },
};

/**
 * @param {string} name
 * @param {Configuration} config
 * @returns {Configuration}
 */
const webpackConfig = (name, config, clean = name.charAt(0) !== '/') =>
  Object.assign(config, {
    mode: 'production',
    name: clean ? name : name.substring(1),
    output: Object.assign({ path: path.join(__dirname, 'dist', clean ? name : '') }, config.output),
    context: __dirname,
    target: 'node',
    node: { __filename: false, __dirname: false },
    cache: true,
    stats: { modules: true, maxModules: Infinity, children: true },
    optimization: Object.assign({}, config.optimization, {
      nodeEnv: false,
      // minimize: false,
      minimizer: ((config.optimization || {}).minimizer || [null]).map(newTerserPlugin),
    }),
  });

const baseTerserPluginOpts = {
  test: /(\.m?js|[\\/][\w-]+)$/i,
  cache: true,
  // parallel: true,
  extractComments: { condition: 'some', banner: false },
};

const newTerserPlugin = (opt) =>
  new TerserPlugin(
    Object.assign({}, baseTerserPluginOpts, opt, {
      terserOptions: Object.assign({}, baseTerserOpts, (opt || {}).terserOptions),
    })
  );

const minifyContent = (content, opts = null) =>
  terserMinify(String(content), Object.assign({}, baseTerserOpts, typeof opts === 'object' ? opts : null)).code;

let babelPresetPlugins = () => {
  const data = fs
    .readFileSync(path.resolve(__dirname, 'node_modules/@babel/preset-env/lib/available-plugins.js'), 'utf8')
    .match(/(?<=\brequire\(['"])@babel\/(plugin-|preset-modules\/lib\/plugins\/)[^'"]+/g);

  babelPresetPlugins = () => data;
  return data;
};

//
module.exports = [
  webpackConfig('regexpu-core', {
    entry: { 'rewrite-pattern': './node_modules/regexpu-core/rewrite-pattern' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: '{LICENSE*,*.md}', context: 'node_modules/regexpu-core' },
        {
          from: 'node_modules/regexpu-core/package.json',
          transform: (s) => String(s).replace(/,\s*"(d(evD)?ependencies|scripts)":\s*\{[^{}]*\}/g, ''),
        },
      ]),
    ],
  }),
  webpackConfig('@babel-core', {
    entry: {
      'lib/index': './node_modules/@babel/core/lib/index',
      'lib/types': './node_modules/@babel/types/lib/index',
      'lib/traverse': './node_modules/@babel/traverse/lib/index',
    },
    output: { libraryTarget: 'commonjs-module' },
    externals: {
      '@babel/types': 'commonjs ./types',
      '@babel/traverse': 'commonjs ./traverse',
      '@babel/parser': 'commonjs ./parser',
      chalk: 'commonjs2 chalk',
      'supports-color': 'commonjs2 supports-color',
      originalRequire: 'commonjs2 ./originalRequire',
    },
    module: {
      rules: [
        {
          test: /node_modules[\\/]@babel.core\b.lib.config.files.(plugins|module-types|import)\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            multiple: [
              { search: / require(\(\w+\))/, replace: ' require("originalRequire")$1' },
              { search: ' import(filepath)', replace: ' Promise.resolve(() => require("originalRequire")(filepath))' },
            ],
          },
        },
        {
          test: /node_modules[\\/]@babel.core\b.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"main":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/@babel/core/{LICENSE*,README*}', to: '[name].[ext]' },
        {
          from: 'node_modules/@babel/core/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['devDependencies'].forEach((k) => delete pkg[k]);

            const { dependencies: d1 } = require('@babel/highlight/package.json');
            pkg.dependencies = { chalk: d1.chalk };

            return JSON.stringify(pkg, null, 2);
          },
        },
        { from: 'node_modules/@babel/parser/lib/*.js', to: 'lib/parser.js', transform: minifyContent },
      ]),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /index\.js$/i }),
    ],
  }),
  webpackConfig('@babel-preset', {
    entry: Object.assign(
      {
        'lib/index': './node_modules/@babel/preset-env/lib/index',
        'lib/types': './node_modules/@babel/types/lib/index',
        'lib/traverse': './node_modules/@babel/traverse/lib/index',
      },
      babelPresetPlugins().reduce((acc, p) => {
        const m = /^@babel\/(plugin-|preset-modules\/lib\/plugins\/)(.*)/.exec(p);
        acc[`plugins/${m[2]}`] = `./node_modules/${p}/${m[1] === 'plugin-' ? 'lib/index' : 'index'}`;
        return acc;
      }, {})
    ),
    output: { libraryTarget: 'commonjs-module' },
    externals: Object.assign(
      {
        '@babel/core': 'commonjs @babel/core',
        browserslist: 'commonjs2 browserslist',
        'regexpu-core': 'commonjs2 regexpu-core',
        chalk: 'commonjs2 chalk',
        'supports-color': 'commonjs2 supports-color',
        '@babel/types': 'commonjs ../lib/types',
        '@babel/traverse': 'commonjs ../lib/traverse',
        '@babel/parser': 'commonjs ../lib/parser',
        '@babel/helper-plugin-utils': 'commonjs ../lib/plugin-utils',
      },
      babelPresetPlugins().reduce((acc, p) => {
        const re = /^@babel\/(plugin-|preset-modules\/lib\/plugins\/)/;
        acc[p] = `commonjs ../plugins/${p.replace(re, '')}`;
        return acc;
      }, {})
    ),
    module: {
      rules: [
        {
          test: /node_modules[\\/]@babel.(helper-create-(class|regexp)-features-plugin|plugin-proposal-dynamic-import)\b.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"(author|description)":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/@babel/preset-env/{LICENSE*,README*}', to: '[name].[ext]' },
        {
          from: 'node_modules/@babel/preset-env/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['devDependencies'].forEach((k) => delete pkg[k]);

            const { browserslist } = pkg.dependencies;
            const { dependencies: d1 } = require('@babel/highlight/package.json');
            const { dependencies: d2 } = require('@babel/helper-create-regexp-features-plugin/package.json');
            pkg.dependencies = { browserslist, chalk: d1.chalk, 'regexpu-core': d2['regexpu-core'] };

            return JSON.stringify(pkg, null, 2);
          },
        },
        { from: 'node_modules/@babel/helper-plugin-utils/*/*.js', to: 'lib/plugin-utils.js', transform: minifyContent },
        { from: 'node_modules/@babel/parser/lib/*.js', to: 'lib/parser.js', transform: minifyContent },
      ]),
    ],
  }),
  //
  webpackConfig('object.assign', {
    entry: { index: './node_modules/object.assign/index' },
    output: { libraryTarget: 'commonjs2' }, // UNUSED
    plugins: [
      new CopyPlugin([
        { from: '{LICENSE*,*.md}', context: 'node_modules/object.assign' },
        {
          from: 'node_modules/object.assign/package.json',
          transform: (s) => String(s).replace(/,\s*"(d(evD)?ependencies|scripts|testling)":\s*\{[^{}]*\}/g, ''),
        },
      ]),
    ],
  }),
  webpackConfig('find-cache-dir', {
    entry: { index: './node_modules/find-cache-dir/index' },
    output: { libraryTarget: 'commonjs2' },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/find-cache-dir/{license*,readme*}', to: '[name].[ext]' },
        {
          from: 'node_modules/find-cache-dir/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'devDependencies', 'scripts', 'nyc'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, '\t');
          },
        },
      ]),
    ],
  }),
  //
  webpackConfig('browserslist', {
    entry: {
      index: './node_modules/browserslist/index',
      cli: './node_modules/browserslist/cli',
    },
    externals: { './': 'commonjs2 ./index', originalRequire: 'commonjs2 ./originalRequire' },
    module: {
      rules: [
        {
          test: /node_modules[\\/]browserslist\b.cli\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /^#!.*[\r\n]+/, replace: '' },
        },
        {
          test: /node_modules[\\/]browserslist\b.node\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: {
            search: / require\(\s*require\.resolve\(/g,
            replace: ' require("originalRequire")(require("originalRequire").resolve(',
          },
        },
        {
          test: /node_modules[\\/]browserslist\b.update-db\.js$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: "require('escalade/sync')", replace: "require('escalade/sync/index.js')" },
        },
        {
          test: /node_modules[\\/]browserslist\b.package\.json$/i,
          loader: 'webpack/lib/replace-loader',
          options: { search: /,\s*"keywords":[\s\S]*/, replace: '\n}' },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/browserslist/{LICENSE*,*.md}', to: '[name].[ext]' },
        {
          from: 'node_modules/browserslist/package.json',
          transform(content) {
            const pkg = JSON.parse(content);
            ['dependencies', 'browser'].forEach((k) => delete pkg[k]);
            return JSON.stringify(pkg, null, 2);
          },
        },
      ]),
      new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true, test: /cli\.js$/i }),
      new BannerPlugin({ banner: 'module.exports = ', raw: true, test: /index\.js$/i }),
      new ReplaceCodePlugin({ search: ' require("./originalRequire")', replace: ' require', test: /index\.js$/i }),
    ],
    optimization: {
      minimizer: [
        {
          parallel: true,
          terserOptions: { output: Object.assign({}, baseTerserOpts.output, { indent_level: 0 }) },
        },
      ],
    },
  }),
];
