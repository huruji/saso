import { CommanderStatic } from 'commander'
import Compiler from '../compiler/index'
import { CmdPlugin } from '../typings/custom'

const cli = (program: CommanderStatic): void => {
  program
    .usage('<commander> <usage>')
    .command('dev')
    .description('start dev')
    .option('-w, --watch')
    .option('-d, --dev, --development')
    .option('-p, --prod, --production')
    .option('--webpack, --webpackconfig')
    .option('--entry <entry>')
    .option('--no-clear')
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

export default {
  cli
} as CmdPlugin
