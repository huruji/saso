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
    useBuiltIns: false
  },
  clear: true,
  htmlMinify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  }
}
