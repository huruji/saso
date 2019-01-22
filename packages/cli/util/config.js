const path = require('path')
const chainGet = require('chain-get')
const findEntryPoint = require('./find-entry-point')
// const Cookie = require('./service/cookie');
// const helper = require('./helper');

const config = {};

const findConfigPath = require('./find-config-path')
const getPagePath = require('./getPagePath')

const defaultConfig = {
  cwd: process.cwd(),
  distDir: path.resolve(process.cwd(), 'dist'),
  sourceDir: path.resolve(process.cwd(), 'src'),
  resourceDomain: 'wq.360buyimg.com',
  pkgDirName: 'public',
}


function initConfig() {
  const configPath = findConfigPath()
  config.packageRoot = configPath ? path.dirname(configPath) : process.cwd()
  config.legosRoot = path.resolve(__dirname, '../../')
  config.gbLibPath = path.resolve(config.packageRoot, '@jdc/gb/static/sass')
  config.gbWidgetPath = path.resolve(config.packageRoot, '@jdc/gb/widget')
  config.gbPath = path.resolve(config.packageRoot, '@jdc/gb')
  const cfg = Object.assign({}, defaultConfig, config)
  // 获取入口
  if (!cfg.pagePath && !cfg.entry) {
    cfg.entry = findEntryPoint(cfg.page)
  }

  // if (!cfg.pagePath) {
  //   cfg.pagePath = getPagePath(cfg.sourceDir)
  // }

  const tempData = {};
  config.setTempData = function (key, value) {
    // console.log('设置临时数据',key)
    tempData[key] = value
  }
  config.getTempData = function (key) {
    // console.log('取出临时数据',key)
    return tempData[key]
  }
  return cfg
}
config.initConfig = initConfig;


module.exports = config;
