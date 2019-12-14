import getPort from 'get-port'

interface Config {
  port?: number
}

const setPort = async (cfg: Config): Promise<number> => {
  const basePort = +(cfg.port || 10000)
  const ports = Array.from({
    length: 10
  }).map((e, i) => basePort + i)

  const availablePort = await getPort({
    port: ports,
    host: '127.0.0.1'
  })

  return availablePort
}

export default setPort
