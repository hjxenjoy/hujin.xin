---
title: 阿里云OSS上传在Javascript中的使用
slug: aliyun-oss-in-js
date: 2020-05-19 21:30
tag: oss,upload
---

## 所需环境变量

* **OSS_ACCESS_KEY_ID**  oss 授权 key
* **OSS_ACCESS_KEY_SECRET**  oss 授权密钥
* **OSS_BUCKET**  所要操作的 oss 桶(公共/私有)
* **OSS_REGION**  oss 所在区域，比如华北2(北京)即为 oss-cn-beijing

## 服务端生成上传临时授权 policy

```ts
import crypto from 'crypto'

interface OSSPolicy {
  OSSAccessKeyId: string
  host: string
  policy: string
  signature: string
  expire: number
  dir: string
}

const ossDomain = 'aliyuncs.com'
const expires = 600 // 授权有效期10分钟

function sign(bucket: string, region: string, dir: string): OSSPolicy {
  const OSSAccessKeyId = process.env.OSS_ACCESS_KEY_ID
  const OSSAccessKeySecret = process.env.OSS_ACCESS_KEY_SECRET

  const host = `https://${bucket}.${region}.${ossDomain}`

  // 设置有效期
  const expire = new Date().getTime() + expires * 1000
  const expiration = new Date(expire).toISOString()

  const policyString = JSON.stringify({
    expiration,
    conditions: [
      ['content-length-range', 0, 1048576000],
      ['starts-with', '$key', dir],
    ],
  })
  const policy = Buffer.from(policyString).toString('base64')
  const signature = crypto
    .createHmac('sha1', OSSAccessKeySecret)
    .update(policy)
    .digest('base64')

  return {
    OSSAccessKeyId,
    host,
    policy,
    signature,
    expire,
    dir,
  }
}
```

## 服务端生成私有文件的临时授权地址

```ts
import OSS from 'ali-oss'

const isDev = process.env.NODE_ENV === 'development'
const internalRegionSuffix = '-internal'
const expires = 600 // 临时授权有效期10分钟

/**
 * @param objectKey 文件在 oss bucket 中的路径，如 image/20200520/love.png
 * @param process 图片资源处理规则 https://www.alibabacloud.com/help/zh/doc-detail/44687.htm
 * @param filename 设置文件下载时的默认名称
 */
function getAccessUrl(objectKey: string, process?: string, filename?: string) {
  const region = process.env.OSS_REGION
  const client = new OSS({
    // 开发环境使用外网 region 访问资源
    // 如果部署服务器在阿里云 ECS 上，生产环境可以调用内网 region 访问资源
    // 省去外网流量和调用接口时长损耗
    region: isDev ? region : region + internalRegionSuffix,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
  })

  const response = {
    // 'content-type': 'application/octet-stream',
    // 'content-type': 'application/force-download',
  }

  if (filename) {
    const name = filename ? encodeURIComponent(filename) : undefined
    response['content-disposition'] = `attachment; filename=${filename};filename*=UTF-8''${name}`
  }

  const url = client.signatureUrl(objectKey, {
    expires,
    process,
    response,
  })

  // 最后生成的临时 url 需要转成外网可访问地址
  return url.replace('-internal', '')
}
```

## 客户端上传

为了节省 ECS 的流量开支和 I/O 消耗，一般都是客户端直接向 OSS 上传文档

```ts
async function getUploadPolicy(dir: string): OSSPolicy {
  const resp = await fetch('/api/oss/policy', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ dir }),
  })
  const policy = await resp.json()
  return policy
}

async function upload(file: File) {
  const dir = 'test-dir/'
  const policy = await getUploadPolicy(dir)

  const formData = new FormData()
  formData.append('OSSAccessKeyId', policy.OSSAccessKeyId)
  formData.append('policy', policy.policy)
  formData.append('signature', policy.signature)
  formData.append('success_action_status', '200')
  // 注意：此处建议生成一个唯一路径名，防止冲突
  // 可以要求后端接口返回，也可以前端处理
  formData.append('key', policy.dir + file.name)
  formData.append('file', file)

  await fetch(policy.host, {
    method: 'post',
    mode: 'no-cors',
    body: formData,
  })
}
```

## 其他事项

* 客户端上传如果出现跨域错误，可以在阿里云 OSS 控制台对指定 bucket 添加跨域设置
* 涉及到 OSS 密钥的信息，不要上传到 public git 项目上
* `crypto` 包为 nodejs 自带，不需要安装第三方依赖
* 批量上传可以共用同一个policy，但是每次选择文件后的上传调起，还是需要获取新的 policy
* 浏览器自带的 [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 无法获取实时上传进度，可以考虑使用 [`axios`](https://github.com/axios/axios) 的 `onUploadProgress` 回调
* Java 和 Node 生成临时授权地址的设置有不同，Node 如果设置了 response 的 [`content-disposition`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition)，再设置 `content-type`，生成的地址访问会出错

## 参考文档

* [npm ali-oss](https://github.com/ali-sdk/ali-oss)
* [@types/ali-oss](https://www.npmjs.com/package/@types/ali-oss)
* [OSS SDK 文档简介](https://www.alibabacloud.com/help/zh/doc-detail/52834.htm)
