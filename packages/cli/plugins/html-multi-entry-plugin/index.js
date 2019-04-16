const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isUrl = require('nice-is-url')
const cheerio = require('cheerio')
const logger = require('saso-log')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const escapeStringRegexp = require('escape-string-regexp')
const RemoveTagsPlugin = require('remove-tags-webpack-plugin')

const ALI_CDN = '//polyfill.alicdn.com/polyfill.min.js'

module.exports.apply = (compiler) => {
  let entry
  let isHtmlEntry
  let files = []
  let srcFiles = []
  let outputDir
  let isWatch = false
  let prod = false
  let polyfillService = false
  const tags = []

  compiler.hook('afterConfigure', (config) => {
    isWatch = config.watch
    entry = config.entry
    prod = config.mode === 'production'
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
        return src
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
        return src
      })
      .get()
      .filter(e => e)

    srcFiles = [].concat(scripts, styles)

    files = srcFiles.map((src) => {
      const dir = path.dirname(entry)
      return path.resolve(dir, src)
    })
  })

  compiler.hook('beforeCompile', (config) => {
    const isProd = config.toConfig().mode === 'production'

    if (!isHtmlEntry) return
    config.entryPoints.delete(entry)
    for (let i = 0; i < files.length; i++) {
      const exists = fs.existsSync(files[i])
      if (exists) {
        const extname = path.extname(files[i])
        const file = path.basename(files[i], extname)
        if (isWatch) {
          config
            .entry(file)
            .add(files[i])
            .end()
        } else {
          config
            .entry(file)
            .add(files[i])
            .end()
        }
      }
    }
    config.output
      .path(outputDir)
      .filename(isProd ? '[name].[hash].js' : '[name].js')
      .end()
    config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [{
      template: entry,
      minify: !!prod
    }])
    config.plugin('remove-tags').use(RemoveTagsPlugin, [{
      file: new RegExp(escapeStringRegexp(path.basename(entry))),
      tags
    }])

    if (polyfillService) {
      let filePath = ''
      if (typeof polyfillService === 'boolean') {
        filePath = ALI_CDN
      }

      if (typeof polyfillService === 'string') {
        filePath = polyfillService
      }

      config.plugin('include-assets').use(HtmlWebpackIncludeAssetsPlugin, [{
        assets: [{
          path: filePath,
          type: 'js',
          attributes: {
            crossorigin: 'anonymous'
          }
        }],
        publicPath: false,
        resolvePaths: false,
        append: false
      }])
    }
  })
}
