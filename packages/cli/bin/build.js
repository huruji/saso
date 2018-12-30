const webpack = require('webpack')
const statsLog = require('webpack-stats-logger').default
const config = require('../util/config')
const notifier = require('../util/notifier')
const getWebpackConfig = require('../config/webpack.config')

module.exports = async (opt, cmd) => {
  const cfg = config.initConfig()
  notifier()

  const webpackConfig = getWebpackConfig(cfg)
  const compiler = webpack(webpackConfig)
  compiler.run((err, stats) => {
    statsLog(err, stats)
  })
}
