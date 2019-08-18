module.exports = {
  port: 10000,
  entry: '',
  pagePath: '',
  path: false,
  watch: false,
  mode: 'development',
  webpackconfig: false,
  analyzer: false,
  authorInfo: true,
  polyfillService: false,
  proxy: {},
  jsx: {
    pragma: 'React.createElement',
    useBuiltIns: false,
    pragmaFrag: 'React.Fragment'
  },
  clear: true,
  htmlMinify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
  babel: {
    pluginProd: {
      'no-debugging': true
    }
  },
  publicPath: '/',
  target: 'web'
}
