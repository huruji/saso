interface SasoConfig {
  entry?: string
  port?: number
  pagePath?: string
  path?: number | boolean
  watch?: boolean
  mode?: 'development' | 'production'
  webpackconfig?: boolean
  analyzer?: boolean
  authorInfo?: boolean
  polyfillService?: boolean | string
  proxy?: {}
  jsx?: {
    pragma?: 'React.createElement' | string
    useBuiltIns?: boolean
    pragmaFrag?: 'React.Fragment' | string
  }
  clear?: boolean
  htmlMinify?: {
    collapseWhitespace?: boolean
    removeComments?: boolean
    removeRedundantAttributes?: boolean
    removeScriptTypeAttributes?: boolean
    removeStyleLinkTypeAttributes?: boolean
    useShortDoctype?: boolean
  }
  babel?: {
    pluginProd: {
      'no-debugging': boolean
    }
  }
  publicPath?: string
  target?: string
  minify?: 'terser' | 'uglify'
  fileHash?: boolean
  extraCss?: boolean
  globalConfig?: any
  extraBabelIncludes?: string[]

  outputPath?: string
  outputFile?: string

  prod?: boolean

  libraryTarget?: string
}
