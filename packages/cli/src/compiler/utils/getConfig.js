const cosmiconfig = require('cosmiconfig')
const assign = require('assign-deep')
const path = require('path')
const defaultConfig = require('./defaultConfig')

module.exports = (cliConfig) => {
  let config = defaultConfig
  const explorer = cosmiconfig('saso')
  let result
  if (cliConfig.configFile) result = explorer.loadSync(cliConfig.configFile)
  else result = explorer.searchSync()
  if (result && result.config) {
    config = assign(config, result.config)
  }
  config = assign(config, cliConfig)
  // 如果含有 outputPath，检查是否是绝对路径，不是绝对路径则处理成绝对路径
  if (config.outputPath && !path.isAbsolute(config.outputPath)) {
    config.outputPath = path.resolve(process.cwd(), config.outputPath)
  }
  return config
}
