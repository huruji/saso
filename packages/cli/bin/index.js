#!/usr/bin/env node --max_old_space_size=4096 --inspect-brk

const program = require('commander')
const build = require('./build')
const cmdPlugin = require('../cmdPlugin')

program
	.usage('<commander> <usage>')
	.command('build')
	.description('start build ')
	.option('-w, --watch')
	.option('-d, --dev, --development')
	.option('-p, --prod, --production')
	.option('--webpack, --webpackconfig')
	.action(build)

if (cmdPlugin.length) {
	cmdPlugin.forEach(plugin => plugin.cli.apply(null, [program]))
}

if (!process.argv.slice(2).length) {
	program.outputHelp()
}

program.parse(process.argv)
