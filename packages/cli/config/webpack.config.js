const path = require('path')
const exclude = require('./exclude')

function initConfig(CFG) {
  console.log(CFG.distDir)
  const defaultConfig = {
    context: CFG.sourceDir,
    entry: CFG.pagePath,
    output: {
      path: CFG.distDir,
      filename: path.basename(CFG.pagePath)
    },
    devtool: 'cheap-source-map',
    module: {
      rules: [{
        test: /\.js$/,
        exclude,
        use: [{
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [require.resolve('@babel/preset-env')]
            ]
          }
        }]
      }]
    }
  }
  return defaultConfig
}


module.exports = initConfig;
