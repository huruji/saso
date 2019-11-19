const webpack = require('webpack')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompileAsync', async (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    const { globalConfig } = c.sasoConfig
    const newConfig = {}
    for (const [key, value] of Object.entries(globalConfig)) {
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
    c.plugin('globalPlugin').use(webpack.DefinePlugin, [newConfig])
  })
}
