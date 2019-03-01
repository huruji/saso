module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		config.module
			.rule('compile')
			.test(/\.jsx?$/)
			.use('babel')
			.loader(require.resolve('babel-loader'))
			.options({
				presets: [require.resolve('@babel/preset-env')],
				plugins: [require.resolve('@babel/plugin-transform-react-jsx')]
			})
			.end()
	})
}
