const PogressBarWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		config
			.plugin('progress-plugin')
			.use(PogressBarWebpackPlugin)
			.end()
	})
}
