module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    const sasoConfig = config.sasoConfig
    const jsxConfig = sasoConfig.jsx
    const jsPlugins = [
      [require.resolve('@babel/plugin-transform-react-jsx'), jsxConfig],
      [require.resolve('@babel/plugin-syntax-dynamic-import')]
    ]
    const tsPlugins = [].concat(jsPlugins, [[require.resolve('@babel/plugin-transform-typescript')]])
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
        plugins: sasoConfig.mode === 'development' ? jsPlugins : jsPlugins.concat(prodPlugins),
        cacheDirectory: true
      })
      .end()

    config.module
      .rule('compile ss')
      .exclude.add(/node_modules/)
      .end()
      .test(/\.tsx?$/)
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
        plugins: sasoConfig.mode === 'development' ? tsPlugins : tsPlugins.concat(prodPlugins),
        cacheDirectory: true
      })
      .end()
  })
}
