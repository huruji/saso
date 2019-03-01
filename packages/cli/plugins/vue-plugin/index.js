const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		config.module
			.rule('compile vue')
			.test(/\.vue$/)
			.use('vue-loader')
			.loader(require.resolve('vue-loader'))
			.end()
		config
			.plugin('vue-loader-plugin')
			.use(VueLoaderPlugin)
			.end()
	})
}
