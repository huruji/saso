module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config
      .optimization
      .splitChunks({
        chunks: 'initial'
      })
  })
}
