const ora = require('ora');
const chalk = require('chalk');

class BuildInfo {
  /* eslint-disable */
  apply(compiler) {
    compiler.hooks.afterEmit.tap('buildInfo', stats => {
      // const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      // const prompt = `[${clc.gray}] [${'webpack'.yellow}]`;
      const durations = stats.endTime - stats.startTime;
      const formatedDurations = durations >= 1000 ? `${durations / 1000} s` : `${durations} ms`;
      const message = `Completed in ${formatedDurations}`;
      // cb(`${prompt} ${message}`);
      ora(chalk.green(message))
        .start()
        .succeed();
    });
  }
}

module.exports.apply = compiler => {
  compiler.hook('beforeCompile', config => {
    config.plugin('BuildInfo').use(BuildInfo);
  });
};
