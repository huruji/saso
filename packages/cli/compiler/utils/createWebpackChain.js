const WebpackChain = require('webpack-chain')

const Chain = new WebpackChain()

const path = require('path')

module.exports = (config) => {
  Chain
    .entry(config.entry)
    .add(config.entry)
    .end()
    .output
    .path(config.outputPath)
    .filename(config.outputFile)
    .end()
    .mode(config.mode)
  return Chain
}
