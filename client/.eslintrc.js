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
  }
};
