<h1 align="center"><p align="center"><img src="https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo.png?raw=true" alt="vimo" width="200"></p><p align="center">Hello Vimo</p></h1>

<p align="center"><a href="https://www.travis-ci.org/vm-component/vimo"><img src="https://www.travis-ci.org/vm-component/vimo.svg?branch=master" alt="Build Status"></a> <a href='https://coveralls.io/github/vm-component/vimo?branch=master'><img src='https://img.shields.io/coveralls/vm-component/vimo.svg?branch=master' alt='Coverage Status' /></a> <a href="https://www.npmjs.com/package/vimo"><img src="https://img.shields.io/npm/v/vimo.svg" alt="npm version"></a> <a href="https://www.npmjs.com/package/vimo"><img src="https://img.shields.io/npm/dm/vimo.svg" alt="npm downloads"></a> <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standardjs"></a> <a href="#"><img src="https://img.shields.io/github/license/vm-component/Vimo.svg" alt="liense"></a> </p>

<h4 align="center"><p align="center">A H5 Platform For Hybrid</p></h4>


## DEMO

<p align="center"><img src="https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo_qrcode.png?raw=true" alt="vimo" width="200"><br><a align="center" href="https://vm-component.github.io/vimo-demo">https://vm-component.github.io/vimo-demo</a></p>

## FEATURE

### 移动端H5组件库

VImo是一套移动端H5组件库，包括移动端开发常用到的组件。 目前已经完成[86个组件](https://github.com/vm-component/vimo/tree/master/src/components)编写，测试还在覆盖中。

### 样式自由更改

Vimo继承了Ionic的样式集，默认情况下可以根据平台自行切换皮肤（上面的二维码可使用IOS或者Android扫码体验），当然，这也为开发定制符合自己公司UI规范的主题提供了可能。此外，也可以通过[node-sass](https://link.jianshu.com/?t=https://github.com/sass/node-sass)的[options.data](https://link.jianshu.com/?t=https://github.com/sass/node-sass#data)的方式覆盖主题变量。关于主题定制，可参考[《关于组件库的主题定制》](http://www.jianshu.com/p/c6d7e6bf3987)。

### 支持JSSDK集成

为了满足一套H5在不同Webview中兼容，Vimo在初始化时能根据不同平台（微信、支付宝、钉钉等）的特性，调用平台提供的模块方法，比如：在普通浏览器使用H5的ActionSheet，而在支付宝或钉钉中使用JSSDK提供的ActionSheet，可以无缝兼容（需要配好platform-config.js，上面的二维码可使用支付宝扫码体验）。

### 集成布局组件

这里说的组件是：App、Nav、Page、Content、Header、Footer等。

- App组件是浏览器的代理，能设置滚动状态、页面可点击状态、标题设置等
- Nav组件用于页面切换转场动画的控制（盒式布局）
- Page组件是路由指向的根组件，用于设置当前页面的布局，支持流式布局和盒式布局
- Content组件是内容组件，可以监听内容滚动事件、支持下拉刷新和上拉刷新组件等
- Header、Footer是头尾组件，能配合Cotent完成页面布局，比如位置预留、自动隐藏等

## HOW TO START

### 使用npm自行搭建

自行搭建需要对Vimo项目比较熟悉，这里强烈推荐使用`vimo-start-kit`开始，如果Vimo版本不正确，请使用`npm install vimo`自行升级。

#### 下载

```bash
$ npm install vimo@latest --save
```

#### 安装

```js
import { App, Content, Footer, Header, Nav, Navbar, Page, Install } from 'vimo'

// ----------------------
// 平台基础安装
Vue.use(Install, {
  custConf: APP_CONFIGS,
  pltConf: PLATFORM_CONFIGS,
  router: router
})
// 全局注册的组件(核心组件)
Vue.component(App.name, App)
Vue.component(Nav.name, Nav)
Vue.component(Navbar.name, Navbar)
Vue.component(Page.name, Page)
Vue.component(Header.name, Header)
Vue.component(Content.name, Content)
Vue.component(Footer.name, Footer)
// ----------------------
```

其余部分参考标准的文件组织结构：[Demo示例](https://github.com/vm-component/vimo-start-kit/tree/master/src)。

### 使用种子项目

Vimo项目初始化种子```vimo-start-kit```，包括自定义主题文件。点击进入项目地址：[vimo-start-kit](https://github.com/vm-component/vimo-start-kit)。

## LAZY SCHEME

### babel-plugin-import

Vimo支持```babel-plugin-import```按需加载方式，每个组件都是一个入口，可在项目中单独使用不必安装。关于如何配置参考下面代码：

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ],
    "stage-2"
  ],
  "plugins": [
    "transform-runtime",
    [
      "import",
      {
        "libraryName": "vimo",
        "libraryDirectory": "lib/components"
      }
    ]
  ]
}

```


## THEME CUSTOMIZATION

### 样式覆盖

在业务代码中覆盖组件样式，这种写法会增大样式文件的体积，并且样式优先级不太好控制，可以用在小项目中开发，不建议长期使用。关于样式优先级的介绍参考这里：[《CSS优先级计算及应用》](http://www.jianshu.com/p/1c4e639ff7d5)。

### Fork一份只修改主题引用（推荐）

> 当前方案适合构建符合你公司内部UI规范的移动端组件库。

Vimo组件库编写使用的是Vue提供的```*.vue```单文件模式构建，但是样式文件是引入外部```style.scss```样式。例如：

```text
├── index.js  // 组件导出
├── loading.vue  // 组件构建
├── style.scss  // 样式归总
├── style
|   ├── loading.ios.scss    // IOS主题
|   ├── loading.md.scss    // MD主题
|   └── loading.scss    // 其余构建相关文件
```

这样做是为了主题的定制不影响组件主结构更新，你可以Fork项目，自行修改```style```文件夹中样式文件及```style.scss```中样式引用。如果Vimo主结构更新，那就用master分支代码更新你当前Fork的项目即可。


### 主题变量替换（推荐）

变量替换是所有组件库都推荐的方案，因为这是一个简单修改就能直接看到效果的方案（前提是配好```sass-loader```参数）。正如上面所提到，Vimo继承了Ionic的样式集，默认情况下可以根据平台自行切换皮肤。如果不满于，也可以通过[node-sass](https://link.jianshu.com/?t=https://github.com/sass/node-sass)的[options.data](https://link.jianshu.com/?t=https://github.com/sass/node-sass#data)的方式覆盖主题变量。关于主题定制，可参考[《关于组件库的主题定制》](http://www.jianshu.com/p/c6d7e6bf3987)。


## LICENSE

MIT

