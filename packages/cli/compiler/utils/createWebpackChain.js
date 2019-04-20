const WebpackChain = require('webpack-chain')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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

  Chain.devtool(config.prod ? 'source-map' : 'inline-source-map')

  Chain.resolve.extensions
    .add('.js')
    .add('.jsx')
    .add('.ts')
    .add('.tsx')
    .add('.json')
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

  Chain.plugin('clean dist')
    .use(CleanWebpackPlugin)

  return Chain
}
