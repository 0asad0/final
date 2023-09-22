module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    'react-native/react-native': true
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:react-native/all'],
  plugins: ['react', 'react-native'],
  rules: {}
}
