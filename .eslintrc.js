module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
    jasmine: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfig: false,
  },

  parser: '@typescript-eslint/parser',

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
