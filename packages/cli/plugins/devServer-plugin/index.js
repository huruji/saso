const { HotModuleReplacementPlugin } = require('webpack');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const LiveReloadPlugin = require('webpack-livereload-plugin');
const open = require('open');

let hasOpen = false;
class openBrowser {
  constructor(url) {
    this.url = url || 'http://google.com';
  }

  apply(compiler) {
    const url = this.url;
    compiler.hooks.afterEmit.tap('openBrowser', () => {
      if (!hasOpen) open(url);
      hasOpen = true;
    });
  }
}

module.exports.apply = (compiler) => {
  let isWatch = false;
  let port = 7000;
  compiler.hook('afterConfigure', (config) => {
    isWatch = config.watch;
    port = config.port;
  });
  compiler.hook('beforeCompile', (config) => {
    if (!isWatch) return;
    const dist = config.toConfig().output.path;
    const entrys = config.toConfig().entry;
    config.devServer
      .contentBase(dist)
      .hot(true)
      .compress(false)
      .historyApiFallback(true)
      .stats('errors-only')
      .watchContentBase(true);

    config.plugin('openbrowser').use(openBrowser, [`http://localhost:${port}`]);
    // config.plugin('livereload').use(LiveReloadPlugin, [
    //   {
    //     hostname: 'localhost'
    //   }
    // ]);
    // config.plugin('browserSync').use(BrowserSyncPlugin, [
    //   {
    //     host: 'localhost',
    //     port,
    //     server: {
    //       baseDir: [dist]
    //     }
    //   }
    // ]);
    // for (const entry in entrys) {
    //   if (config.entryPoints.has(entry)) {
    // config.entry('index').prepend('webpack-dev-server/client?http://localhost:7001');
    //   }
    // }
    config.plugin('hot').use(HotModuleReplacementPlugin);
  });
};
