---
title: WebStorm 上类似 Sublime Text 的多光标和下个引用快捷键
slug: multiple-selection-shortcut-in-webstorm
date: 2021-07-09 14:00
tag: webstorm,keymap
---

> 自从将 WebStorm 当作主力生产工具之后，一开始采用 vscode 的快捷键配置，后来直接还原成 WebStorm 默认快捷键配置，并搭配 Vim，开始有目的性地学习并掌握它。
> 
> 但是一直有些常用快捷键记不住，这回特地查了下，但是确实不太好记（因为包含了ctrl/alt），所以在这里记录下。
> 
> 注意：我这里记录的全是 Mac OS 下的快捷键

## 批量在选中的多行行尾添加光标

快捷键：`alt/option` + `shift` + `g`

同 Sublime Text ：`command/super` + `shift` + `l`

## 选中下一个引用

快捷键：`ctrl` + `g`

同 Sublime Text ：`command/super` + `d`

**注意**：

- 如果不选中单词，只是将光标停留在单词上，那么它不会选择包含该单词的其他引用。反之，会选中。
- 如果开启了 IdeaVim 模式，会出现快捷键冲突，可以在 Preferences / Editor / Vim 中的 Shortcut Conflicts for Active Keymap 中找到对应 `ctrl + g` 配置，将其 handler 从 Vim 改成 IDE 即可。


## 选中当前文件中所有引用

快捷键：`ctrl` + `command/super` + `g`

和 Sublime Text 相同

有了这三个快捷键的配合，效率将大大提高，现在就需要重复练习就可以了！！
