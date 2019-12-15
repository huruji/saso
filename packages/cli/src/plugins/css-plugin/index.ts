import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import { cosmiconfigSync } from 'cosmiconfig'
import * as path from 'path'
import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const isProd = c.toConfig().mode === 'production'
      const postcssConfig = cosmiconfigSync('postcss', {
        stopDir: process.cwd()
      }).search()

      const cssRule = c.module.rule('compile css').test(/\.css$/)
      const sassRule = c.module.rule('compile sass').test(/\.s[a|c]ss$/)
      const lessRule = c.module.rule('compile less').test(/\.less$/)
      const stylusRule = c.module.rule('compile stylus').test(/\.styl(us)?$/)

      const postcssOptions = {
        config: {
          path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
        }
      }

      if (!isProd) {
        cssRule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
        sassRule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
        lessRule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
        stylusRule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
      } else {
        cssRule.use('css-mini-css').loader(MiniCssExtractPlugin.loader)
        sassRule.use('sass-mini-css').loader(MiniCssExtractPlugin.loader)
        lessRule.use('less-mini-css').loader(MiniCssExtractPlugin.loader)
        stylusRule.use('stylus-mini-css').loader(MiniCssExtractPlugin.loader)
      }

      // set css-loader
      cssRule.use('css-loader').loader(require.resolve('css-loader'))
      sassRule.use('css-loader').loader(require.resolve('css-loader')).options({
        sourceMap: true,
        importLoaders: 1
      })
      lessRule.use('css-loader').loader(require.resolve('css-loader'))
      stylusRule.use('css-loader').loader(require.resolve('css-loader'))

      // set postcss
      cssRule.use('css-postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions)

      sassRule.use('sass-postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions)

      lessRule.use('less-postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions)

      stylusRule.use('stylus-postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions)

      // set sass-loader
      sassRule.use('resolve-url-loader').loader(require.resolve('resolve-url-loader')).options({
        sourceMap: true,
        keepQuery: true,
        debug: false
      })

      sassRule
        .use('sass-loader')
        .loader(require.resolve('sass-loader'))
        .options({
          sourceMap: true,
          sourceMapContents: false
        })
        .end()

      // set less-loader
      lessRule.use('less-loader').loader(require.resolve('less-loader')).end()

      // set stylus-loader
      stylusRule.use('stylus-loader').loader(require.resolve('stylus-loader')).end()
      const { fileHash, extraCss } = config.sasoConfig
      const prodFileName = fileHash ? '[name].[hash].css' : '[name].css'
      if (extraCss) {
        c.plugin('extra css').use(MiniCssExtractPlugin, [
          {
            filename: isProd ? prodFileName : '[name].css'
          }
        ])

        c.plugin('fix style entry').use(FixStyleOnlyEntriesPlugin)
      }
    })
  }
}

export default plugin
