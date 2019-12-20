import ora from 'ora'
import chalk from 'chalk'
import WebpackChain from 'webpack-chain'
import { SasoPlugin } from '../../typings/compiler'
import { Compiler } from 'webpack'

class BuildInfo {
  /* eslint-disable */
  apply(compiler: Compiler) {
    compiler.hooks.done.tap('buildInfo', (stats) => {
      const durations = stats.endTime - stats.startTime
      const formatedDurations = durations >= 1000 ? `${durations / 1000} s` : `${durations} ms`
      const message = `Completed in ${formatedDurations}`
      ora(chalk.green(message)).start().succeed()
    })
  }
}

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const c = config
      c.plugin('BuildInfo').use(BuildInfo)
    })
  }
}

export default plugin
