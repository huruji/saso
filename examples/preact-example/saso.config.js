module.exports = {
  proxy: {
    '/imgapi/*': {
      target: 'http://wallpaper.apc.360.cn/index.php',
      changeOrigin: true,
      pathRewrite: {
        '^/imgapi': ''
      }
    }
  },
  jsx: {
    pragma: 'h'
  },
  htmlMinify: false
}
