const { HotModuleReplacementPlugin } = require('webpack')
const OpenBrowserPlugin = require('open-browser-plugin')
const AddServerClientPlugin = require('add-server-client-script-webpack-plugin')

module.exports.apply = (compiler) => {
  let isWatch = false
  let port = 7000
  compiler.hook('afterConfigure', (config) => {
    isWatch = config.watch
    port = config.port
  })
  compiler.hook('beforeCompile', (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    if (!isWatch) return
    const dist = c.toConfig().output.path
    c.devServer
      .contentBase(dist)
      .hot(true)
      .compress(false)
      .historyApiFallback(true)
      .stats('errors-only')
      .watchContentBase(true)

    c.plugin('openbrowser').use(OpenBrowserPlugin, [`http://localhost:${port}`])
    c.plugin('add server client script').use(AddServerClientPlugin, [`http://localhost:${port}`])
    c.plugin('hot').use(HotModuleReplacementPlugin)
  })
}
