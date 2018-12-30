const findUp = require('find-up');

const configNames = [
  '.sasorc',
  'saso.json',
  'saso.js'
]

module.exports = (cwd = process.cwd()) => findUp.sync(configNames, {
  cwd
})
