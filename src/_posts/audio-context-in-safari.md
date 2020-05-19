---
title: Safari浏览器下音频无法播放的问题
slug: audio-context-in-safari
date: 2020-05-19 00:36
tag: safari,AudioContext
---

> 最近在做一个包含音频播放的 web 项目时，发现 [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) 在 Apple Safari 浏览器下无法自动播放，断断续续折腾了很久，终于在不知甚解的情况下，找到了解决方案！

🌰 首先可以看一个示例：[AudioContext Play on codepen.io](https://codepen.io/hjxenjoy/pen/ZEbmJvm)

## 问题一：`AudioContext` 实例创建

由于 safari 下没有 `window.AudioContext` 属性，而是 `webkitAudioContext`，所以需要增加判断

```ts
function createAudioContext(): AudioContext {
  return new (window.AudioContext || window.webkitAudioContext) as AudioContext
}
```

## 问题二：解析音频，获取 `AudioBuffer` 的方法

`AudioContext.decodeAudioData` 在 chrome 下会返回 `Promise<AudioBuffer>` ，
但是在 safari 下需要在回调函数里拿到数据，chrome 同样支持回调获取该数据

```ts
function convertBlobToAudioBuffer(blob: File) {
  const audioContext = createAudioContext()

  return new Promise<AudioBuffer>(resolve => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', (evt: ProgressEvent<FileReader>) => {
      const arrayBuffer = evt.target!.result as ArrayBuffer
      audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
        resolve(audioBuffer)
      })
    })
    fileReader.readAsArrayBuffer(blob)
  })
}
```

## 问题三：音频播放的特殊处理

safari 下音频的播放有两种方式，其一是通过修改浏览器的偏好设置，放开当前网站的自动播放权限，当然这种方式肯定不推荐。

第二种方式，是需要在**点击播放事件**里触发 `AudioContext.resume` 方法，然后再去进行音频的播放

```ts
async function play(mp3: File) {
  const audioContext = createAudioContext()
  // await audioContext.suspend()
  await audioContext.resume()
  const audioBuffer = await convertBlobToAudioBuffer(mp3)
  sourceNode = audioContext.createBufferSource()
  sourceNode.buffer = audioBuffer
  sourceNode.connect(audioContext.destination)

  sourceNode.start()
}

playButton.addEventListener('click', play)
```

## 其他注意事项

* `AudioBufferSourceNode` 的 `start` 和 `stop` 方法都有可能抛异常，所以最好包裹上 `try/catch` 。
* `AudioBufferSourceNode` 没有暂停方法，只能通过监听 `onended` 事件，拿到 `AudioContext.currentTime` ，然后在 `sourceNode.start` 方法里传入 `offset` 的形式变相实现暂停功能。
* 有时候会遇到第一次点击播放不生效，重新再点一次暂停和播放后能播放的问题，可以考虑在 `AudioContext.resume` 之前先调用 `AudioContext.suspend` 方法。一般这种现象是因为第一次 `AudioContext.state` 状态没及时更新。
