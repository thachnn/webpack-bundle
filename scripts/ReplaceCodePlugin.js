'use strict';

const { ReplaceSource } = require('webpack-sources');
const { validate } = require('schema-utils');

// @see {webpack.Compilation}
const PROCESS_ASSETS_STAGE_ADDITIONS = -100;

const schema = {
  // type: 'array', minItems: 1, items: {
  type: 'object',
  additionalProperties: false,
  properties: {
    search: {
      anyOf: [{ type: 'string', minLength: 1 }, { instanceof: 'RegExp' }],
    },
    replace: { type: 'string' },
    test: { instanceof: 'RegExp' },
  },
  required: ['search', 'replace'],
  // },
};

const searchReplacements = (str, patterns) => {
  const indices = [];

  patterns.forEach(({ search, replace }) => {
    if (typeof search === 'string') {
      const i = str.indexOf(search);
      if (i >= 0) {
        indices.push({ start: i, end: i + search.length - 1, replace });
      }
    } else {
      const re = new RegExp(search.source, search.flags);

      str.replace(search, (m, ...args) => {
        if (typeof args.pop() === 'object') args.pop();
        const k = args.pop();

        indices.push({ start: k, end: k + m.length - 1, replace: m.replace(re, replace) });
        return '';
      });
    }
  });

  return indices;
};

class ReplaceCodePlugin {
  // { search: String | RegExp, replace: String, test?: RegExp }
  constructor(options) {
    validate(schema, options, { name: 'ReplaceCode Plugin', baseDataPath: 'options' });

    this.options = Array.isArray(options) ? options : [options];
  }

  apply(compiler) {
    const options = this.options;
    const cache = new WeakMap();

    compiler.hooks.compilation.tap('ReplaceCodePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'ReplaceCodePlugin',
          stage: PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          for (const chunk of compilation.chunks) {
            for (const file of chunk.files) {
              // Test filename
              const filtered = options.filter(({ test }) => !test || test.test(file));
              if (!filtered.length) {
                continue;
              }

              const patterns = filtered.map(({ search, replace }) => ({ search, replace }));
              // const data = { chunk, filename: file };
              // patterns = compilation.getPath(() => patterns, data);

              compilation.updateAsset(file, (old) => {
                const cached = cache.get(old);
                // Is cached?
                if (cached && JSON.stringify(cached.patterns) === JSON.stringify(patterns)) {
                  return cached.source;
                }

                const indices = searchReplacements(old.source(), patterns);

                const source = new ReplaceSource(old);
                indices.forEach(({ start, end, replace }) => source.replace(start, end, replace));

                cache.set(old, { source, patterns });
                return source;
              });
            }
          }
        }
      );
    });
  }
}

module.exports = ReplaceCodePlugin;
