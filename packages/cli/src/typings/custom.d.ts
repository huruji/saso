import { CommanderStatic } from 'commander'

interface CmdPlugin {
  cli(program: CommanderStatic): void
}
