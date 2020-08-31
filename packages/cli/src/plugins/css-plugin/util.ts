import * as path from 'path'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackChain from 'webpack-chain'
import { cosmiconfigSync } from 'cosmiconfig'

interface Options {
  config: WebpackChain;
  rule: WebpackChain.Rule;
  isCssModules: boolean;
  after?(rule: WebpackChain.Rule)
}

export function applyRule({
  config,
  rule,
  isCssModules,
  after
}: Options):void {
  const isProd = config.toConfig().mode === 'production'

  const postcssConfig = cosmiconfigSync('postcss', {
    stopDir: process.cwd()
  }).search()

  const postcssOptions = {
    config: {
      path: postcssConfig ? path.dirname(postcssConfig.filepath) : path.resolve(__dirname, '../../config')
    }
  }

  if (!isProd) {
    rule.use('vue-style-loader').loader(require.resolve('vue-style-loader'))
  } else {
    rule.use('sass-mini-css').loader(MiniCssExtractPlugin.loader)
  }

  if (isCssModules) {
    rule.use('typings-for-css-modules-loader').loader(require.resolve('typings-for-css-modules-loader')).options({
      modules: true,
      namedExport: true,
      camelCase: true,
      localIdentName: '[local]--[hash:base64:5]',
    })
  } else {
    // set css-loader
    rule.use('css-loader').loader(require.resolve('css-loader'))
  }

  // set postcss
  rule.use('css-postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions)
  after && after(rule)
}
