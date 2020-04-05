---
id: config
title: 配置项
---

saso 的配置文件和其他开源工具一样，支持在 `package.json` 中的属性定义，也支持 rc 文件、`.json` 、`.yaml`、`.yml`、`.js`文件，如可以在项目的文件夹中使用名为 `saso.config.js` 文件配置 `saso`

```js
module.exports = {
  watch: true,
  port: 9000
}
```

### `saso` 的配置项

+ **analyzer**

Type: `Boolean` `Object`

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 的配置 `options`，默认不开启 `webpack-bundle-analyzer` 这个插件，当这个配置有值的时候，则开启。

+ **authorInfo**

Type: `Boolean` `Object`

[author-webpack-plugin](https://github.com/huruji/author-webpack-plugin) 的配置`options`，如果为 `Boolean` 值 `true` 则从最近的 `package.json` 中获取作者信息，如果为 `Boolean` 值 `false` 则不使用 [author-webpack-plugin](https://github.com/huruji/author-webpack-plugin) 插件。

+ **babel**

Type: `Object`

目前只有以下选项，用来在 `production` 模式下禁用 [babel-plugin-no-debugging](https://github.com/huruji/babel-plugin-no-debugging) 插件

```js
babel: {
  pluginProd: {
    'no-debugging': false
  }
}
```

+ **cliPlugins**

Type: `Array`

+ **entry**

Type: `String`

项目的入口文件，可以是 `.js` 、`.html` 文件，当入口是 `.html` 文件的时候，`saso` 会解析这个 `.html` 文件依赖的文件，因此推荐使用这种方式，这也更加符合前端开发者的思维。

如果不指定 `entry` 时，`saso` 会依次寻找以下文件作为入口文件 `index.html`、 `src/index.html`、`index.js`、`main.js`、`src/index.js`、 `src/main.js`。

+ **extraBabelIncludes**

Type: `Array`

额外指定需要走 babel 的库，默认情况下 `node_modules` 下不走 babel

+ **fileHash**

Type： `Boolean`

Default: `true`

在 production 模式下最终的文件是否需要带 hash，除非特殊需要，否则建议始终为 true

+ **globalConfig**

Type: `Object`

Default: `{}`

使用 [webpack Default plugin](https://webpack.js.org/plugins/define-plugin/) 配置全局的变量，不过 saso 对这个配置做了优化，允许你传入非字符串，面对非字符串，saso 会自动使用 `JSON.stringify` 处理

+ **htmlMinify**

Type: `Boolean` | `Object`

> 只在 `production` 模式下生效

`production` 模式下对 `html` 文件的压缩处理，参考[minification](https://github.com/jantimon/html-webpack-plugin#minification)

+ **minify**

Type: `terser` | `uglify`

default: `terser`

使用 [Uglifyjs](https://github.com/mishoo/UglifyJS2) 或者 [Terser](https://github.com/terser-js/terser) 对 js 进行压缩，默认使用 terser 并开启多线程压缩。

+ **mode**

Type: `String`

Default: `development`

+ **outputPath**

最终输出的文件夹，允许不传入绝对路径

Type: `String`

Default: `dist`

+ **plugins**

Type: `Array`

+ **polyfillService**

Type: `Boolean` `String`

Default: `false`

[polyfill-service](https://github.com/Financial-Times/polyfill-service) 的链接，当为 `Boolean` 值 true 的时候，默认使用国内阿里的CDN `//polyfill.alicdn.com/polyfill.min.js` 。

+ **port**

Type: `Number`

Default: `10000`

+ **publicPath**

Type: `String`,

Default: `/`

webpack 的 [`publicPath` 配置](https://webpack.js.org/guides/public-path/)

+ **target**

Type: `async-node` `electron-main` `electron-renderer` `electron-preload` `node` `node-webkit` `web` `webworker`

Default: `web`

webpack 的 [target](https://webpack.js.org/configuration/target/) 选项，配置编译后的运行平台。