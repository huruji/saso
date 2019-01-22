const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InertEntryPlugin = require('inert-entry-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin2')
const exclude = require('./exclude')


function initConfig(CFG) {
  console.log(CFG.pagePath)
  const defaultConfig = {
    context: CFG.sourceDir,
    entry: CFG.pagePath || CFG.entry,
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
    },
    plugins: [
      new ProgressBarPlugin({
        clear: false
      }),
    ]
  }

  if (path.extname(CFG.pagePath) === '.html') {
    defaultConfig.module.rules.push({
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
      test: /index\.js$/,
      exclude,
      use: [{
        loader: require.resolve('spawn-loader'),
        options: {
          name: '[name].js'
        }
      }]
    })

    defaultConfig.plugins.push(new ExtractTextPlugin(path.basename(CFG.pagePath)))
  }
  return defaultConfig
}


module.exports = initConfig;
