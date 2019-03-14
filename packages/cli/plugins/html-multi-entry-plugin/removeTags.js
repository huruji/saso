const cheerio = require('cheerio')

module.exports = class RemoveTags {
  constructor(opts) {
    this.options = opts
  }

  apply(compiler) {
    const { file, tags } = this.options
    compiler.hooks.emit.tap('removeTags', (compilation) => {
      const assets = compilation.assets
      Object.keys(assets).forEach((e) => {
        if (!file.test(e)) return
        const source = assets[e].source()
        const $ = cheerio.load(source, {
          decodeEntities: false
        })
        tags.forEach((sel) => {
          $(sel).remove()
        })
        compilation.assets[e].source = () => $.html()
        compilation.assets[e].size = () => $.html().length
      })
      return Promise.resolve()
    })
  }
}
