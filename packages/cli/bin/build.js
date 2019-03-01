const Compiler = require('../compiler/index')

module.exports = async (opt, cmd) => {
	const wpc = new Compiler(opt)
	await wpc.run(opt)
	// const cfg = config.initConfig()
	// notifier()

	// if (opt.watch) {
	//   cfg.port = await setPort(cfg)
	//   cfg.watch = true
	// } else {
	//   cfg.watch = false
	// }

	// const webpackConfig = getWebpackConfig(cfg)
	// const compiler = webpack(webpackConfig)
	// if (cfg.watch && !cfg.port) {
	//   compiler.watch({
	//     aggregateTimeout: 300,
	//     poll: true
	//   }, (err, stats) => {
	//     statsLog(err, stats)
	//   })
	// } else if (cfg.watch && cfg.port) {
	//   const devServerOptions = {
	//     contentBase: cfg.distDir,
	//     compress: false,
	//     hot: true,
	//     historyApiFallback: true,
	//     stats: 'none'
	//   }
	//   const server = new WebpackDevServer(compiler, devServerOptions)
	//   server.listen(cfg.port, '127.0.0.1', () => {
	//     console.log(`\nStarting server on http://localhost:${cfg.port}`);
	//   })
	// } else {
	//   compiler.run((err, stats) => {
	//     statsLog(err, stats)
	//   })
	// }
}
