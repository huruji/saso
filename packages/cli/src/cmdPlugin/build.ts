import { CommanderStatic } from 'commander'
import Compiler from '../compiler/index'
import { CmdPlugin } from '../typings/custom'

const cli = (program: CommanderStatic): void => {
  program
    .usage('<commander> <usage>')
    .command('build')
    .description('start build ')
    .option('-a, --analyzer')
    .option('-d, --dev, --development')
    .option('--config <configFile>')
    .option('--debug')
    .option('--entry <entry>')
    .option('--no-clear')
    .option('-p, --prod, --production')
    .option('--port <port>')
    .option('-w, --watch')
    // .option('--webpack, --webpackconfig')
    .action(async (opt) => {
      if (opt.port) opt.watch = true
      if (opt.config) opt.configFile = opt.config
      const wpc = new Compiler(opt)
      await wpc.run()
    })
}

export default {
  cli
} as CmdPlugin
