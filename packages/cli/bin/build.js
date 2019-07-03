const Compiler = require('../compiler/index')

module.exports = async (opt) => {
  if (opt.port) opt.watch = true
  if (opt.config) opt.configFile = opt.config
  const wpc = new Compiler(opt)
  await wpc.run()
}
