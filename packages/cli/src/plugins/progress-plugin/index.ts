import PogressBarWebpackPlugin from 'progress-bar-webpack-plugin'
import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config) => {
      /**
    * @type {import('webpack-chain')}
    */
      const c = config
      c.plugin('progress-plugin').use(PogressBarWebpackPlugin).end()
    })
  }
}

export default plugin
