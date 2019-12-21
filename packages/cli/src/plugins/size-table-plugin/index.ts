import SizeTableWebpackPlugin from 'size-table-webpack-plugin'
import chalk from 'chalk'
import { SasoPlugin, SasoCompilerConfig } from '../../typings/compiler'
import WebpackChain from 'webpack-chain'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('afterConfigure', (config: SasoCompilerConfig) => {
      const { port, analyzer, clear, dev: isDev } = config
      let postmessage = isDev && port ? `Starting server on http://localhost:${port}` : 'build successful!'
      if (analyzer) {
        postmessage += `\nwebpack-bundle-analyzer is listening http://${analyzer.analyzerHost ||
          '127.0.0.1'}:${analyzer.analyzerPort}`
      }
      postmessage = chalk.blue(postmessage)
      compiler.hook('beforeCompile', (cfg: WebpackChain) => {
        cfg
          .plugin('sizeTableWebpackPlugin')
          .use(SizeTableWebpackPlugin, [
            {
              clear,
              postmessage
            }
          ])
          .end()
      })
    })
  }
}

export default plugin
