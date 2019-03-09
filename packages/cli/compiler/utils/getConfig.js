const cosmiconfig = require('cosmiconfig')
const assign = require('assign-deep')
const defaultConfig = require('./defaultConfig')

module.exports = (cliConfig) => {
  let config = defaultConfig
  const explorer = cosmiconfig('saso')
  const result = explorer.searchSync()
  if (result && result.config) {
    config = assign(config, result.config)
  }
  config = assign(config, cliConfig)
  return config
}
