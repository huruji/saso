# saso
一个**零配置**的 web 打包工具

## 快速开始

```bash
npm i saso -g
```

切换到你的项目中

```bash
saso build --watch
```

## 编写 `saso` 配置文件

saso 的配置文件和其他开源工具一样，支持在 `package.json` 中的属性定义，也支持 rc 文件、`.json` 、`.yaml`、`.yml`、`.js`文件，如可以在项目的文件夹中使用名为 `saso.config.js` 文件配置 `saso`

```js
module.exports = {
  watch: true,
  port: 9000
}
```

### `saso` 的配置项

+ **watch**

Type: `Boolean`

Default: `false`

+ **port**

Type: `Number`

Default: `1000`

+ **mode**

Type: `String`

Default: `development`

+ **analyzer**

Type: `Boolean` `Object`

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 的配置 `options`，默认不开启 `webpack-bundle-analyzer` 这个插件，当这个配置有值的时候，则开启


## Hooks

`saso` 内部的工作原理是依赖于**钩子(Hooks)**的，在如今前端大繁荣的情况下，`saso` 不可能能够满足所有的情况，当你需要自定义的 `saso` 时，那么这些 `Hooks` 将非常有用。

### afterConfigure

处理完 `saso` 配置后触发

**params:** `config`

### afterConfigureAsync

`afterConfigure` Async 版本

**params:** `config`

### beforeCompile

webpack 编译前触发

**params:** `webpackChain` 一个 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 实例

### beforeCompileAsync

`beforeCompile` Async 版本

**params:** `webpackChain`


## plugins

`saso` 的 `plugin` 分为 `cli` 的 `plugin` 和普通的 `plugin`。

`cli` 的 `plugin` 是为了拓展 `saso` 的命令，这在使用 `saso` 来拓展功能以符合团队需求时非常有用，如：你的团队想要通过 `saso releaseCDN` 这个命令来将你的静态资源一键发布到 CDN，这个需求便可以通过编写 `saso` 的 `cli` 命令来实现。

`saso` 的普通 `plugin` 通常是为了拓展 `saso` 的 `webpack` 配置，当然它还可以做很多其他的事情。

如果你熟悉 `webpack` 的 `plugin` 编写，`saso` 的 `plugin` 设计受到了 `webpack` 的启发，因此你能够快速编写你的 `plugin`。

接下来就是编写一个 `cli` `plugin` 和普通 `plugin` 的实例

