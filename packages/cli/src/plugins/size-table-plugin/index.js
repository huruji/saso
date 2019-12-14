const SizeTableWebpackPlugin = require('size-table-webpack-plugin')
const chalk = require('chalk')

module.exports.apply = (compiler) => {
  compiler.hook('afterConfigure', (config) => {
    const {
      port, analyzer, clear, dev: isDev
    } = config
    let postmessage = isDev && port ? `Starting server on http://localhost:${port}` : 'build successful!'
    if (analyzer) {
      postmessage += `\nwebpack-bundle-analyzer is listening http://${analyzer.analyzerHost || '127.0.0.1'}:${
        analyzer.analyzerPort
      }`
    }
    postmessage = chalk.blue(postmessage)
    compiler.hook('beforeCompile', (cfg) => {
      cfg.plugin('sizeTableWebpackPlugin')
        .use(SizeTableWebpackPlugin, [
          {
            clear,
            postmessage
          }
        ])
        .end()
    })
  })
}
