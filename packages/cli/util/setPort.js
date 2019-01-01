const getPort = require('get-port')

module.exports = async (cfg) => {
  const basePort = +cfg.port || 7000
  const ports = Array.from({
    length: 10
  }).map((e, i) => basePort + i)

  const availablePort = await getPort({
    port: ports
  })

  return availablePort
}
