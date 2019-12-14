import WebpackChain from 'webpack-chain'
import * as fs from 'fs'
import * as path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import logger from 'saso-log'
import portfinder from 'portfinder'
import Hook from './Hook'
import pick from './utils/pick'
import getConfig from './utils/getConfig'
import createWebpackChain from './utils/createWebpackChain'

class Compiler implements SasoCompiler {
  config: SasoConfig & { webpackChain?: WebpackChain } & SasoCliOpt & { debug?: boolean }
  hooks: Hook
  plugins: { resolve: string }[]
  mode: 'development' | 'production'
  constructor(opt: SasoCliOpt) {
    this.handleCliOpts(opt)
    this.config = getConfig(this.config)
    this.findEntry(this.config)
    this.setOutput()
    this.hooks = new Hook()
    if (!this.config.entry) {
      throw new Error('an entry point is needed')
    }
    this.initPlugins()
    this.applyPlugins()
  }

  async run(): Promise<void> {
    portfinder.basePort = this.config.port
    this.config.port = await portfinder.getPortPromise()
    this.hooks.invoke('afterConfigure', this.config)
    await this.hooks.invokePromise('afterConfigureAsync', this.config)

    this.config.webpackChain = createWebpackChain(this.config)

    this.config.webpackChain.sasoConfig = this.config
    this.hooks.invoke('beforeCompile', this.config.webpackChain)
    await this.hooks.invokePromise('beforeCompileAsync', this.config.webpackChain)

    logger.debug(JSON.stringify(this.config.webpackChain.toConfig(), null, 2))

    const webpackConfig = this.config.webpackChain.toConfig()
    const webpackCompiler = webpack(webpackConfig)
    if (this.config.dev) {
      const contentBase: string[] = []
      const entries = webpackConfig.entry as string[]
      Object.values(entries).forEach((entry) => {
        entry.forEach((e) => {
          const dir = path.dirname(e)
          if (!contentBase.includes(dir)) {
            contentBase.push(dir)
          }
        })
      })
      const devServerOptions = {
        contentBase,
        compress: false,
        hot: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchContentBase: true,
        inline: true,
        open: `http://localhost:${this.config.port}`,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
      if (this.config.proxy) {
        devServerOptions.proxy = this.config.proxy
      }
      WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)
      const server = new WebpackDevServer(webpackCompiler, devServerOptions)
      server.listen(this.config.port, '127.0.0.1', (err) => {
        if (err) logger.error(err)
        logger.notice(`\nStarting server on http://localhost:${this.config.port}`)
      })
    } else if (this.config.watch) {
      webpackCompiler.watch({}, (err, stats) => {
        if (err) logger.error(err)

        const info = stats.toJson()

        if (stats.hasWarnings()) {
          for (const warn of info.warnings) {
            console.warn(warn)
          }
        }

        if (stats.hasErrors()) {
          for (const error of info.errors) {
            console.error(error)
          }
        }
      })
    } else {
      webpackCompiler.run((err, stats) => {
        if (err) logger.error(err)

        const info = stats.toJson()

        if (stats.hasWarnings()) {
          for (const warn of info.warnings) {
            console.warn(warn)
          }
        }

        if (stats.hasErrors()) {
          for (const error of info.errors) {
            console.error(error)
          }
        }
      })
    }
  }

  initPlugins(): void {
    const plugins = [
      {
        resolve: require.resolve('../plugins/js-plugin')
      },
      {
        resolve: require.resolve('../plugins/progress-plugin')
      },
      {
        resolve: require.resolve('../plugins/author-info-plugin')
      },
      {
        resolve: require.resolve('../plugins/vue-plugin')
      },
      {
        resolve: require.resolve('../plugins/css-plugin')
      },
      {
        resolve: require.resolve('../plugins/img-plugin')
      },
      {
        resolve: require.resolve('../plugins/optimization-plugin')
      },
      {
        resolve: require.resolve('../plugins/analyzer-plugin')
      },
      {
        resolve: require.resolve('../plugins/devServer-plugin')
      },
      {
        resolve: require.resolve('../plugins/size-table-plugin')
      },
      {
        resolve: require.resolve('../plugins/build-info-plugin')
      },
      {
        resolve: require.resolve('../plugins/html-multi-entry-plugin')
      },
      {
        resolve: require.resolve('../plugins/global-plugin')
      }
    ]

    this.plugins = plugins
  }

  hook(name: string, fn: Function): void {
    this.hooks.add(name, fn)
  }

  applyPlugins(): void {
    this.plugins.forEach((plugin) => {
      /* eslint-disable */
      plugin.resolve = require(plugin.resolve)
      /* eslint-enable */
      plugin.resolve.apply(this)
    })
  }

  findEntry(config: SasoConfig): void {
    const jsfiles = [ 'index.js', 'main.js', 'src/index.js', 'src/main.js' ]
    const htmlFiles = [ 'index.html', 'src/index.html' ]
    let files: Array<string> = []

    if (config.entry) {
      return
    }
    if (config.pagePath) {
      this.config.entry = config.pagePath
      return
    }
    files = files.concat(htmlFiles)
    if (!config.page) {
      files = files.concat(jsfiles)
    }
    this.config.entry = files.map((file) => path.resolve(process.cwd(), file)).filter((file) => fs.existsSync(file))[0]
    if (!fs.existsSync(this.config.entry)) {
      logger.error('entrypoint file is not found, you should make a file as entrypoint.')
      process.exit(0)
    }
  }

  setOutput(): void {
    if (!this.config.outputPath) {
      this.config.outputPath = path.resolve(process.cwd(), './dist')
    }
    if (!this.config.outputFile) {
      this.config.outputFile = path.basename(this.config.entry)
    }
  }

  handleCliOpts(opt: SasoCliOpt): void {
    this.config = {}
    const cliOpts = [ 'analyzer', 'clear', 'configFile', 'debug', 'dev', 'entry', 'port', 'prod', 'watch', 'minify' ]
    // eslint-disable-next-line prefer-spread
    const results = pick.apply(null, [ opt ].concat(cliOpts))
    Object.assign(this.config, results)
    Object.assign(this, results)
    if (opt.dev) {
      this.config.prod = false
      this.config.dev = true
      this.mode = 'development'
      this.config.mode = this.mode
    } else {
      this.mode = 'production'
      this.config.prod = true
      this.config.dev = false
      this.config.mode = this.mode
    }
    if (this.config.debug) {
      global.debug = true
    }
  }
}

export default Compiler
