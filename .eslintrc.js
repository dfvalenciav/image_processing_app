module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
    jasmine: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
 
  rules: {
    'prettier/prettier': 'error',
  },
  
  parser : 'babel-eslint'
};
