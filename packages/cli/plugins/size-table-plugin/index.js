const SizeTableWebpackPlugin = require('size-table-webpack-plugin')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config
      .plugin('sizeTableWebpackPlugin')
      .use(SizeTableWebpackPlugin)
      .end()
  })
}
