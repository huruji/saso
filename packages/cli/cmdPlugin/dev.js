const Compiler = require('../compiler/index')

module.exports.cli = (program) => {
  program
    .usage('<commander> <usage>')
    .command('dev')
    .description('start dev')
    .option('-w, --watch')
    .option('-d, --dev, --development')
    .option('-p, --prod, --production')
    .option('--webpack, --webpackconfig')
    .option('--entry <entry>')
    .option('--port <port>')
    .option('--config <configFile>')
    .option('-a, --analyzer')
    .action(async (opt) => {
      opt.watch = true
      opt.dev = true
      const wpc = new Compiler(opt)
      await wpc.run(opt)
    })
}
