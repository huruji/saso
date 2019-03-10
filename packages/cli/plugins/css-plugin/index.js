const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const cosmiconfig = require('cosmiconfig')
const path = require('path')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    const isProd = config.toConfig().mode === 'production'
    const postcssConfig = cosmiconfig('postcss').searchSync()

    const cssRule = config.module.rule('compile css').test(/\.css$/)
    const sassRule = config.module.rule('compile sass').test(/\.s[a|c]ss$/)
    const lessRule = config.module.rule('compile less').test(/\.less$/)
    const stylusRule = config.module.rule('compile stylus').test(/\.styl$/)

    const postcssOptions = {
      config: {
        path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
      }
    }

    if (isProd) {
      cssRule.use('css-style-loader').loader(require.resolve('style-loader'))
      sassRule.use('sass-style-loader').loader(require.resolve('style-loader'))
      lessRule.use('less-style-loader').loader(require.resolve('style-loader'))
      stylusRule.use('stylus-style-loader').loader(require.resolve('style-loader'))
    } else {
      cssRule.use('css-mini-css').loader(MiniCssExtractPlugin.loader)
      sassRule.use('sass-mini-css').loader(MiniCssExtractPlugin.loader)
      lessRule.use('less-mini-css').loader(MiniCssExtractPlugin.loader)
      stylusRule.use('stylus-mini-css').loader(MiniCssExtractPlugin.loader)
    }

    // set css-loader
    cssRule.use('css-loader').loader(require.resolve('css-loader'))
    sassRule.use('css-loader').loader(require.resolve('css-loader'))
    lessRule.use('css-loader').loader(require.resolve('css-loader'))
    stylusRule.use('css-loader').loader(require.resolve('css-loader'))

    // set postcss
    cssRule
      .use('css-postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options(postcssOptions)

    sassRule
      .use('sass-postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options(postcssOptions)

    lessRule
      .use('less-postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options(postcssOptions)

    stylusRule
      .use('stylus-postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options(postcssOptions)

    // set sass-loader
    sassRule
      .use('sass-loader')
      .loader(require.resolve('sass-loader'))
      .end()

    // set less-loader
    lessRule
      .use('less-loader')
      .loader(require.resolve('less-loader'))
      .end()

    // set stylus-loader
    stylusRule
      .use('stylus-loader')
      .loader(require.resolve('stylus-loader'))
      .end()

    config.plugin('extra css').use(MiniCssExtractPlugin, [
      {
        filename: isProd ? '[name].[hash].css' : '[name].css'
      }
    ])

    config.plugin('fix style entry').use(FixStyleOnlyEntriesPlugin)
  })
}
