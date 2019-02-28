const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('saso-log');

const getConfig = require('./utils/getConfig');
const Hook = require('./Hook');
const createWebpackChain = require('./utils/createWebpackChain');
const setPort = require('../util/setPort');

class Compiler {
  constructor(opt) {
    this.handleCliOpts(opt)
    this.config = getConfig(this.config);
    this.findEntry(this.config);
    this.setOutput();
    this.hooks = new Hook();
    if (!this.config.entry) {
      throw new Error('an entry point is needed');
    }
    this.initPlugins();
    this.applyPlugins();
  }

  async run() {
    this.config.port = await setPort({
      port: this.config.port
    });
    this.hooks.invoke('afterConfigure', this.config);
    await this.hooks.invokePromise('afterConfigure', this.config);

    this.config.webpackChain = createWebpackChain(this.config);

    this.hooks.invoke('beforeCompile', this.config.webpackChain);
    await this.hooks.invokePromise('beforeCompileAsync', this.config.webpackChain);
    if (this.config.webpackconfig) {
      logger.notice(JSON.stringify(this.config.webpackChain.toConfig(), null, 2));
    }
    // console.log(JSON.stringify(this.config.webpackChain.toConfig(), null, 2));
    // clear(true);
    // c()
    const webpackConfig = this.config.webpackChain.toConfig();
    const webpackCompiler = webpack(webpackConfig);
    if (this.config.watch) {
      const contentBase = [];
      const entries = webpackConfig.entry;
      Object.values(entries).forEach((entry) => {
        entry.forEach((e) => {
          const dir = path.dirname(e);
          if (!contentBase.includes(dir)) {
            contentBase.push(dir);
          }
        });
      });
      const devServerOptions = {
        contentBase,
        compress: false,
        hot: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchContentBase: true,
        inline: true,
        open: `http://localhost:${this.config.port}`
      };
      WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
      const server = new WebpackDevServer(webpackCompiler, devServerOptions);
      server.listen(this.config.port, '127.0.0.1', (err) => {
        if (err) logger.error(err);
        logger.notice(`\nStarting server on http://localhost:${this.config.port}`);
      });
    } else {
      webpackCompiler.run((err, stats) => {
        if (err) logger.error(err);

        const info = stats.toJson();

        if (stats.hasWarnings()) {
          for (const warn of info.warnings) {
            console.warn(warn);
          }
        }

        if (stats.hasErrors()) {
          for (const error of info.errors) {
            console.error(error);
          }
        }
      });
    }
  }

  initPlugins() {
    const plugins = [
      {
        resolve: require.resolve('../plugins/test-plugin/test.js')
      },
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
      }
    ];
    if (this.config.htmlEntryMode === 'normal') {
      plugins.push({
        resolve: require.resolve('../plugins/html-multi-entry-plugin')
      });
    } else {
      plugins.push({
        resolve: require.resolve('../plugins/html-entry-plugin')
      });
    }

    this.plugins = plugins;
  }

  hook(name, fn) {
    this.hooks.add(name, fn);
  }

  applyPlugins() {
    this.plugins.forEach((plugin) => {
      /* eslint-disable */
      plugin.resolve = require(plugin.resolve);
      /* eslint-enable */
      plugin.resolve.apply(this);
    });
  }

  findEntry(config) {
    const jsfiles = ['index.js', 'main.js', 'src/index.js', 'src/main.js'];
    const htmlFiles = ['index.html', 'src/index.html'];
    let files = [];

    if (config.entry) {
      return;
    }
    if (config.pagePath) {
      this.config.entry = config.pagePath;
      return;
    }
    files = files.concat(htmlFiles);
    if (!config.page) {
      files = files.concat(jsfiles);
    }
    this.config.entry = files.map(file => path.resolve(process.cwd(), file)).filter(file => fs.existsSync(file))[0];
  }

  setOutput() {
    if (!this.config.outputPath) {
      this.config.outputPath = path.resolve(process.cwd(), './dist');
    }
    if (!this.config.outputFile) {
      this.config.outputFile = path.basename(this.config.entry);
    }
  }

  handleCliOpts(opt) {
    this.config = {};
    if (opt.watch) {
      this.watch = true;
      this.config.watch = this.watch;
    }
    if (opt.prod) {
      this.mode = 'production';
      this.config.mode = this.mode;
    }
    if (opt.dev) {
      this.mode = 'development'
      this.config.mode = this.mode;
    }
    if (opt.webpackconfig) {
      this.webpackconfig = true
      this.config.webpackconfig = this.webpackconfig
    }
  }
}

module.exports = Compiler;
