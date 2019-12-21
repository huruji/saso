import { SasoPlugin } from '../../typings/compiler'
import WebpackChain from 'webpack-chain'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const imgRule = c.module.rule('compile img').test(/\.(png|jpg|gif|woff|svg|eot|ttf)$/)
      imgRule.use('url-loader').loader(require.resolve('url-loader')).options({
        limit: 8192
      })
      /* eslint-disable  */
      imgRule.use('img-loader').loader(require.resolve('img-loader')).options({
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
}

export default plugin
