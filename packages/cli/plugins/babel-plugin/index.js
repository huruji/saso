module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		config.module
			.rule('compile')
			.include.add('src')
			.add('test')
			.end()
			.use('babel')
			.loader('babel-loader')
			.options({
				presets: [
					[
						'@babel/preset-env',
						{
							modules: false
						}
					]
				]
			})
	})
}
