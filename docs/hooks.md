---
id: hooks
title: Hooks
---


`saso` 内部的工作原理是依赖于 **钩子(Hooks)** 的，在如今前端大繁荣的情况下，`saso` 不可能能够满足所有的情况，当你需要自定义 `saso` 时，那么这些 `Hooks` 将非常有用。

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
