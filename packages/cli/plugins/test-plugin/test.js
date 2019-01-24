module.exports.apply = (compiler) => {
  compiler.hook('beforeCompile', (config) => {
    console.log(config)
    console.log('start config')
  })
}
