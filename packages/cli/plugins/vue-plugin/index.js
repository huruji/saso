const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
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
