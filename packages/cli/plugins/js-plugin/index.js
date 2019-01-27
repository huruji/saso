module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options({
        presets: [
          require.resolve('@babel/preset-env')
        ]
      })
      .end()
  })
}
