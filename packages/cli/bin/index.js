#!/usr/bin/env node --max_old_space_size=4096

const program = require('commander')
const build = require('./build')
const cmdPlugin = require('../cmdPlugin')

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
  .action(build)

if (cmdPlugin.length) {
  cmdPlugin.forEach(plugin => plugin.cli.apply(null, [program]))
}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)
