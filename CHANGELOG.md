# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.3"></a>
## [0.6.3](https://github.com/DTFE/vimo/compare/v0.6.2...v0.6.3) (2017-10-09)


### Bug Fixes

* 修复title在第三方平台设置不成功的问题+修复navbar组件在keep-alive模式设置不成功的问题([#15](https://github.com/DTFE/vimo/issues/15)) ([b51a833](https://github.com/DTFE/vimo/commit/b51a833))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/DTFE/vimo/compare/v0.6.1...v0.6.2) (2017-10-09)


### Bug Fixes

* npm由本地发布 ([7d8eda7](https://github.com/DTFE/vimo/commit/7d8eda7))
* 修复title组件在keep-alive模式下不更新document.title的问题 ([bfbbd13](https://github.com/DTFE/vimo/commit/bfbbd13))
* 修复title组件在keep-alive模式下不更新document.title的问题([#15](https://github.com/DTFE/vimo/issues/15)) ([c75abbd](https://github.com/DTFE/vimo/commit/c75abbd))
* 修复在keep-alive模式, content使用record-position属性失效的问题([#12](https://github.com/DTFE/vimo/issues/12)) ([7c5e70d](https://github.com/DTFE/vimo/commit/7c5e70d))
* 增加判断防止重复设置title ([bf280d6](https://github.com/DTFE/vimo/commit/bf280d6))




<a name="0.6.0"></a>
# [0.6.0](https://github.com/DTFE/vimo/compare/0.5.33...0.6.0) (2017-10-07)


### Bug Fixes

* **Alert/Card/Item/List/Theme:** 修复使用postcss-px2rem插件时的错误 ([4ed02d2](https://github.com/DTFE/vimo/commit/4ed02d2))
* **App:** App组件区分MD和IOS两个字体差异 ([7abe82a](https://github.com/DTFE/vimo/commit/7abe82a))
* **Base:** config模块cache拼写错误 ([d0d5828](https://github.com/DTFE/vimo/commit/d0d5828))
* **Indicator:** 修复indicatorPresentMinTime修改不生效的问题 ([4b33d23](https://github.com/DTFE/vimo/commit/4b33d23))
* Input组件事件系统调整+Demo清理 ([99e53ec](https://github.com/DTFE/vimo/commit/99e53ec))
* **Indicator:** 内部属性发布在config上 ([933dc85](https://github.com/DTFE/vimo/commit/933dc85))
* Actionsheet组件icon样式bug修复 ([ce5fa7b](https://github.com/DTFE/vimo/commit/ce5fa7b))
* App组件和Content组件检查及Demo检查 ([a660ad7](https://github.com/DTFE/vimo/commit/a660ad7))
* button组件依赖调整 ([e3e81dc](https://github.com/DTFE/vimo/commit/e3e81dc))
* Card组件调整, 修复样式bug ([b1ed4d9](https://github.com/DTFE/vimo/commit/b1ed4d9))
* ChooseCity组件修复Modal的引用 ([794aa4b](https://github.com/DTFE/vimo/commit/794aa4b))
* ChooseCity组件整理, 确定最小依赖 ([a69ccf7](https://github.com/DTFE/vimo/commit/a69ccf7))
* demo测试修改 ([97b6519](https://github.com/DTFE/vimo/commit/97b6519))
* Footer/Header组件设置最小高度44px ([2b45299](https://github.com/DTFE/vimo/commit/2b45299))
* header and footer delete min-height attrs ([251e91b](https://github.com/DTFE/vimo/commit/251e91b))
* history的toRoot方法调整 ([b010fd8](https://github.com/DTFE/vimo/commit/b010fd8))
* Input组件单独使用时的bug修复 ([6e89244](https://github.com/DTFE/vimo/commit/6e89244))
* Input组件添加showFocusHighlight属性, 控制focus时高亮显示input组件 ([f6ce4a6](https://github.com/DTFE/vimo/commit/f6ce4a6))
* item-collapse组件样式调整 ([5cadab5](https://github.com/DTFE/vimo/commit/5cadab5))
* item-sliding组件拆分 ([2b58d70](https://github.com/DTFE/vimo/commit/2b58d70))
* Item/ItemCollapse/ItemSliding组件样式拆分 ([45d4d11](https://github.com/DTFE/vimo/commit/45d4d11))
* Menus组件修改实现展开逻辑 ([7ae2d3b](https://github.com/DTFE/vimo/commit/7ae2d3b))
* navbar内部逻辑调整 ([8165095](https://github.com/DTFE/vimo/commit/8165095))
* Picker组件将背景色的依赖给成白色 ([81be8cb](https://github.com/DTFE/vimo/commit/81be8cb))
* Select组件样式整理 ([eabefd0](https://github.com/DTFE/vimo/commit/eabefd0))
* textarea组件事件编辑 ([bdaac72](https://github.com/DTFE/vimo/commit/bdaac72))
* textarea组件样式整理 ([95b8ad0](https://github.com/DTFE/vimo/commit/95b8ad0))
* Toolbar组件设置最小高度, 用于在使用rem布局时, 在320px宽度设备上toolbar高度过小的显示问题 ([ce01d8f](https://github.com/DTFE/vimo/commit/ce01d8f))
* 修复"Cannot read property 'initWhenInWebview' of undefined"的问题([#5](https://github.com/DTFE/vimo/issues/5)) ([0e6d484](https://github.com/DTFE/vimo/commit/0e6d484))
* 修复alert组件在没有img属性时的padding问题 ([09f71f3](https://github.com/DTFE/vimo/commit/09f71f3))
* 修复Item样式的引入的问题 ([be74de5](https://github.com/DTFE/vimo/commit/be74de5))
* 修复其余组件对基础组件的依赖 ([bb37823](https://github.com/DTFE/vimo/commit/bb37823))
* 修复打包时icon引入错误的问题 ([d539879](https://github.com/DTFE/vimo/commit/d539879))
* 删除会被外部影响的.item/.input类 ([6bd570f](https://github.com/DTFE/vimo/commit/6bd570f))
* 去除无用的css代码 ([a16e033](https://github.com/DTFE/vimo/commit/a16e033))
* 固定一些px单位不被转化成rem单位, 比如几px的单位 ([b68a5f7](https://github.com/DTFE/vimo/commit/b68a5f7))
* **Scroll:** Scroll组件根据最新better-scroll的api更新 ([f7ceefd](https://github.com/DTFE/vimo/commit/f7ceefd))
* **Scroll:** 修复better-scroll的引用错误 ([522a6ac](https://github.com/DTFE/vimo/commit/522a6ac))
* **Toolbar/Navbar:** 修复MD原有样式 ([0bc0ae4](https://github.com/DTFE/vimo/commit/0bc0ae4))
* 组件内部的组建依赖更改名称, 避免console报错 ([3418eba](https://github.com/DTFE/vimo/commit/3418eba))
* 组件内部的组建依赖更改名称, 避免console报错 ([61e29f1](https://github.com/DTFE/vimo/commit/61e29f1))
* 组件内部的组建依赖更改名称, 避免console报错 ([c0356d1](https://github.com/DTFE/vimo/commit/c0356d1))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([96c5b2b](https://github.com/DTFE/vimo/commit/96c5b2b))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([#7](https://github.com/DTFE/vimo/issues/7)) ([3d4c8a9](https://github.com/DTFE/vimo/commit/3d4c8a9))


### Features

* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([9011ae2](https://github.com/DTFE/vimo/commit/9011ae2))
* **postcss-px2rem:** 使用postcss-px2rem插件的场景 ([d7a9a17](https://github.com/DTFE/vimo/commit/d7a9a17))
* 0.55px改成1px, 因为有些机型会转化为0px而不是1px ([dbeb944](https://github.com/DTFE/vimo/commit/dbeb944))
* Input组件与Textarea组件分离 ([dfefb95](https://github.com/DTFE/vimo/commit/dfefb95))
* Input组件和Textarea组件拆分, 两个使用重叠部分不大, 合并会增加复杂度 ([a17dd4c](https://github.com/DTFE/vimo/commit/a17dd4c))
* Item组件删除没用多余的slot ([b0c1d74](https://github.com/DTFE/vimo/commit/b0c1d74))
* Item组件引入方式整理 ([4991a95](https://github.com/DTFE/vimo/commit/4991a95))
* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([3e4c34c](https://github.com/DTFE/vimo/commit/3e4c34c))
* Item获取组件内部的文本过程优化 ([6a985c9](https://github.com/DTFE/vimo/commit/6a985c9))
* Select组件命名规范化 ([d4d3e96](https://github.com/DTFE/vimo/commit/d4d3e96))
* slides组件的样式和主题集成(修改轮播主题色方便多了) ([49c10cc](https://github.com/DTFE/vimo/commit/49c10cc))
* Teatarea增加count属性 ([16b7aab](https://github.com/DTFE/vimo/commit/16b7aab))
* 基础组件重定义 ([b724f32](https://github.com/DTFE/vimo/commit/b724f32))
* 将基础组件合并到base中 ([15465ce](https://github.com/DTFE/vimo/commit/15465ce))
* 将基础组件合并到base中 ([38a03a1](https://github.com/DTFE/vimo/commit/38a03a1))
* 折叠组件整理 ([1a0ecbd](https://github.com/DTFE/vimo/commit/1a0ecbd))
* 新增Textarea组件 ([b5b1a8a](https://github.com/DTFE/vimo/commit/b5b1a8a))
* 组件引入方式改变, 单个组件返回default, 而不是对象 ([325e7b6](https://github.com/DTFE/vimo/commit/325e7b6))
* 给Popover组件增加onDismiss回调函数, 动画完全关闭时触发([#9](https://github.com/DTFE/vimo/issues/9)) ([450c0d4](https://github.com/DTFE/vimo/commit/450c0d4))


### Performance Improvements

* input组件使用的正则优化基础类型 ([9de0ac5](https://github.com/DTFE/vimo/commit/9de0ac5))



<a name="0.5.50"></a>
## [0.5.50](https://github.com/DTFE/vimo/compare/0.5.33...0.5.50) (2017-10-07)


### Bug Fixes

* **Alert/Card/Item/List/Theme:** 修复使用postcss-px2rem插件时的错误 ([4ed02d2](https://github.com/DTFE/vimo/commit/4ed02d2))
* **App:** App组件区分MD和IOS两个字体差异 ([7abe82a](https://github.com/DTFE/vimo/commit/7abe82a))
* **Base:** config模块cache拼写错误 ([d0d5828](https://github.com/DTFE/vimo/commit/d0d5828))
* **Indicator:** 修复indicatorPresentMinTime修改不生效的问题 ([4b33d23](https://github.com/DTFE/vimo/commit/4b33d23))
* Input组件事件系统调整+Demo清理 ([99e53ec](https://github.com/DTFE/vimo/commit/99e53ec))
* **Indicator:** 内部属性发布在config上 ([933dc85](https://github.com/DTFE/vimo/commit/933dc85))
* Actionsheet组件icon样式bug修复 ([ce5fa7b](https://github.com/DTFE/vimo/commit/ce5fa7b))
* App组件和Content组件检查及Demo检查 ([a660ad7](https://github.com/DTFE/vimo/commit/a660ad7))
* button组件依赖调整 ([e3e81dc](https://github.com/DTFE/vimo/commit/e3e81dc))
* Card组件调整, 修复样式bug ([b1ed4d9](https://github.com/DTFE/vimo/commit/b1ed4d9))
* ChooseCity组件修复Modal的引用 ([794aa4b](https://github.com/DTFE/vimo/commit/794aa4b))
* ChooseCity组件整理, 确定最小依赖 ([a69ccf7](https://github.com/DTFE/vimo/commit/a69ccf7))
* demo测试修改 ([97b6519](https://github.com/DTFE/vimo/commit/97b6519))
* Footer/Header组件设置最小高度44px ([2b45299](https://github.com/DTFE/vimo/commit/2b45299))
* header and footer delete min-height attrs ([251e91b](https://github.com/DTFE/vimo/commit/251e91b))
* history的toRoot方法调整 ([b010fd8](https://github.com/DTFE/vimo/commit/b010fd8))
* Input组件单独使用时的bug修复 ([6e89244](https://github.com/DTFE/vimo/commit/6e89244))
* Input组件添加showFocusHighlight属性, 控制focus时高亮显示input组件 ([f6ce4a6](https://github.com/DTFE/vimo/commit/f6ce4a6))
* item-collapse组件样式调整 ([5cadab5](https://github.com/DTFE/vimo/commit/5cadab5))
* item-sliding组件拆分 ([2b58d70](https://github.com/DTFE/vimo/commit/2b58d70))
* Item/ItemCollapse/ItemSliding组件样式拆分 ([45d4d11](https://github.com/DTFE/vimo/commit/45d4d11))
* Menus组件修改实现展开逻辑 ([7ae2d3b](https://github.com/DTFE/vimo/commit/7ae2d3b))
* navbar内部逻辑调整 ([8165095](https://github.com/DTFE/vimo/commit/8165095))
* Picker组件将背景色的依赖给成白色 ([81be8cb](https://github.com/DTFE/vimo/commit/81be8cb))
* Select组件样式整理 ([eabefd0](https://github.com/DTFE/vimo/commit/eabefd0))
* textarea组件事件编辑 ([bdaac72](https://github.com/DTFE/vimo/commit/bdaac72))
* textarea组件样式整理 ([95b8ad0](https://github.com/DTFE/vimo/commit/95b8ad0))
* Toolbar组件设置最小高度, 用于在使用rem布局时, 在320px宽度设备上toolbar高度过小的显示问题 ([ce01d8f](https://github.com/DTFE/vimo/commit/ce01d8f))
* 修复"Cannot read property 'initWhenInWebview' of undefined"的问题([#5](https://github.com/DTFE/vimo/issues/5)) ([0e6d484](https://github.com/DTFE/vimo/commit/0e6d484))
* 修复alert组件在没有img属性时的padding问题 ([09f71f3](https://github.com/DTFE/vimo/commit/09f71f3))
* 修复Item样式的引入的问题 ([be74de5](https://github.com/DTFE/vimo/commit/be74de5))
* 修复其余组件对基础组件的依赖 ([bb37823](https://github.com/DTFE/vimo/commit/bb37823))
* 修复打包时icon引入错误的问题 ([d539879](https://github.com/DTFE/vimo/commit/d539879))
* 删除会被外部影响的.item/.input类 ([6bd570f](https://github.com/DTFE/vimo/commit/6bd570f))
* 去除无用的css代码 ([a16e033](https://github.com/DTFE/vimo/commit/a16e033))
* 固定一些px单位不被转化成rem单位, 比如几px的单位 ([b68a5f7](https://github.com/DTFE/vimo/commit/b68a5f7))
* **Scroll:** Scroll组件根据最新better-scroll的api更新 ([f7ceefd](https://github.com/DTFE/vimo/commit/f7ceefd))
* **Scroll:** 修复better-scroll的引用错误 ([522a6ac](https://github.com/DTFE/vimo/commit/522a6ac))
* **Toolbar/Navbar:** 修复MD原有样式 ([0bc0ae4](https://github.com/DTFE/vimo/commit/0bc0ae4))
* 组件内部的组建依赖更改名称, 避免console报错 ([3418eba](https://github.com/DTFE/vimo/commit/3418eba))
* 组件内部的组建依赖更改名称, 避免console报错 ([61e29f1](https://github.com/DTFE/vimo/commit/61e29f1))
* 组件内部的组建依赖更改名称, 避免console报错 ([c0356d1](https://github.com/DTFE/vimo/commit/c0356d1))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([96c5b2b](https://github.com/DTFE/vimo/commit/96c5b2b))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([#7](https://github.com/DTFE/vimo/issues/7)) ([3d4c8a9](https://github.com/DTFE/vimo/commit/3d4c8a9))


### Features

* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([9011ae2](https://github.com/DTFE/vimo/commit/9011ae2))
* **postcss-px2rem:** 使用postcss-px2rem插件的场景 ([d7a9a17](https://github.com/DTFE/vimo/commit/d7a9a17))
* 0.55px改成1px, 因为有些机型会转化为0px而不是1px ([dbeb944](https://github.com/DTFE/vimo/commit/dbeb944))
* Input组件与Textarea组件分离 ([dfefb95](https://github.com/DTFE/vimo/commit/dfefb95))
* Input组件和Textarea组件拆分, 两个使用重叠部分不大, 合并会增加复杂度 ([a17dd4c](https://github.com/DTFE/vimo/commit/a17dd4c))
* Item组件删除没用多余的slot ([b0c1d74](https://github.com/DTFE/vimo/commit/b0c1d74))
* Item组件引入方式整理 ([4991a95](https://github.com/DTFE/vimo/commit/4991a95))
* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([3e4c34c](https://github.com/DTFE/vimo/commit/3e4c34c))
* Item获取组件内部的文本过程优化 ([6a985c9](https://github.com/DTFE/vimo/commit/6a985c9))
* Select组件命名规范化 ([d4d3e96](https://github.com/DTFE/vimo/commit/d4d3e96))
* slides组件的样式和主题集成(修改轮播主题色方便多了) ([49c10cc](https://github.com/DTFE/vimo/commit/49c10cc))
* Teatarea增加count属性 ([16b7aab](https://github.com/DTFE/vimo/commit/16b7aab))
* 基础组件重定义 ([b724f32](https://github.com/DTFE/vimo/commit/b724f32))
* 将基础组件合并到base中 ([15465ce](https://github.com/DTFE/vimo/commit/15465ce))
* 将基础组件合并到base中 ([38a03a1](https://github.com/DTFE/vimo/commit/38a03a1))
* 折叠组件整理 ([1a0ecbd](https://github.com/DTFE/vimo/commit/1a0ecbd))
* 新增Textarea组件 ([b5b1a8a](https://github.com/DTFE/vimo/commit/b5b1a8a))
* 组件引入方式改变, 单个组件返回default, 而不是对象 ([325e7b6](https://github.com/DTFE/vimo/commit/325e7b6))
* 给Popover组件增加onDismiss回调函数, 动画完全关闭时触发([#9](https://github.com/DTFE/vimo/issues/9)) ([450c0d4](https://github.com/DTFE/vimo/commit/450c0d4))


### Performance Improvements

* input组件使用的正则优化基础类型 ([9de0ac5](https://github.com/DTFE/vimo/commit/9de0ac5))