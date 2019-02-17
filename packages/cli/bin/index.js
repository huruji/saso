#!/usr/bin/env node --max_old_space_size=4096

const program = require('commander');
const build = require('./build')
const cmdPlugin = require

program
  .usage('<commander> <usage>')
  .command('build')
  .description('start build ')
  .option('-w, --watch')
  .option('-d, --dev, --development')
  .option('-p, --prod, --production')
  .action(build)


if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
