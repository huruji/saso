const cosmiconfig = require('cosmiconfig')
const defaultConfig = require('./defaultConfig')


module.exports = (cliConfig) => {
  let config = defaultConfig
  const explorer = cosmiconfig('saso')
  const result = explorer.searchSync()
  if (result && result.config) {
    config = Object.assign(config, result.config)
  }
  config = Object.assign(config, cliConfig)
  return config
}
