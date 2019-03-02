module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		config.module
			.rule('compile js')
			.exclude.add(/node_modules/)
			.end()
			.test(/\.jsx?$/)
			.use('babel')
			.loader(require.resolve('babel-loader'))
			.options({
				presets: [
					[
						require.resolve('@babel/preset-env'),
						{
							useBuiltIns: false,
							modules: false
						}
					]
				],
				plugins: [require.resolve('@babel/plugin-transform-react-jsx')],
				cacheDirectory: true
			})
			.end()
	})
}
