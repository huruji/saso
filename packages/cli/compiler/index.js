const fs = require('fs')
const path = require('path')

const getConfig = require('./utils/get-config.js')
const Hook = require('./Hook')

class Compiler {
  constructor() {
    this.config = getConfig()
    this.config.entry = this.findEntry(this.config)
    this.hooks = new Hook()
  }

  // run() {
  // }

  static findEntry(config) {
    const jsfiles = ['index.js', 'main.js', 'src/index.js', 'src/main.js']
    const htmlFiles = ['index.html', 'src/index.html']
    let files = []

    if (config.entry) {
      return config.entry
    }
    if (config.pagePath) {
      return config.pagePath
    }
    if (!config.page) {
      files = files.concat(jsfiles)
    }
    files = files.concat(htmlFiles)
    return files.filter(e => fs.existsSync(path.resolve(process.cwd(), e)))[0]
  }
}


module.exports = Compiler
