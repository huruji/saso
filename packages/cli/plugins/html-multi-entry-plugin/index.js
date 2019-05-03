const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isUrl = require('is-url')
const cheerio = require('cheerio')
const logger = require('saso-log')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const ReplaceUrlHtmlWebpackPlugin = require('replace-url-html-webpack-plugin')

const ALI_CDN = '//polyfill.alicdn.com/polyfill.min.js'

module.exports.apply = (compiler) => {
  let entry
  let isHtmlEntry
  let files = []
  let srcFiles = []
  let outputDir
  let polyfillService = false
  const tags = []

  compiler.hook('afterConfigure', (config) => {
    entry = config.entry
    polyfillService = config.polyfillService
    outputDir = config.outputPath

    if (['.html', '.shtml', '.xhtml'].includes(path.extname(entry))) isHtmlEntry = true
    if (!isHtmlEntry) return
    const content = fs.readFileSync(config.entry)
    const $ = cheerio.load(content, {
      decodeEntities: false
    })

    const scripts = $('script')
      .map(function () {
        const src = $(this).attr('src')
        const srcIsUrl = isUrl(src)
        if (!src) return false
        if (srcIsUrl) return false
        tags.push(`script[src="${src}"]`)
        const dir = path.dirname(entry)
        const exists = fs.existsSync(path.resolve(dir, src))
        if (!exists) {
          logger.error(`file ${src} is not exists`)
          return false
        }
        const async = $(this).attr('async')
        const crossorigin = $(this).attr('async')
        const defer = $(this).attr('defer')
        return {
          src,
          attrs: {
            async,
            crossorigin,
            defer
          }
        }
      })
      .get()
      .filter(e => e)

    const styles = $('link')
      .map(function () {
        const src = $(this).attr('href')
        const srcIsUrl = isUrl(src)
        if (!src) return false
        if (srcIsUrl) return false
        tags.push(`link[href="${src}"]`)
        const dir = path.dirname(entry)
        const exists = fs.existsSync(path.resolve(dir, src))
        if (!exists) {
          logger.error(`file ${src} is not exists`)
          return false
        }
        // $(this).remove()
        return {
          src
        }
      })
      .get()
      .filter(e => e)

    srcFiles = [].concat(scripts, styles)

    files = srcFiles.map((file) => {
      const dir = path.dirname(entry)
      file.originSrc = file.src
      file.src = path.resolve(dir, file.src)
      return file
    })
  })

  compiler.hook('beforeCompile', (config) => {
    const isProd = config.toConfig().mode === 'production'
    const { htmlMinify } = { ...config.sasoConfig }

    if (!isHtmlEntry) return
    config.entryPoints.delete(entry)
    const attributesConfig = []
    for (let i = 0; i < files.length; i++) {
      const exists = fs.existsSync(files[i].src)
      if (exists) {
        const extname = path.extname(files[i].src)
        const file = path.basename(files[i].src, extname)
        config
          .entry(file)
          .add(files[i].src)
          .end()
        // eslint-disable-next-line
				Object.entries(files[i].attrs).forEach(attr => {
          attributesConfig.push({
            test: files[i].originSrc.split('/').pop(),
            attribute: attr[0],
            value: attr[1]
          })
        })
      }
    }

    config.output
      .path(outputDir)
      .filename(isProd ? '[name].[hash].js' : '[name].js')
      .end()

    config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
      {
        template: entry,
        minify: isProd ? htmlMinify : false
      }
    ])

    config.plugin('replace url').use(ReplaceUrlHtmlWebpackPlugin, [])

    if (polyfillService) {
      let filePath = ''
      if (typeof polyfillService === 'boolean') {
        filePath = ALI_CDN
      }

      if (typeof polyfillService === 'string') {
        filePath = polyfillService
      }

      config.plugin('include-assets').use(HtmlWebpackIncludeAssetsPlugin, [
        {
          assets: [
            {
              path: filePath,
              type: 'js',
              attributes: {
                crossorigin: 'anonymous'
              }
            }
          ],
          publicPath: false,
          resolvePaths: false,
          append: false
        }
      ])
    }
  })
}
