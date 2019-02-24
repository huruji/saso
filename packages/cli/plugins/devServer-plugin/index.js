const { HotModuleReplacementPlugin } = require('webpack');
const OpenBrowserPlugin = require('open-browser-plugin');

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
    config.devServer
      .contentBase(dist)
      .hot(true)
      .compress(false)
      .historyApiFallback(true)
      .stats('errors-only')
      .watchContentBase(true);

    config.plugin('openbrowser').use(OpenBrowserPlugin, [`http://localhost:${port}`]);
    config.plugin('hot').use(HotModuleReplacementPlugin);
  });
};
