import VueLoaderPlugin from 'vue-loader/lib/plugin'
import { SasoPlugin } from '../../typings/compiler'
import WebpackChain from 'webpack-chain'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      c
        .module
        .rule('compile vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader(require.resolve('vue-loader'))
        .end()
      c
        .plugin('vue-loader-plugin')
        .use(VueLoaderPlugin)
        .end()
    })
  }
}

export default plugin
