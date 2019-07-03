module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    c.optimization.splitChunks({
      chunks: 'initial',
      automaticNameDelimiter: '~',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 30000,
      name: true
    })
  })
}
