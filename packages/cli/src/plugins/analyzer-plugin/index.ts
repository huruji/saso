import { SasoPlugin, SasoCompilerConfig } from '../../typings/compiler'
import WebpackChain from 'webpack-chain'
import setPort from '../../compiler/utils/setPort'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

interface AnalyzerConfigInterface {
  analyzerPort?: number
  analyzerMode?: 'server' | 'static' | 'disabled'
  analyzerHost?: string
  port?: number
  logLevel?: 'info' | 'warn' | 'error' | 'silent'
}
const plugin: SasoPlugin = {
  apply(compiler) {
    let analyzerConfig: AnalyzerConfigInterface
    compiler.hook('afterConfigure', (config: SasoCompilerConfig) => {
      if (config.analyzer) analyzerConfig = config.analyzer as AnalyzerConfig
    })
    compiler.hook('beforeCompileAsync', async (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      if (!analyzerConfig) return
      let initPort = 8888
      if (analyzerConfig.port || analyzerConfig.analyzerPort) {
        initPort = analyzerConfig.analyzerPort || analyzerConfig.port
      }
      const port = await setPort({
        port: initPort
      })
      analyzerConfig.analyzerPort = port
      analyzerConfig.analyzerMode = analyzerConfig.analyzerMode || analyzerConfig.mode || 'server'
      analyzerConfig.analyzerHost = analyzerConfig.analyzerHost || analyzerConfig.host || '127.0.0.1'
      analyzerConfig.logLevel = analyzerConfig.logLevel || 'silent'

      c.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
        Object.assign(analyzerConfig, {
          analyzerPort: port,
          analyzerHost: 'localhost'
        })
      ])
    })
  }
}

export default plugin
