const fs = require('fs')
const path = require('path')

const getConfig = require('./utils/get-config.js')
const Hook = require('./Hook')

class Compiler {
  constructor() {
    this.config = getConfig()
    this.findEntry(this.config)
    this.hooks = new Hook()
    this.initPlugins()
    this.applyPlugins()
  }

  // run() {
  // }
  run() {
    this.hooks.invoke('beforeCompile', this.config)
    console.log('start Compile')
  }

  initPlugins() {
    const plugins = [{
      resolve: require.resolve('../plugins/test-plugin/test.js')
    }]
    this.plugins = plugins
  }

  hook(name, fn) {
    this.hooks.add(name, fn)
  }

  applyPlugins() {
    this.plugins.forEach((plugin) => {
      /* eslint-disable */
      plugin.resolve = require(plugin.resolve)
      /* eslint-enable */
      plugin.resolve.apply(this)
    })
  }

  findEntry(config) {
    const jsfiles = ['index.js', 'main.js', 'src/index.js', 'src/main.js']
    const htmlFiles = ['index.html', 'src/index.html']
    let files = []

    if (config.entry) {
      return
    }
    if (config.pagePath) {
      this.config.entry = config.pagePath
      return
    }
    if (!config.page) {
      files = files.concat(jsfiles)
    }
    files = files.concat(htmlFiles)
    this.config.entry = files.filter(e => fs.existsSync(path.resolve(process.cwd(), e)))[0]
  }
}


module.exports = Compiler
