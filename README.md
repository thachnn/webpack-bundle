# Purpose

Bundle NPM packages using `webpack` and provide them :-)

## Usage

```json
{
  "dependencies": {
    "glob": "thachnn/webpack-bundle#glob-7.2.3"
  },
  "resolutions": {
    "**/schema-utils/ajv": "thachnn/webpack-bundle#ajv-6.12.6"
  },
  "overrides": {
    "schema-utils": {
      "ajv": "thachnn/webpack-bundle#ajv-6.12.6"
    }
  }
}
```

Take a look at [`package.json` file](package.json) for more examples

## Provided packages

- `webpack` v5.74.0 -> [thachnn/webpack-bundle#v5.74.0](../../tree/v5.74.0)
- `webpack-cli` v4.10.0 -> [thachnn/webpack-bundle#cli-4.10.0](../../tree/cli-4.10.0)
- `glob` v7.2.3 -> [thachnn/webpack-bundle#glob-7.2.3](../../tree/glob-7.2.3)
- `ajv` v6.12.6 -> [thachnn/webpack-bundle#ajv-6.12.6](../../tree/ajv-6.12.6)
- `fast-glob` v3.2.11 -> [thachnn/webpack-bundle#fast-glob-3.2.1](../../tree/fast-glob-3.2.1)
- `terser` v5.12.1 -> [thachnn/webpack-bundle#terser-5.12.1](../../tree/terser-5.12.1)
- `@babel/core` v7.17.10 -> [thachnn/webpack-bundle#\_babel/core-7.17.10](../../tree/_babel/core-7.17.10)
- `@babel/preset-env` v7.17.10 -> [thachnn/webpack-bundle#\_babel/preset-env-7.17.10](../../tree/_babel/preset-env-7.17.10)
- `chalk` v2.4.2 -> [thachnn/webpack-bundle#chalk-2.4.2](../../tree/chalk-2.4.2)
- `regexpu-core` v5.0.1 -> [thachnn/webpack-bundle#regexpu-core-5.0.1](../../tree/regexpu-core-5.0.1)
- `browserslist` v4.20.4 -> [thachnn/webpack-bundle#browserslist-4.20.4](../../tree/browserslist-4.20.4)
- `npm` v8.19.4 -> [thachnn/webpack-bundle#npm-8.19.4-2](../../tree/npm-8.19.4-2)
- `yarn` v1.22.19 -> [thachnn/webpack-bundle#yarn-1.22.19-1](../../tree/yarn-1.22.19-1)
- ...
