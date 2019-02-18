const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const setPort = require('../../util/setPort');

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompileAsync', async (config) => {
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
