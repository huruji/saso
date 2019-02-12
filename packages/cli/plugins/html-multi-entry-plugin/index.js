const path = require('path')
const fs = require('fs')
// const JSDOM = require('jsdom').JSDOM
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isUrl = require('nice-is-url')
const cheerio = require('cheerio')
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports.apply = (compiler) => {
  let entry
  let isHtmlEntry
  let files = []
  let srcFiles = []
  let outputDir
  // let outputFileName
  let templateFile
  compiler.hook('afterConfigure', (config) => {
    entry = config.entry
    outputDir = config.outputPath
    // outputFileName = config.outputFile
    if (['.html', '.shtml', '.xhtml'].includes(path.extname(entry))) isHtmlEntry = true
    if (!isHtmlEntry) return
    const content = fs.readFileSync(config.entry);
    const $ = cheerio.load(content, {
      decodeEntities: false
    })

    srcFiles = $('script, link')
      .map(function () {
        const src = $(this).attr('src') || $(this).attr('href')
        const srcIsUrl = isUrl(src)
        if (!src) return false
        if (srcIsUrl) return false
        const dir = path.dirname(entry)
        const exists = fs.existsSync(path.resolve(dir, src))
        if (!exists) {
          console.log(`file ${src} is not exists`)
          return false
        }
        $(this).remove()
        return src
      })
      .get()
      .filter(e => e)
    templateFile = path.resolve(path.dirname(entry), 'template.html')
    fs.writeFileSync(templateFile, $.html(), {
      encoding: 'utf-8',
      flag: 'w+'
    })
    // const dom = new JSDOM(content)
    // srcFiles = Array.from(dom.window.document.querySelectorAll('script'))
    //   .map(e => e.src)
    //   .filter((e) => {
    //     const srcIsUrl = isUrl(e)
    //     if (srcIsUrl) return false
    //     const dir = path.dirname(entry)
    //     const exists = fs.existsSync(path.resolve(dir, e))
    //     if (!exists) {
    //       console.log(`file ${e} is not exists`)
    //       return false
    //     }
    //     return true
    //   })
    files = srcFiles.map((src) => {
      const dir = path.dirname(entry)
      return path.resolve(dir, src)
    })
  })
  compiler.hook('beforeCompile', (config) => {
    if (!isHtmlEntry) return
    config
      .entryPoints
      .delete(entry)
    for (let i = 0; i < files.length; i++) {
      const exists = fs.existsSync(files[i])
      if (exists) {
        const extname = path.extname(files[i])
        const file = path.basename(files[i], extname)
        config.entry(file)
          .add(files[i])
          .end()
      }
    }
    config.output
      .path(outputDir)
      .filename('[name].js')
      .end()
    config
      .plugin('html-webpack-plugin')
      .use(HtmlWebpackPlugin, [{
        template: templateFile
      }])
    if (templateFile) {
      config
        .plugin('filemanager-webpack-plugin')
        .use(FileManagerPlugin, [{
          onEnd: {
            delete: [templateFile]
          }
        }])
    }
  })
}
