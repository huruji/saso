import { CommanderStatic } from 'commander'
import { CmdPlugin } from '../typings/custom'

const cli = (program: CommanderStatic): void => {
  program.command('publish').description('start publish ').action(() => {
    console.log('publish')
  })
}

export default {
  cli
} as CmdPlugin
