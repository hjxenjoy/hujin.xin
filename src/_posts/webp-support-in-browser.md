---
title: 判断浏览器是否支持webp格式的图片
slug: webp-support-in-browser
date: 2021-01-27 11:30
tag: webp
---

## 通过服务端 `request` 参数判断

以 `expressjs` 为例

```js
routes.get('/', function (req, res) {
  // or req.accepts('image/webp')
  const webpAccept = req.headers.accept.indexOf('image/webp') > -1
  res.locals.webpAccept = webpAccept
  res.render('index')
})
```

## 如果控制不了服务端，可以通过客户端异步判断

```js
function isWebpSupport() {
  return new Promise(resolve => {
    const webp = new window.Image()
    webp.addEventListener('load', () => {
      resolve(true)
    })
    webp.addEventListener('error', () => {
      resolve(false)
    })
    // 下面这段字符串可以通过canvas.toDataUrl('image/webp')的方式获取
    webp.src =
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='
  })
}

if (!('webpAccept' in window)) {
  isWebpSupport().then(function (webpAccept) {
    window.webpAccept = webpAccept
  })
}
```

**但是**

> 浏览器支持 webp 不代表 canvas 可以转成 webp 格式的 base64 字符串！ 

```js
const canvas = document.createElement('canvas')
canvas.width = 1
canvas.height = 1
const dataUrl = canvas.toDataURL('image/webp')
// 不支持 canvas 转 webp 的浏览器(safari/firefox)，会生成 png 格式的 base64 字符串
console.log(dataUrl.indexOf('data:image/webp;base64,') === 0)
```

## 参考文档

* [Detecting WebP support](https://stackoverflow.com/questions/5573096/detecting-webp-support)
