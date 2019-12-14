import WebpackChain from 'webpack-chain'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const Chain = new WebpackChain()

const createWepbackChain = (config: SasoConfig): WebpackChain => {
  Chain.entry(config.entry)
    .add(config.entry)
    .end()
    .output.path(config.outputPath)
    .filename(config.outputFile)
    .publicPath(config.publicPath)
    .end()
    .mode(config.mode)

  if (config.minify === 'terser') {
    Chain.devtool(config.prod ? 'source-map' : 'inline-source-map')
  } else {
    Chain.devtool(config.prod ? false : 'inline-source-map')
  }

  if (config.libraryTarget) {
    Chain.output.libraryTarget(config.libraryTarget)
  }

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

  Chain.plugin('clean dist').use(CleanWebpackPlugin)

  Chain.target(config.target)

  return Chain
}

export default createWepbackChain
