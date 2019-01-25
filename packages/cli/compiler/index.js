const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

const getConfig = require('./utils/get-config.js')
const Hook = require('./Hook')
const createWebpackChain = require('./utils/createWebpackChain')

class Compiler {
  constructor(opt) {
    this.watch = opt.watch
    this.config = getConfig()
    this.findEntry(this.config)
    this.setOutput()
    this.hooks = new Hook()
    if (!this.config.entry) {
      throw new Error('an entry point is needed')
    }
    this.config.webpackChain = createWebpackChain(this.config)
    this.initPlugins()
    this.applyPlugins()
  }

  // run() {
  // }
  run() {
    this.hooks.invoke('beforeCompile', this.config.webpackChain)
    const webpackConfig = this.config.webpackChain.toConfig()
    const webpackCompiler = webpack(webpackConfig)
    webpackCompiler.run((err, stats) => {
      if (err) console.log(err)

      const info = stats.toJson()

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }

      if (stats.hasErrors()) {
        console.error(info.errors);
      }
    })
  }

  initPlugins() {
    const plugins = [{
      resolve: require.resolve('../plugins/test-plugin/test.js')
    }, {
      resolve: require.resolve('../plugins/js-plugin')
    }, {
      resolve: require.resolve('../plugins/progress-plugin')
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
    this.config.entry = files
      .map(file => path.resolve(process.cwd(), file))
      .filter(file => fs.existsSync(file))[0]
  }

  setOutput() {
    if (!this.config.outputPath) {
      this.config.outputPath = path.resolve(process.cwd(), './dist')
    }
    if (!this.config.outputFile) {
      this.config.outputFile = path.basename(this.config.entry)
    }
  }
}


module.exports = Compiler
