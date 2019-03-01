const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const cosmiconfig = require('cosmiconfig')
const path = require('path')

module.exports.apply = compiler => {
	compiler.hook('beforeCompile', config => {
		const isProd = config.toConfig().mode === 'production'
		const postcssConfig = cosmiconfig('postcss').searchSync()
		const sassRule = config.module.rule('compile sass').test(/\.s[a|c]ss$/)

		const cssRule = config.module.rule('compile css').test(/\.css$/)

		const lessRule = config.module.rule('compile less').test(/\.less/)

		sassRule.use('style-loader').loader(require.resolve('style-loader'))
		sassRule.use('css-loader').loader(require.resolve('css-loader'))
		sassRule
			.use('postcss-loader')
			.loader(require.resolve('postcss-loader'))
			.options({
				config: {
					path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
				}
			})
		sassRule
			.use('sass-loader')
			.loader(require.resolve('sass-loader'))
			.end()

		// cssRule.use('mini-css').loader(MiniCssExtractPlugin.loader);
		cssRule.use('style-loader').loader(require.resolve('style-loader'))
		cssRule.use('css-loader').loader(require.resolve('css-loader'))
		cssRule
			.use('postcss-loader')
			.loader(require.resolve('postcss-loader'))
			.options({
				config: {
					path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
				}
			})

		lessRule.use('style-loader').loader(require.resolve('style-loader'))
		lessRule.use('css-loader').loader(require.resolve('css-loader'))
		lessRule
			.use('postcss-loader')
			.loader(require.resolve('postcss-loader'))
			.options({
				config: {
					path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
				}
			})
		lessRule.use('less-loader').loader(require.resolve('less-loader'))

		config.plugin('extra css').use(MiniCssExtractPlugin, [
			{
				filename: isProd ? '[name].[hash].css' : '[name].css'
			}
		])

		config.plugin('fix style entry').use(FixStyleOnlyEntriesPlugin)
	})
}
