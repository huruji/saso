import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const sasoConfig = config.sasoConfig
      const jsxConfig = sasoConfig.jsx
      const jsPlugins = [
        [ require.resolve('@babel/plugin-transform-react-jsx'), jsxConfig ],
        [ require.resolve('@babel/plugin-transform-regenerator') ],
        [
          require.resolve('@babel/plugin-transform-runtime'),
          {
            absoluteRuntime: require.resolve('@babel/runtime/regenerator')
          }
        ],
        [ require.resolve('@babel/plugin-syntax-dynamic-import') ],
        [ require.resolve('@babel/plugin-syntax-import-meta') ],
        [ require.resolve('@babel/plugin-proposal-class-properties'), { loose: false } ],
        [ require.resolve('@babel/plugin-proposal-json-strings') ],
        [ require.resolve('@babel/plugin-proposal-decorators'), { legacy: true } ]
      ]

      const prodPlugins = [
        // require.resolve('babel-plugin-no-debugging'),
        require.resolve('babel-plugin-transform-react-remove-prop-types')
      ]

      if (sasoConfig.babel.pluginProd['no-debugging']) {
        prodPlugins.push(require.resolve('babel-plugin-no-debugging'))
      }

      const jsModule = c.module.rule('compile js').exclude.add(/node_modules/).end()
      const { extraBabelIncludes } = sasoConfig
      const jsModuleInclude = jsModule.include
      extraBabelIncludes.forEach((include) => {
        jsModuleInclude.add(include)
      })
      jsModuleInclude.end()
      jsModule
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
        // .exclude.add(/node_modules/)
        // .end()
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
                jsxPragma: jsxConfig.pragma.split('.')[0]
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
}

export default plugin
