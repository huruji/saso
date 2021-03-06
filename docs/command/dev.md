---
id: dev
title: saso dev
---

### 使用

开启 `webpack dev server` 方便本地开发，开发阶段应该使用这个命令。

```bash
saso dev
```

### options

+ `-d  --dev  --development` : 使用 `development` 模式

+ `-p  --prod  --production` : 使用 `production` 模式

+ `--debug` : debug 模式，会辅助输出部分内容

+ `-a  --analyzer` : 使用 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 分析 `bundle`

+ `--config <configFile>` : 通过命令行指定 `saso` 的配置文件

+ `--entry <entryFile>` : 通过命令行指定打包的入口文件

+ `--port <port>` : 通过命令行指定端口，指定了 `port` 时，则必定开启监听模式

+ `--no-clear` : `saso` 默认会清除上一次的编译信息以保持命令行的干净，使用这个参数则不会清除
