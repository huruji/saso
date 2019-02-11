const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const getConfig = require('./utils/get-config.js');
const Hook = require('./Hook');
const createWebpackChain = require('./utils/createWebpackChain');
const setPort = require('../util/setPort')

class Compiler {
  constructor(opt) {
    this.watch = opt.watch;
    this.mode = 'development'
    if (opt.prod) {
      this.mode = 'production';
    }
    this.config = getConfig({
      mode: this.mode
    });
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
    console.log(this.config.port)
    this.config.port = await setPort({
      port: this.config.port
    })
    this.hooks.invoke('afterConfigure', this.config);

    this.config.webpackChain = createWebpackChain(this.config);

    this.hooks.invoke('beforeCompile', this.config.webpackChain);
    const webpackConfig = this.config.webpackChain.toConfig();
    const webpackCompiler = webpack(webpackConfig);
    console.log(JSON.stringify(this.config.webpackChain.toConfig(), null, 2));
    webpackCompiler.run((err, stats) => {
      if (err) console.log(err);

      const info = stats.toJson();

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
    });
  }

  initPlugins() {
    console.log('resolve:', require.resolve('../plugins/html-entry-plugin'))
    const plugins = [{
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
      resolve: require.resolve('../plugins/size-table-plugin')
    },
    {
      resolve: require.resolve('../plugins/vue-plugin')
    },
    {
      resolve: require.resolve('../plugins/css-plugin')
    }
    ];
    console.log(this.config.htmlEntryMode)
    if (this.config.htmlEntryMode === 'normal') {
      plugins.push({
        resolve: require.resolve('../plugins/html-multi-entry-plugin')
      })
    } else {
      plugins.push({
        resolve: require.resolve('../plugins/html-entry-plugin')
      })
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
    console.log(config.page)
    files = files.concat(htmlFiles);
    if (!config.page) {
      files = files.concat(jsfiles);
    }
    this.config.entry = files
      .map(file => path.resolve(process.cwd(), file))
      .filter(file => fs.existsSync(file))[0];
    console.log(this.config.entry)
  }

  setOutput() {
    if (!this.config.outputPath) {
      this.config.outputPath = path.resolve(process.cwd(), './dist');
    }
    if (!this.config.outputFile) {
      this.config.outputFile = path.basename(this.config.entry);
    }
  }
}

module.exports = Compiler;
