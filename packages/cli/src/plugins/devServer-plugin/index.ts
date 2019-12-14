import { HotModuleReplacementPlugin } from 'webpack'
import WebpackChain from 'webpack-chain'
import { SasoPlugin, SasoCompilerConfig } from '../../typings/compiler'
import OpenBrowserPlugin from 'open-browser-plugin'
import AddServerClientPlugin from 'add-server-client-script-webpack-plugin'

const plugin: SasoPlugin = {
  apply(compiler) {
    let isDev = false
    let port = 7000
    compiler.hook('afterConfigure', (config: SasoCompilerConfig) => {
      port = config.port
      isDev = config.dev
    })
    compiler.hook('beforeCompile', (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      if (!isDev) return
      const dist = c.toConfig().output.path
      c.devServer
        .contentBase(dist)
        .hot(true)
        .compress(false)
        .historyApiFallback(true)
        .stats('errors-only')
        .watchContentBase(true)

      c.plugin('openbrowser').use(OpenBrowserPlugin, [ `http://localhost:${port}` ])
      c.plugin('add server client script').use(AddServerClientPlugin, [ `http://localhost:${port}` ])
      c.plugin('hot').use(HotModuleReplacementPlugin)
    })
  }
}

export default plugin
