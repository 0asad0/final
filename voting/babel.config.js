module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/utils/helpers',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@validations': './src/validations'
        }
      }
    ]
  ]
}
