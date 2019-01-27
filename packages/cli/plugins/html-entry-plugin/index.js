const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const fs = require('fs')
const JSDOM = require('jsdom').JSDOM
const escapeStringRegexp = require('escape-string-regexp')

module.exports.apply = (compiler) => {
  let isHtmlEntry = false
  let files = []
  let entry

  compiler.hook('afterConfigure', (config) => {
    console.log('7777')
    entry = config.entry
    console.log(entry)
    if (['.html', '.shtml', '.xhtml'].includes(path.extname(entry))) isHtmlEntry = true
    if (!isHtmlEntry) return
    const content = fs.readFileSync(config.entry);
    const dom = new JSDOM(content)
    files = Array.from(dom.window.document.querySelectorAll('script')).map(e => e.src)
    console.log(files)
    // files = files.map(e => path.resolve(path.dirname(entry, e)))
  })
  compiler.hook('beforeCompile', (config) => {
    console.log(999999)
    console.log(isHtmlEntry)
    if (!isHtmlEntry) return
    const extract = ExtractTextPlugin.extract({
      loader: require.resolve('html-loader'),
      options: {
        attrs: [
          'link:href',
          'script:src'
        ]
      }
    })
    const entryRule = config
      .module
      .rule('extract')
      .test(/\.html$/)

    extract.forEach(({
      loader,
      options
    }) => entryRule.use(loader).loader(loader).options(options))

    console.log(666)
    const include = config
      .module
      .rule('spawn-loader')
      .include
    files.forEach((e) => {
      console.log(e)
      const relative = path.relative(process.cwd(), path.dirname(e))
      console.log(relative)
      include.add(new RegExp(escapeStringRegexp(path.relative(process.cwd(), path.dirname(e)))))
    })
    include
      .end()
      .test(/index.js$/)
      .use('spawn-loader')
      .loader(require.resolve('spawn-loader'))
      .options({
        name: '[name].js'
      })
    config
      .plugin('extra')
      .use(ExtractTextPlugin, [path.basename(entry)])
  })
}
