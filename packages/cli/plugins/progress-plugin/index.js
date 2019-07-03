const PogressBarWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    c
      .plugin('progress-plugin')
      .use(PogressBarWebpackPlugin)
      .end()
  })
}
