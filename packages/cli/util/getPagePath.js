const path = require('path')
const fs = require('fs')

module.exports = src => {
	const cwd = process.cwd()
	const indexHtmlPath = path.resolve(src, 'index.html')
	const indexHtml = fs.existsSync(indexHtmlPath)
	if (indexHtml) {
		return indexHtmlPath
	}

	const baseHtmlPath = path.resolve(src, `${path.basename(cwd).replace(/\/$/, '')}.html`)
	const baseHtml = fs.existsSync(baseHtmlPath)
	if (baseHtml) {
		return baseHtmlPath
	}

	const indexJsPath = path.resolve(src, 'index.js')
	const indexJS = fs.existsSync(indexJsPath)
	if (indexJS) return indexJsPath

	const baseJsPath = path.resolve(src, `${path.basename(cwd).replace(/\/$/, '')}.js`)
	const baseJs = fs.existsSync(baseJsPath)
	if (baseJs) return baseJsPath

	return null
}
