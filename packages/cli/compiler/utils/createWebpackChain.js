const WebpackChain = require('webpack-chain');

const Chain = new WebpackChain();
const clear = require('console-clear');

/* eslint-enable */
module.exports = (config) => {
  Chain.entry(config.entry)
    .add(config.entry)
    .end()
    .output.path(config.outputPath)
    .filename(config.outputFile)
    .publicPath('/')
    .end()
    .mode(config.mode);

  Chain.resolve.extensions
    .add('.js')
    .add('.jsx')
    .add('.tx')
    .add('.tsx')
    .add('.css')
    .add('.scss')
    .add('.less')
    .add('.styl')
    .add('.jpg')
    .add('.jpeg')
    .add('.png')
    .add('.svg')
    .add('.md')
    .add('.html');

  // Chain.plugin('clear console').use(ClearConsole);
  return Chain;
};
