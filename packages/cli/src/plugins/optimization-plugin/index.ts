import TerserPlugin from 'terser-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import webpack from 'webpack'
import { SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: any) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      const sasoConfig = config.sasoConfig

      if (sasoConfig.optimization !== false) {
        c.optimization.splitChunks({
          chunks: 'initial',
          automaticNameDelimiter: '~',
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          minChunks: 1,
          minSize: 30000,
          name: true
        })
      }

      if (config.minify === 'terser') {
        c.optimization.minimizer('terser').use(TerserPlugin, [
          {
            test: /\.(t|j)s(\?.*)?$/i,
            include: /node_modules/,
            sourceMap: true,
            parallel: true
          }
        ])
      } else if (config.prod) {
        c.optimization.minimizer('js source-map').use(UglifyJsPlugin, [
          {
            sourceMap: true
          }
        ])

        c.plugin('source map').use(webpack.SourceMapDevToolPlugin, [
          {
            filename: '[file].map'
          }
        ])
      }
    })
  }
}

export default plugin
