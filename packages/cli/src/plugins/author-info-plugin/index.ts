import AuthorWebpackPlugin from 'author-webpack-plugin'
import pkgUp from 'pkg-up'
import WebpackChain from 'webpack-chain'
import { SasoCompiler, SasoCompilerConfig, SasoPlugin } from '../../typings/compiler'

const plugin: SasoPlugin = {
  apply(compiler: SasoCompiler) {
    compiler.hook('afterConfigureAsync', async (config: SasoCompilerConfig) => {
      if (!config.authorInfo) return
      const args: AuthorInfoConfig = {}
      let authorInfo = config.authorInfo as AuthorInfoConfig

      if (typeof config.authorInfo === 'boolean') {
        const pkgFile = await pkgUp()
        if (pkgFile) {
          // eslint-disable-next-line
          authorInfo = require(pkgFile) as AuthorInfoConfig
        }
      }

      if (authorInfo.author) {
        args.author = authorInfo.author
      }
      if (authorInfo.email) {
        args.email = authorInfo.email
      }
      if (authorInfo.homepage) {
        args.homepage = authorInfo.homepage
      }

      compiler.hook('beforeCompile', (cfg: WebpackChain) => {
        /**
        * @type {import('webpack-chain')}
        */
        const c = cfg
        c.plugin('author webpack plugin').use(AuthorWebpackPlugin, [ args ])
      })
    })
  }
}

export default plugin
