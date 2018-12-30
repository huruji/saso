const path = require('path');
const chainGet = require('chain-get')
// const Cookie = require('./service/cookie');
// const helper = require('./helper');

const config = {};

const findConfigPath = require('./find-config-path')

const defaultConfig = {
  cwd: process.cwd(),
  distDir: path.resolve(process.cwd(), 'dist'),
  sourceDir: path.resolve(process.cwd(), 'src'),
  resourceDomain: 'wq.360buyimg.com',
  pkgDirName: 'public',
  pagePath: path.resolve(process.cwd(), 'src', 'index.js')
}

// const getRootPath = () => {

// }
function initConfig() {
  const configPath = findConfigPath();
  config.packageRoot = configPath ? path.dirname(configPath) : process.cwd();

  // if (configPath) {

  // }

  // config.packageRoot = (function () {
  //   const cwd = process.cwd();
  //   const proConfigPath = helper.getProCfgPath(cwd);
  //   if (!proConfigPath) throw '没有找到项目配置文件';
  //   const ret = Path.resolve(proConfigPath, '../node_modules');
  //   const projFullDirName = Path.dirname(proConfigPath);
  //   config.pageDirName = cwd.replace(projFullDirName + Path.sep, '').replace('\\', '/');
  //   config.projDirName = Path.basename(projFullDirName);
  //   config.proConfigPath = proConfigPath;
  //   // console.log(`Legos:工程目录:${config.projDirName},页面目录:${config.pageDirName}`)
  //   return ret;
  // }());
  // config.cwd = process.cwd();
  // config.distDir = path.resolve(config.cwd, 'dist');
  // config.sourceDir = path.resolve(config.cwd, 'src');
  // config.resourceDomain = 'wq.360buyimg.com';
  // config.pkgDirName = 'public';
  config.legosRoot = path.resolve(__dirname, '../../')
  config.gbLibPath = path.resolve(config.packageRoot, '@jdc/gb/static/sass')
  config.gbWidgetPath = path.resolve(config.packageRoot, '@jdc/gb/widget')
  config.gbPath = path.resolve(config.packageRoot, '@jdc/gb')
  const cfg = Object.assign({}, defaultConfig, config)
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

config.getErpName = function () {
  console.log('get erpName start...');
  return Cookie.getCookie().then((cookie) => {
    console.log('get erp name cookie', cookie);
    if (cookie instanceof Array) {
      return cookie[2].split('=')[1];
    }
    console.log('get erpName empty');
    return '';
  });
};

module.exports = config;
