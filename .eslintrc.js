// tsconfigRootDir is relative to the current working directory, so for the
// editor to find the tsconfig.json file, we have to use __dirname to make
// the path relative to the eslintrc file.
// https://github.com/typescript-eslint/typescript-eslint/issues/251
module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json",
      "tsconfigRootDir": __dirname
    },
    "plugins": ["@typescript-eslint"],
    "env": {
      "mocha": true
    },
    "extends": [
      "standard",
      "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
      "no-useless-constructor": "off",
      "no-unused-variable": "off",
      "indent": "off",
      "lines-between-class-members": "off",
      "camelcase": "off",
      "require-await": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/member-delimiter-style": ["error", {
        "multiline": {
            "delimiter": "comma",
            "requireLast": false
        },
        "singleline": {
            "delimiter": "comma",
            "requireLast": false
        }
      }],
      "@typescript-eslint/indent": ["error", 2],
      "@typescript-eslint/explicit-member-accessibility": ["error", {
        "accessibility": "no-public"
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/explicit-function-return-type": ["error", {
        "allowExpressions": true
      }],
      "@typescript-eslint/array-type": ["error", {
        "default": "array-simple"
      }],
      "@typescript-eslint/ban-ts-ignore": "off"
    }
  }
