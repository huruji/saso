const getPort = require('get-port')

module.exports = async (cfg) => {
  const basePort = +cfg.port || 10000
  const ports = Array.from({
    length: 10
  }).map((e, i) => basePort + i)

  const availablePort = await getPort({
    port: ports,
    host: '127.0.0.1'
  })

  return availablePort
}
