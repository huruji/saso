---
id: plugin
title: Plugin
---


`saso` 的 `plugin` 分为 `cli` 的 `plugin` 和普通的 `plugin`。

`cli` 的 `plugin` 是为了拓展 `saso` 的命令，这在使用 `saso` 来拓展功能以符合团队需求时非常有用，如：你的团队想要通过 `saso releaseCDN` 这个命令来将你的静态资源一键发布到 CDN，这个需求便可以通过编写 `saso` 的 `cli` 命令来实现。

`saso` 的普通 `plugin` 通常是为了拓展 `saso` 的 `webpack` 配置，当然它还可以做很多其他的事情。

如果你熟悉 `webpack` 的 `plugin` 编写，`saso` 的 `plugin` 设计受到了 `webpack` 的启发，因此你能够快速编写你的 `plugin`。
