const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    const sassRule = config.module
      .rule('compile sass')
      .test(/\.s[a|c]ss$/)

    const cssRule = config.module
      .rule('compile css')
      .test(/\.css$/)

    const lessRule = config.module
      .rule('compile less')
      .test(/\.less/)

    sassRule
      .use('style-loader')
      .loader(require.resolve('style-loader'))
    sassRule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
    sassRule
      .use('sass-loader')
      .loader(require.resolve('sass-loader'))
      .end()


    cssRule
      .use('mini-css')
      .loader(MiniCssExtractPlugin.loader)
    cssRule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .end()

    lessRule
      .use('style-loader')
      .loader(require.resolve('style-loader'))
    lessRule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
    lessRule
      .use('less-loader')
      .loader(require.resolve('less-loader'))

    config.plugin('extra css')
      .use(MiniCssExtractPlugin, [{
        filename: 'index.css'
      }])
  })
}
