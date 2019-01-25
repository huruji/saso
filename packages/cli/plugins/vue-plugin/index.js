const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    config.module
      .rule('compile vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader(require.resolve('babel-loader'))
      .options({
        presets: [
          require.resolve('@babel/preset-env')
        ]
      })
      .end()
      .plugin('vue-loader-plugin')
      .use(VueLoaderPlugin)
      .end()
  })
}
