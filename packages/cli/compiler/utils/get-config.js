const jsonFile = require('jsonfile')
const findConfigPath = require('../../util/find-config-path')
const defaultConfig = require('./detault-config')

module.exports = () => {
  let config = defaultConfig
  const configFile = findConfigPath()
  if (configFile) {
    const userConfig = jsonFile.readFileSync(configFile)
    config = Object.assign(config, userConfig)
  }
  return config
}
