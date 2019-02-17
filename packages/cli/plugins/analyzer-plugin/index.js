const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin);
  });
};
