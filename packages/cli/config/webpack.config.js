const path = require('path')
const exclude = require('./exclude')

function initConfig(CFG) {
  const defaultConfig = {
    context: CFG.sourceDir,
    entry: CFG.pagePath,
    output: {
      path: CFG.distDir,
      filename: path.basename(CFG.rawPage.pagePath)
    },
    devtool: 'cheap-source-map',
    module: {
      rules: {
        test: /\.js$/,
        exclude,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
          }
        ]
      }
    }
  }
  return defaultConfig
}


module.exports = initConfig;
