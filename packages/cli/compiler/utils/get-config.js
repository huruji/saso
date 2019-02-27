const jsonFile = require('jsonfile')
const findConfigPath = require('../../util/find-config-path')
const defaultConfig = require('./detault-config')

module.exports = (cliConfig) => {
  let config = defaultConfig
  const configFile = findConfigPath()
  if (configFile) {
    // eslint-disable-next-line
    const userConfig = require(configFile)
    config = Object.assign(config, userConfig)
  }
  config = Object.assign(config, cliConfig)
  return config
}
