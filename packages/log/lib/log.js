const clc = require('cli-color')

const error = clc.red.bold
const warn = clc.yellow
const notice = clc.blue
const success = clc.green

module.export = {
  success(msg) {
    console.log(success(msg))
  },
  error(msg) {
    console.log(error(msg))
  },
  notice(msg) {
    console.log(notice(msg))
  },
  warn(msg) {
    console.log(warn(msg))
  }
}
