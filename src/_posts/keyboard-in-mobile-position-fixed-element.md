---
title: 移动端网页position为fixed的元素中键盘事件的处理
slug: keyboard-in-mobile-position-fixed-element
date: 2020-05-26 21:12
tag: keyboard,scroll
---

> 在开发移动端网页时，难免会遇到弹框里进行键盘输入的需求，而一般弹框都是 `position: fixed` 的固定样式定位。
>
> 当固定定位盒子中的输入控件触发**虚拟键盘弹起和隐藏**后，往往会出现 *弹框* 中**按钮无法点击**的情况，或者弹框关闭后，正常的网页发生了**偏移（网页向上滚动）**。

------

**这是因为固定定位元素包裹的键盘输入控件，在 `focus` 触发虚拟键盘弹起的时候，会造成页面的向上滚动，我们需要在 输入控件 `blur` 时，还原之前的滚动条位置。**

## 步骤一：记录弹框出现前浏览器滚动条的位置

```ts
const savedTop = document.documentElement.scrollTop
```

## 步骤二：监听输入控件的 `blur` 事件，还原滚动条位置

```html
<modal style="position: fixed;">
  <input type="text" id="fixed-input" />
</modal>
```

```ts
const input = document.getElementById('fixed-input')

input.addEventListener('blur', scrollBack)

function scrollBack() {
  window.scrollTo(0, savedTop || 0)
}
```

💥这时你会发现一切都正常了！

## 注意事项

* 如果固定定位的弹框显示后，还会触发正常文档流的滚动事件的话，需要重新计算 `focus` 之前的 `scrollTop` 位置
* 在某些(微信)浏览器里，不支持 `scrollTo` 方法，这时需要另一种解决方案，下面给出一个兼容函数

```ts
export function scroll(element: HTMLElement | Window, top: number, left: number) {
  if (element.scrollTo) {
    element.scrollTo(left, top)
  } else if ('scrollLeft' in element) {
    element.scrollLeft = left
    element.scrollTop = top
  }
}
```