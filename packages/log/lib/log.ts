import clc from 'cli-color'

const error = clc.red.bold
const warn = clc.yellow
const notice = clc.blue
const success = clc.green

export default {
  success(msg: string) {
    console.log(success(msg))
  },
  error(msg: string) {
    console.log(error(msg))
  },
  notice(msg: string) {
    console.log(notice(msg))
  },

  warn(msg: string) {
    console.log(warn(msg))
  },
  statsLog(err, stats, cb = console.log) {
    if (err) {
      throw new Error(err.message.red.bgBlack)
    }

    const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
    const prompt = `[${time.gray}] [${'webpack'.yellow}]`

    const durations = stats.endTime - stats.startTime
    const formatedDurations = durations >= 1000 ? `${durations / 1000} s` : `${durations} ms`
    const message = `Completed in ${formatedDurations.magenta}`

    cb(`${prompt} ${message}`)
  },
  debug(msg: string) {
    if (global.debug) {
      console.log(notice(msg))
    }
  }
}
