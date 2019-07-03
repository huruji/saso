const ora = require('ora')
const chalk = require('chalk')

class BuildInfo {
  /* eslint-disable */
  apply(compiler) {
    compiler.hooks.done.tap('buildInfo', stats => {
      const durations = stats.endTime - stats.startTime
      const formatedDurations = durations >= 1000 ? `${durations / 1000} s` : `${durations} ms`
      const message = `Completed in ${formatedDurations}`
      ora(chalk.green(message))
        .start()
        .succeed()
    })
  }
}

module.exports.apply = compiler => {
  compiler.hook('beforeCompile', config => {
    /**
    * @type {import('webpack-chain')}
    */
    const c = config
    c.plugin('BuildInfo').use(BuildInfo)
  })
}
