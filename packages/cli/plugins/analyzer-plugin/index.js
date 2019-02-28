const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const setPort = require('../../util/setPort');

module.exports.apply = (compiler) => {
  let analyzerConfig
  compiler.hook('afterConfigure', (config) => {
    if (config.analyzer) analyzerConfig = config.analyzer
  })
  compiler.hook('beforeCompileAsync', async (config) => {
    if (!analyzerConfig) return
    let initPort = 8888;
    if (analyzerConfig.port) {
      initPort = analyzerConfig.port
    }
    const port = await setPort({
      port: initPort
    });
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
      Object.assign(analyzerConfig, {
        port
      })
    ]);
  });
};
