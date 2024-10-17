# admin-door

## 启动

```shell
yarn serve
```

## 网站说明

[网站地址](https://www.astercasc.com)，本项目为个人网站的构建，涵盖技术文章、视频分享、个人日志、游戏等等功能，
由`vue3`构建，UI组件大部分使用的是`quasar`， 没有使用`element-ui`的原因是这个组件样式已经看吐了，换个新鲜点的

后端使用主体为`spring cloud`架构，实际代码由于数据安全原因不能开源，后端相关技术栈在网站内文章都有分享，
有需求的小伙伴可以参考下

## 计划功能

* 用户系统支持账号设置、我的评论
* 视频系统支持弹幕发送
* 工具系统支持表情包包浆
* 支持音乐系统
* 支持无感验证码

## 功能支持

* 用户系统：目前支持注册、登录、密码重置、资料完善、个人页展示、好友系统、私聊、群聊、通知等等功能
* 文章系统：支持后台文章上传、文章标签，前台文章检索、详情等功能
* 评论系统：支持登录/非登录用户评论，登录用户点赞，评论回复，评论层级迭代，支持网站留言板功能模块
* 视频系统：支持后台视频上传、整理分集、弹幕文件加载等，前台视频检索，观看，视频倍速、自动下集、弹幕等全局设置
* 游戏系统：简单游戏展示、推荐
* 工具系统：支持steam游戏史低/详情查询，支持在线时间戳转换，支持在线生成二维码，
  支持DDL转kotlin类，支持常见加密，支持图片和base64相互转换，支持markdown转pdf/html，支持rgbHex互转，支持生成大陆身份证

## 项目文件结构

* patches: patch-package 覆写源码包补丁文件
* public: index.html
* src：
    * api：后端接口调用
    * assets: 静态资源文件
    * components: 复用组件
    * constants：项目常量文件
    * options: 配置文件
    * pages：路由直接定位页面
    * router： 路由
    * styles: 复用样式文件
    * utils：工具类
    * views: 路由间接定位页面

## 包引用

* juice: 类样式直接嵌入页面元素（for pdfmkae.js）
* raw-loader: 文件内容读取（for juice.js）
* pdfmake/html-to-pdfmake: pdf生成/转换
* sockjs-client：websocket
* webstomp-client：websocket
* qrcode-vue3：二维码生成
* jsqr：二维码解析
* sql-ddl-to-json-schema：DDL转基本json，用于自动生成类
* fontsource/roboto-slab：字体
* quasar/extras：quasar附加功能
* animate.css：动画
* axios：接口调用
* core-js：base
* crypto-js：解密
* dplayer：播放器封装
* highlight.js：markdown解析代码高亮
* marked-highlight: markdown解析代码高亮
* marked：markdown解析
* mitt：事件总线
* patch-package：源码补丁
* pinia：本地存储
* qs：接口调用序列化
* quasar：ui美化
* video.js：视频样式封装（暂未用到）
* vue：vue
* vue-router：vue

## 注意事项

1. dPlayer的patch
    1. 删除视频右击菜单栏默认选项
    2. 删除默认日志打印提示
    3. 删除视频控制台下`<label for="">`浏览器报错相关代码，其实整个控制台除了进度条可以删除，
       但是一些div和js逻辑有联动会导致项目报错，所以只删除label相关代码
    4. 修改apiUrl的生成逻辑，代码位置：`[]).slice(0);`
       文件位置：[danmaku.js](https://github.com/DIYgod/DPlayer/blob/master/src/js/danmaku.js)，
       修改为apiUrl不使用奇怪的自定义生成逻辑，直接返回videoId
2. qrcode的patch
    1. 禁止输出Suspense实验性提示，即使是在开发环境
3. sockjs-client的patch
    1. 注释`global.addEventListener(event, listener, false);`仅用于构建`SockJS`不需要事件支持，
       并且该种写法已经过时，参考[Window: unload event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event)
       该[issue](https://github.com/sockjs/sockjs-client/issues/646)目前（2024-02-06）处于打开状态，暂未得到回复