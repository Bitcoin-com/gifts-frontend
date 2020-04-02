module.exports = {
  parser: 'babel-eslint',
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'react-app',
  ],
  plugins: ['prettier', 'react-hooks'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-plusplus': 0,
    'import/no-named-as-default': 0,
    'no-console': 'off',
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
