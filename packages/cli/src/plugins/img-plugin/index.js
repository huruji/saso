module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    const imgRule = c.module.rule('compile img').test(/\.(png|jpg|gif|woff|svg|eot|ttf)$/)
    imgRule
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: 8192
      })
    imgRule
      .use('img-loader')
      .loader(require.resolve('img-loader'))
      /* eslint global-require: 0 */
      .options({
        plugins: [
          require('imagemin-mozjpeg')({
            quality: 80
          }),
          require('imagemin-optipng')({}),
          require('imagemin-gifsicle')({})
        ]
      })
  })
}
