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
    if (analyzerConfig.port || analyzerConfig.analyzerPort) {
      initPort = analyzerConfig.analyzerPort || analyzerConfig.port
    }
    const port = await setPort({
      port: initPort
    });
    analyzerConfig.analyzerPort = port
    analyzerConfig.analyzerMode = analyzerConfig.analyzerMode || analyzerConfig.mode || 'server'
    analyzerConfig.analyzerHost = analyzerConfig.analyzerHost || analyzerConfig.host || '127.0.0.1'
    analyzerConfig.logLevel = analyzerConfig.logLevel || 'silent';
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
      Object.assign(analyzerConfig, {
        analyzerPort: port
      })
    ]);
  });
};
