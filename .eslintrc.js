module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['simple-import-sort', 'react'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
