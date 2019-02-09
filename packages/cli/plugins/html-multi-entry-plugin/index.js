const path = require('path')
const fs = require('fs')
const JSDOM = require('jsdom').JSDOM
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports.apply = (compiler) => {
  let entry
  let isHtmlEntry
  let files = []
  let srcFiles = []
  let outputDir
  let outputFileName
  compiler.hook('afterConfigure', (config) => {
    console.log('7777')
    entry = config.entry
    console.log(entry)
    outputDir = config.outputPath
    outputFileName = config.outputFile
    if (['.html', '.shtml', '.xhtml'].includes(path.extname(entry))) isHtmlEntry = true
    if (!isHtmlEntry) return
    const content = fs.readFileSync(config.entry);
    const dom = new JSDOM(content)
    srcFiles = Array.from(dom.window.document.querySelectorAll('script')).map(e => e.src)
    files = srcFiles.map((src) => {
      const dir = path.dirname(entry)
      return path.resolve(dir, src)
    })
    console.log(files)
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
        template: entry
      }])
  })
}
