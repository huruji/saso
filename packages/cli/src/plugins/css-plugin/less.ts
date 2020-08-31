import WebpackChain from 'webpack-chain'
import { applyRule } from './util'

function after(rule: WebpackChain.Rule): void {
  rule.use('less-loader').loader(require.resolve('less-loader')).end()
}

export default (config: WebpackChain): void => {
  const { cssmodule } = config.sasoConfig
  const isProd = config.toConfig().mode === 'production'

  const rule = config.module.rule('compile scss').test(/\.less$/)
  rule.exclude.add(/\.module/)

  const ruleWithModules = config.module.rule('compile scss with module').test(/\.module\.less$/)

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
