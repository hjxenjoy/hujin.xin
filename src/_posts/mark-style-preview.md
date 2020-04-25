---
title: Markdown中每种标记的样式预览
slug: mark-style-preview
date: 2020-04-25 17:40
tag: markdown,css
---

> 本篇主要列举下 `markdown` 解析后的各种标签样式，顺带调试

## 标题

Heading 1 一级标题
===
## Heading 2 二级标题
### Heading 3 三级标题
#### Heading 4 四级标题
##### Heading 5 五级标题

## 无序列表

### 单层列表

* 床前明月光
* 疑是地上霜
* 举头望明月
* 低头思故乡

### 多层列表

* 北京
  * 北京
    * 朝阳区
    * 海淀区
* 河北省
  * 石家庄市
    * 长安区
  * 秦皇岛市
    * 北戴河

## 有序列表

1. 甲
2. 乙
3. 丙
4. 丁

## 超链接

[网站首页](https://csroad.me)

[电子邮件](mailto:hjxenjoy@gmail.com)

## 图片

![🦌](https://picsum.photos/id/1003/100/100 "鹿")

## 引用

> 在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。
>
> 鲁迅

## 段落、加粗、斜体和水平线

鲁迅，原名*周树人*（1881年9月25日-1936年10月19日），浙江**绍兴**人，字豫才。原名周樟寿，1898年改为周树人，字豫山、豫亭。以笔名鲁迅闻名于世。鲁迅的作品包括*杂文、短篇小说、评论、散文、翻译*作品，对于***五四运动***以后的中国文学产生了深刻的影响。

---

## 表格

|  省份   | 年度  | 出生  |  死亡  |
|  ----  | ----  | ---- | ----  |
| 北京市  | 2018  | -    | -     |
| 河北省  | 2019  | -    | -     |

## 行内代码

常见的 HTML 标签有 `head` `body` `header` `section` `div` `a` `button` 等

## 代码块

```html
<!-- HTML 代码块 -->
<h1 id="heading">标题</h1>
<p class="para">段落文字...</p>
<div>
  <a href="/">超链接</a>
  <button>按钮</button>
</div>
```

```css
/* CSS 代码块 */
body {
  margin: 0;
  font-size: 14px;
  display: flex;
}
```

```js
// JavaScript代码块
const header = document.querySelector('#heading')

function hoverHead() {
  console.log('鼠标滑过标题')
}

header.addEventListener('mouseover', hoverHead)
```

```json
{
  "name": "markdown",
  "version": "1.0.0",
  "scripts": {
    "test": "npm test",
    "start": "npm start"
  }
}
```
