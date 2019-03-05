const Compiler = require('../compiler/index')

module.exports = async (opt, cmd) => {
	const wpc = new Compiler(opt)
	await wpc.run(opt)
}
