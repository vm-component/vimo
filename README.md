<h1 align="center"><p align="center"><img src="https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo.png?raw=true" alt="vimo" width="200"></p><p align="center">Hello Vimo</p></h1>

<p align="center"><a href="https://www.travis-ci.org/vm-component/vimo"><img src="https://www.travis-ci.org/vm-component/vimo.svg?branch=master" alt="Build Status"></a> <a href='https://coveralls.io/github/vm-component/vimo?branch=master'><img src='https://img.shields.io/coveralls/vm-component/vimo.svg?branch=master' alt='Coverage Status' /></a> <a href="https://www.npmjs.com/package/vimo"><img src="https://img.shields.io/npm/v/vimo.svg" alt="npm version"></a> <a href="https://www.npmjs.com/package/vimo"><img src="https://img.shields.io/npm/dm/vimo.svg" alt="npm downloads"></a> <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a> <a href="#"><img src="https://img.shields.io/github/license/vm-component/Vimo.svg" alt="liense"></a> </p>

<h4 align="center"><p align="center">A H5 Platform For Hybrid</p></h4>


## DEMO

<p align="center"><img src="https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo_qrcode.png?raw=true" alt="vimo" width="200"><br><a align="center" href="https://vm-component.github.io/vimo-demo">https://vm-component.github.io/vimo-demo</a></p>

## USED FOR

使用一套H5代码在各类HyBrid平台中运行, 并根据平台完成对应的初始化工作, 且能根据平台自动切换主题样式.

可以使用的平台:  **微信、支付宝、钉钉、普通浏览器、原生App内部增强版WebView中**.

## HOW TO START

可以有两种方式使用:


### 使用npm自行搭建

自行搭建需要对Vimo项目比较熟悉, 这里强烈推荐使用`vimo-start-kit`开始, 如果Vimo版本不正确, 请使用`npm install vimo`自行升级.

#### 安装

```
npm install vimo

```

其余部分参考标准的文件组织结构: [Demo示例](https://github.com/vm-component/vimo-start-kit/tree/master/src)


### vimo-start-kit

Vimo项目初始化种子, 包括自定义主题文件. 点击进入项目地址: [vimo-start-kit](https://github.com/vm-component/vimo-start-kit)


## DEPENDENT

- vue 2.x
- vue-router 2.x
- webpack 2.x
- fastclick 1.x
- vue-i18n
- standardJS
- swiper

## 内部目录


```
- ./components  源码组件
- ./lib js部分babel处理
- ./dist 组件全部打包
```

## LICENSE

MIT

