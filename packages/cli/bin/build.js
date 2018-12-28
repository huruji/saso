const log = require('@saso/log')
const config = require('../util/config')
const notifier = require('../util/notifier')

module.exports = async (opt, cmd) => {
  config.initConfig();
  notifier();
}
