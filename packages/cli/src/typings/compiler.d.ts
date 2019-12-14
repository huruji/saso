import WebpackChain from 'webpack-chain'
interface SasoCompiler {
  config: SasoCompilerConfig
  plugins: { resolve: string }[]
  mode: 'development' | 'production'
  run(): Promise<void>
  initPlugins(): void
  hook(name: string, fn: Function): void
  applyPlugins(): void
  findEntry(config: SasoConfig): void
  setOutput(): void
  handleCliOpts(opt: SasoCliOpt): void
}

interface SasoPlugin {
  apply(compiler: SasoCompiler): void
}

type SasoCompilerConfig = SasoConfig & { webpackChain?: WebpackChain } & SasoCliOpt & { debug?: boolean }
