# FAQ

这里说明使用Vimo时的常见问题, 不定时更新.



## 布局结构说明

```vue
<template>
    <!--根组件-->
    <App>
        <!--导航相关-->
        <Nav>
            <!--router-link-->
            <!--各个业务-->
            <!--example:-->
            <Page>
                <Header>
                    <Navbar>
                        <Title>Hello</Title>
                    </Navbar>
                </Header>
                <Content class="outer-content">
                    <p>Cotnent here</p>
                </Content>
                <Footer></Footer>
            </Page>
        </Nav>
    </App>
</template>
```


## 常见问题


### 版本1.1.1+升级指南

#### 迁移到SCSS

因为Scss在处理全局主题变量比Less好很多, 因此后续的主题全部迁移到了Scss这边, 因此在项目中需要安装对应的loader:

- node-sass
- sass-loader

#### vimo组件引入方式变更

为了使用户在找组件能更快捷、配合```babel-plugin-import```插件实现组件懒加载，vimo对所有组件的导出做了**拍平**处理，就是将组件全部挂载vimo上, 例如:

```js
import { App, Content, Footer, Header, Install, Nav, Navbar, Page } from 'vimo'
```

.babelrc文件配置：

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

如果没有正确配置会在控制台报出提示，这部分请认真对待。

#### 基础组件自行安装

这么做是为了配合```babel-plugin-import```插件，同时也支持组件单另出来使用。

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

### 版本0.6.0+更新报错

部分vimo组件的```import```引入方式发生变更, 例如之前是```import {Button} from 'vimo/lib/button'```, 改为了 ```import Button from 'vimo/lib/button'```. 变更的组件范围[参考这里](https://github.com/vm-component/vimo/blob/master/components/dist.js). 