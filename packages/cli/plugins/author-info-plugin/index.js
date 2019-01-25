const path = require('path')
const AuthorWebpackPlugin = require('author-webpack-plugin')

module.exports.apply = (compiler) => {
  const pkg = require.resolve(path.resolve(process.cwd(), 'package.json'))
  if (!pkg) return
  const args = {}
  /* eslint-disable*/
  const pkgInfo = require(pkg)

  /* eslint-enable */
  if (pkgInfo.author) {
    args.author = pkgInfo.author
  }
  if (pkgInfo.email) {
    args.email = pkgInfo.email
  }
  if (pkgInfo.homepage) {
    args.homepage = pkgInfo.homepage
  }
  compiler.hook('beforeCompile', (config) => {
    config
      .plugin('author webpack plugin')
      .use(AuthorWebpackPlugin, [
        args
      ])
  })
}
