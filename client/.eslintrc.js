module.exports = {
  extends: [
    'airbnb-typescript/base',
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'plugin:react/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/prop-types": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/prefer-default-export": "off",
    "consistent-return": "off",

    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "FunctionDeclaration": {
          "body": 1,
          "parameters": 2
        },
        "FunctionExpression": {
          "body": 1,
          "parameters": 2
        }
      }
    ],
  }
};
