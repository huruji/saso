const WebpackChain = require('webpack-chain')

const Chain = new WebpackChain()

/* eslint-enable */
module.exports = (config) => {
  Chain.entry(config.entry)
    .add(config.entry)
    .end()
    .output.path(config.outputPath)
    .filename(config.outputFile)
    .publicPath('/')
    .end()
    .mode(config.mode)

  Chain.devtool('source-map')

  Chain.resolve.extensions
    .add('.js')
    .add('.jsx')
    .add('.tx')
    .add('.tsx')
    .add('.vue')
    .add('.css')
    .add('.scss')
    .add('.less')
    .add('.styl')
    .add('.jpg')
    .add('.jpeg')
    .add('.png')
    .add('.svg')
    .add('.md')
    .add('.html')

  return Chain
}
