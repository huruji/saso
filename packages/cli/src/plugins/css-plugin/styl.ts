import WebpackChain from 'webpack-chain'
import { applyRule } from './util'

function after(rule: WebpackChain.Rule): void {
  rule.use('stylus-loader').loader(require.resolve('stylus-loader')).end()
}

export default (config: WebpackChain): void => {
  const { cssmodule } = config.sasoConfig
  const isProd = config.toConfig().mode === 'production'

  const rule = config.module.rule('compile scss').test(/\.styl(us)?$/)
  rule.exclude.add(/\.module/)

  const ruleWithModules = config.module.rule('compile scss with module').test(/\.module\.styl(us)?$/)

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
