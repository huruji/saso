import webpack from 'webpack'
import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompileAsync', async (config: any) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const { globalConfig } = c.sasoConfig
      const newConfig: Record<string, any> = {}
      for (const [ key, value ] of Object.entries(globalConfig)) {
        let val = value
        if (typeof value !== 'string') {
          try {
            val = JSON.stringify(value)
          } catch (err) {
            val = value
          }
        }
        newConfig[key] = val
        if (!key.startsWith('window.')) {
          newConfig[`window.${key}`] = val
        }
      }
      c.plugin('globalPlugin').use(webpack.DefinePlugin, [ newConfig ])
    })
  }
}

export default plugin
