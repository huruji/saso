module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    const sasoConfig = config.sasoConfig
    const jsxConfig = sasoConfig.jsx
    const jsPlugins = [
      [require.resolve('@babel/plugin-transform-react-jsx'), jsxConfig],
      [require.resolve('@babel/plugin-syntax-dynamic-import')],
      [require.resolve('@babel/plugin-syntax-import-meta')],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
      [require.resolve('@babel/plugin-proposal-json-strings')]
    ]
    const prodPlugins = [require.resolve('babel-plugin-no-debugging'),
      //  require.resolve('babel-plugin-transform-react-remove-prop-types')
    ]

    c.module
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

    c.module
      .rule('compile ts')
      .exclude.add(/node_modules/)
      .end()
      .test(/\.tsx?$/)
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options({
        presets: [
          [
            require.resolve('@babel/preset-typescript'),
            {
              isTSX: true,
              allExtensions: true,
              jsxPragma: jsxConfig.pragma
            }
          ],
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
  })
}
