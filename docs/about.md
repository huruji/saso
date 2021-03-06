---
id: about
title: 关于 saso
sidebar_label:
---

Check the [documentation](https://docusaurus.io) for how to use Docusaurus.

## 为什么使用 `saso`

当前的 web 开发人员几乎离不开 webpack，每次新项目的搭建都花费了大量的时间去配置 webpack 和配置相应的lint、test等环境，这些周边工作本应是一键完成的。

同时我们回忆一下，我们昨天维护的老旧的 web 应用，是否想要搭建环境花费了你太多时间呢？

以上的这些问题 saso 都可以一键帮你解决。

## `saso` 的理念

`saso` 推崇入口文件为 `.html` 文件，这样更加符合早期的学习理念，也就是说最早你是怎样写 web 应用的，使用 `saso` 你就可以返回 `.html` 文件链接 `.css` 和 `.js` 文件的时代。

在你的项目中，你不需要配置和安装 `webpack` 、 `stylus` 、 `babel` 等任何配置项，假设你的项目只有 `.html` 文件，你只要运行一下 `saso` 就可以帮你快速打包

```bash
└───index.html
└───index.css
└───main.js
```

<p align="center">
<img src="/img/example.gif" alt="saso">
</p>