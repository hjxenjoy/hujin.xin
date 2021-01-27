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
    webp.src =
      'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='
  })
}

if (!'webpAccept' in window) {
  isWebpSupport().then(function (webpAccept) {
    window.webpAccept = webpAccept
  })
}
```

## 参考文档

* [Detecting WebP support](https://stackoverflow.com/questions/5573096/detecting-webp-support)
