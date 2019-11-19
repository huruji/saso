#!/usr/bin/env node --max_old_space_size=4096

import program from 'commander'

import('v8-compile-cache')

const cmdPlugin = require('../cmdPlugin')

if (cmdPlugin.length) {
  cmdPlugin.forEach(plugin => plugin.cli.apply(null, [program]))
}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse(process.argv)

process.on('unhandledRejection', (error) => {
  console.error(error)
  process.exit(1)
})
