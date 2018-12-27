const program = require('commander')
const build = require('./build')

program
  .usage('<commander> <usage>')
  .command('build')
  .description('start build ')
  .option('-w, --watch')
  .action(build)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
