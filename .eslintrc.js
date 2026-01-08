module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'github'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:github/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    // Customize rules here
    'prettier/prettier': 'error'
  },
  env: {
    node: true,
    es2022: true
  }
};
