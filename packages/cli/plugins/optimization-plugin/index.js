module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config.optimization.splitChunks({
      chunks: 'initial',
      automaticNameDelimiter: '~',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 30000,
      name: true
    });
  });
};
