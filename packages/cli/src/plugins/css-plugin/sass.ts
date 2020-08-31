import WebpackChain from 'webpack-chain'
import { applyRule } from './util'

function after(rule: WebpackChain.Rule): void {
  rule.use('resolve-url-loader').loader(require.resolve('resolve-url-loader')).options({
    sourceMap: true,
    keepQuery: true,
    debug: false
  })

  rule
    .use('sass-loader')
    .loader(require.resolve('sass-loader'))
    .options({
      sourceMap: true,
      sourceMapContents: false,
      implementation: require('sass')
    })
    .end()
}

export default (config: WebpackChain): void => {
  const { cssmodule } = config.sasoConfig
  const isProd = config.toConfig().mode === 'production'

  const rule = config.module.rule('compile scss').test(/\.s[a|c]ss$/)
  rule.exclude.add(/\.module/)

  const ruleWithModules = config.module.rule('compile scss with module').test(/\.module\.s[a|c]ss$/)

  applyRule({
    rule: ruleWithModules,
    config,
    isCssModules: true,
    after,
  })

  applyRule({
    rule,
    config,
    isCssModules: false,
    after
  })
}
