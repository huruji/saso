import VueLoaderPlugin from 'vue-loader/lib/plugin'
import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      c
        .module
        .rule('compile vue')
        .test(/\.vue$/).use('vue-loader')
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
