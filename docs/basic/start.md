---
id: start
title: 使用
---

## 使用

切换到你的项目中

```bash
└───src
      └───index.tsx
      └───index.html
```

`index.html` 文件中可以直接通过 script 链接到 `index.tsx`

```html
<script src="./index.tsx" async defer></script>
```

运行以下命令后，打开 `http://localhost:10000`，即可看到效果。

``` bash
saso dev
```
