# Vimo
---

就目前来看，移动端H5的业务需求希望同样的页面能够在微信、支付宝、普通浏览器或者自建的App内部WebView中运行，因此使用一套代码完成上述需求。

![这个是图片](http://placehold.it/100x100)


从技术实现角度是没问题的，但是在维护层面会有些难度，需要在业务代码中插入很多环境判断的代码，这个和职责分离的设计思想相分离，故Vimo就是为了解决这个问题而开发。

Vimo的设计思想来源于IONIC2.x，通过研读源码并结合当前的问题，上述的问题是按照这个思路解决的：

![这个是图片](http://placehold.it/100x100)

App在运行之前，完成对当前运行环境的初始化，这部分由`config + plarform`完成，

> 按照IONIC2.x的组件样式及API编写基于Vue2.X的组件，如果没读懂源码及思路, 千万别用与生产。




项目使用vue-cli构建，如果对此熟悉则下面的启动说明应该就没问题了。

## 目录说明
```
|--backup			备份文件
|--build  			webpack配置文件
|--config  			webpack配置文件
|--Manuscript  		设计手稿
|--src				开发目录
|----assets			内部资源
|----views			业务页面(demo页面)
|----vimo			vimo组件及框架
|------component	组件
|------config		特性配置器
|------platform		平台配置器
|------theme		主题
|------transitions	过度的动画
|------util			工具
|------index.js		vimo安装入口
|----App.vue		主页面
|----main.js		入口js
|----router.js		路由
|----setting.js		业务设置
|--static			外部静态资源
|--test				测试
|--index.html		单页的index
```

## 文档生成

```
jsdoc ./src/vimo/components/**/** -c ./conf.json

```

## 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

