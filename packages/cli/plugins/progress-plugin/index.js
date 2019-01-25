const PogressBarWebpackPlugin = require('progress-bar-webpack-plugin2')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config
      .plugin('progress-plugin')
      .use(PogressBarWebpackPlugin, [{
        clear: false
      }])
      .end()
  })
}
