import { CommanderStatic } from 'commander'

const cli = (program: CommanderStatic) => {
  program.command('publish').description('start publish ').action(() => {
    console.log('publish')
  })
}

export default {
  cli
}
