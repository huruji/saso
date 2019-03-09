module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    const sasoConfig = config.sasoConfig
    const jsxConfig = sasoConfig.jsxConfig
    const plugins = [[require.resolve('@babel/plugin-transform-react-jsx'), jsxConfig]]
    const prodPlugins = [require.resolve('babel-plugin-no-debugging')]

    config.module
      .rule('compile js')
      .exclude.add(/node_modules/)
      .end()
      .test(/\.jsx?$/)
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options({
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              useBuiltIns: false,
              modules: false
            }
          ]
        ],
        plugins: sasoConfig.mode === 'development' ? plugins : plugins.concat(prodPlugins),
        cacheDirectory: true
      })
      .end()
  })
}
