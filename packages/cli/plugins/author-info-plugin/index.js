const AuthorWebpackPlugin = require('author-webpack-plugin')
const pkgUp = require('pkg-up')

module.exports.apply = (compiler) => {
  compiler.hook('afterConfigureAsync', async (config) => {
    if (!config.authorInfo) return
    const args = {}
    let authorInfo = config.authorInfo

    if (typeof config.authorInfo === 'boolean') {
      const pkgFile = await pkgUp()
      if (pkgFile) {
        // eslint-disable-next-line
        authorInfo = require (pkgFile);
      }
    }

    console.log(authorInfo)

    if (authorInfo.author) {
      args.author = authorInfo.author
    }
    if (authorInfo.email) {
      args.email = authorInfo.email
    }
    if (authorInfo.homepage) {
      args.homepage = authorInfo.homepage
    }

    compiler.hook('beforeCompile', (cfg) => {
      cfg.plugin('author webpack plugin').use(AuthorWebpackPlugin, [args])
    })
  })
}
