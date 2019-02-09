module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config.module
      .rule('compile sass')
      .test(/\.s[a|c]ss$/)
      .use('scss-loader')
      .loader(require.resolve('style-loader'))
      .loader(require.resolve('css-loader'))
      .loader(require.resolve('sass-loader'))
      .end()

    config.module
      .rule('compile css')
      .test(/\.css$/)
      .use('css-loader')
      .loader(require.resolve('style-loader'))
      .loader(require.resolve('css-loader'))
      .end()

    config.module
      .rule('compile less')
      .test(/\.less/)
      .use('less-loader')
      .loader(require.resolve('style-loader'))
      .loader(require.resolve('css-loader'))
      .loader(require.resolve('less-loader'))
  })
}
