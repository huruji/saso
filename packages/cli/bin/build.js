const log = require('@saso/log')
const webpack = require('webpack')
const config = require('../util/config')
const notifier = require('../util/notifier')
const getWebpackConfig = require('../config/webpack.config')

module.exports = async (opt, cmd) => {
  const cfg = config.initConfig()
  notifier()

  const webpackConfig = getWebpackConfig(cfg)
  const compiler = webpack(webpackConfig)
  compiler.run((err, stats) => {
    if (err) console.log(err);
    console.log(stats.toString())
  })
}
