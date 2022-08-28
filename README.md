# Purpose

Bundle NPM packages using `webpack` and provide them :)

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

## Provided packages

- `webpack` v5.74.0 -> [thachnn/webpack-bundle#v5.74.0](../../tree/v5.74.0)
- `glob` v7.2.3 -> [thachnn/webpack-bundle#glob-7.2.3](../../tree/glob-7.2.3)
- `ajv` v6.12.6 -> [thachnn/webpack-bundle#ajv-6.12.6](../../tree/ajv-6.12.6)
- `fast-glob` v3.2.11 -> [thachnn/webpack-bundle#fast-glob-3.2.1](../../tree/fast-glob-3.2.1)
- `@babel/core` v7.17.10 -> [thachnn/webpack-bundle#\_babel/core-7.17.10](../../tree/_babel/core-7.17.10)
- ...
