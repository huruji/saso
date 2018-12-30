const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InertEntryPlugin = require('inert-entry-webpack-plugin');
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
        test: /\.html$/,
        use: ExtractTextPlugin.extract({
          loader: require.resolve('html-loader'),
          options: {
            attrs: [
              'link:href',
              'script:src'
            ]
          }
        })
      }, {
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
      }, {
        test: /index\.js$/,
        exclude,
        use: [{
          loader: require.resolve('spawn-loader'),
          options: {
            name: '[name].js'
          }
        }]
      }]
    },
    plugins: [
      new ExtractTextPlugin('index.html')
    ]
  }
  return defaultConfig
}


module.exports = initConfig;
