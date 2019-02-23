const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const setPort = require('../../util/setPort');

module.exports.apply = (compiler) => {
  let needAnalyzer
  compiler.hook('afterConfigure', (config) => {
    if (config.analyzer) needAnalyzer = true
  })
  compiler.hook('beforeCompileAsync', async (config) => {
    if (!needAnalyzer) return
    const port = await setPort({
      port: 8888
    });
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
      {
        analyzerPort: port
      }
    ]);
  });
};
