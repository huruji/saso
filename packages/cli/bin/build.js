const Compiler = require('../compiler/index')

module.exports = async (opt) => {
  if (opt.port) opt.watch = true
  const wpc = new Compiler(opt)
  await wpc.run(opt)
}
