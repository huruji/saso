import * as path from 'path'

import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SasoPlugin } from '../../typings/compiler'
import WebpackChain from 'webpack-chain'
import { cosmiconfigSync } from 'cosmiconfig'
import sassRule from './sass'

const plugin: SasoPlugin = {
  apply(compiler) {
    compiler.hook('beforeCompile', (config: WebpackChain) => {
      /**
      * @type {import('webpack-chain')}
      */
      const isProd = config.toConfig().mode === 'production'
      sassRule(config)
      const { fileHash, extraCss } = config.sasoConfig
      const prodFileName = fileHash ? '[name].[hash].css' : '[name].css'
      if (extraCss) {
        config.plugin('extra css').use(MiniCssExtractPlugin, [
          {
            filename: isProd ? prodFileName : '[name].css'
          }
        ])

        config.plugin('fix style entry').use(FixStyleOnlyEntriesPlugin)
      }
    })
  }
}

export default plugin
