import { getPkgPath, shouldTransform } from './es5ImcompatibleVersions'

import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: any) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const sasoConfig = config.sasoConfig
      const jsxConfig = sasoConfig.jsx
      const jsPlugins = [
        [require.resolve('@babel/plugin-transform-react-jsx'), jsxConfig],
        [require.resolve('@babel/plugin-transform-regenerator')],
        [
          require.resolve('@babel/plugin-transform-runtime'),
          {
            absoluteRuntime: require.resolve('@babel/runtime/regenerator')
          }
        ],
        [require.resolve('@babel/plugin-syntax-dynamic-import')],
        [require.resolve('@babel/plugin-syntax-import-meta')],
        [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
        [require.resolve('@babel/plugin-proposal-json-strings')],
        [require.resolve('@babel/plugin-proposal-export-default-from')],
        // es 2020
        [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator')],
        [require.resolve('@babel/plugin-proposal-optional-chaining')],
        [
          require.resolve('@babel/plugin-proposal-private-methods'), { loose: false },
        ],
        [require.resolve('@babel/plugin-syntax-bigint')],
        [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }]
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
      jsModuleInclude.add((m: string) => {
        if (!m.includes('node_modules')) return false
        const pkgPath = getPkgPath(m)
        return shouldTransform(pkgPath)
      })
      extraBabelIncludes.forEach((include: string) => {
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
              require.resolve('@babel/preset-env'),
              {
                useBuiltIns: false,
                modules: false
              }
            ],
            [
              require.resolve('@babel/preset-typescript'),
              {
                isTSX: true,
                allExtensions: true,
                jsxPragma: jsxConfig.pragma.split('.')[0]
              }
            ],
          ],
          plugins: sasoConfig.mode === 'development' ? jsPlugins : jsPlugins.concat(prodPlugins),
          cacheDirectory: true
        })
        .end()
    })
  }
}

export default plugin
