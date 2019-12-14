import { cosmiconfigSync } from 'cosmiconfig'
import * as path from 'path'
import defaultConfig from './defaultConfig'
import assign from 'assign-deep'

export default (cliConfig): SasoConfig => {
  let config = defaultConfig
  const explorer = cosmiconfigSync('saso')
  let result
  if (cliConfig.configFile) result = explorer.load(cliConfig.configFile)
  else result = explorer.search()
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
