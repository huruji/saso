import cheerio from 'cheerio'

class ReplacePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const options = this.options
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('myplugin', (data) => {
        const $ = cheerio.load(data.html, {
          decodeEntities: false
        })
        const jsFiles = data.assets.js
        const cssFiles = data.assets.css

        for (let i = 0; i < jsFiles.length; i++) {
          const js = jsFiles[i]
          options.forEach((replace) => {
            const originUrl = replace.originUrl
            const regexp = replace.test
            if (regexp.test(js)) {
              const target = $(`script[src="${originUrl}"]`).first()
              if (target) {
                const newDom = target.clone()
                newDom.attr('src', js)
                target.after(newDom)
                jsFiles[i] = ''
              }
            }
          })
        }

        for (let i = 0; i < cssFiles.length; i++) {
          const css = cssFiles[i]
          options.forEach((replace) => {
            const originUrl = replace.originUrl
            const regexp = replace.test
            if (regexp.test(css)) {
              const target = $(`link[href="${originUrl}"]`).first()
              if (target) {
                const newDom = target.clone()
                newDom.attr('href', css)
                target.after(newDom)
                cssFiles[i] = ''
              }
            }
          })
        }

        options.forEach((replace) => {
          const originUrl = replace.originUrl
          $(`script[src="${originUrl}"]`).remove()
          $(`link[href="${originUrl}"]`).remove()
        })

        data.assets.js = jsFiles.filter((e) => e)
        data.assets.css = cssFiles.filter((e) => e)
        data.html = $.html()
        return data
      })
    })
  }
}

export default ReplacePlugin
