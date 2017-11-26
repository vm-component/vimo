# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.9.4"></a>
## [0.9.4](https://github.com/vm-component/vimo/compare/v0.9.3...v0.9.4) (2017-11-26)


### Bug Fixes

* 修复menus打不开的问题 ([d9b51d4](https://github.com/vm-component/vimo/commit/d9b51d4))
* 修复pc模式鼠标样式->pointer ([081a181](https://github.com/vm-component/vimo/commit/081a181))



<a name="0.9.3"></a>
## [0.9.3](https://github.com/vm-component/vimo/compare/v0.9.2...v0.9.3) (2017-11-19)


### Bug Fixes

* modal打开时的滚动控制问题修复 ([9912080](https://github.com/vm-component/vimo/commit/9912080))
* 修复Content组件测试时$app未找到的问题 ([dddbcea](https://github.com/vm-component/vimo/commit/dddbcea))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/vm-component/vimo/compare/v0.9.1...v0.9.2) (2017-11-19)



<a name="0.9.1"></a>
## [0.9.1](https://github.com/vm-component/vimo/compare/v0.9.0...v0.9.1) (2017-11-19)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/vm-component/vimo/compare/v0.8.1...v0.9.0) (2017-11-19)


### Bug Fixes

* action-sheet动画整理 ([1972e1b](https://github.com/vm-component/vimo/commit/1972e1b))
* App组件去除无用部分 ([c061b32](https://github.com/vm-component/vimo/commit/c061b32))
* clearInput时, 不需debounce等待 ([18e7b5b](https://github.com/vm-component/vimo/commit/18e7b5b))
* document.title的hack模式修改去除, 微信等平台已支持document.title设置title ([cb39e18](https://github.com/vm-component/vimo/commit/cb39e18))
* fab在Content中的布局更新 ([df005b5](https://github.com/vm-component/vimo/commit/df005b5))
* fab的font-size不应该使用rem的问题 ([055e83e](https://github.com/vm-component/vimo/commit/055e83e))
* Indicator组件开启精简 ([432795e](https://github.com/vm-component/vimo/commit/432795e))
* landscape-prompt组件只在mobile下展示 ([49b18e3](https://github.com/vm-component/vimo/commit/49b18e3))
* landscape-prompt组件安装方式更改 ([2ddc309](https://github.com/vm-component/vimo/commit/2ddc309))
* Modal组件调整及文档修改 ([66632b1](https://github.com/vm-component/vimo/commit/66632b1))
* platform模块修改third->patch字段 ([3fa72fd](https://github.com/vm-component/vimo/commit/3fa72fd))
* util重复引入bug修复 ([d128271](https://github.com/vm-component/vimo/commit/d128271))
* 修复fab组件样式不可定制+动画退出直接消失的bug ([e94fc87](https://github.com/vm-component/vimo/commit/e94fc87))
* 修复package中repository书写的问题 ([5096cae](https://github.com/vm-component/vimo/commit/5096cae))
* 修复Range组件拖拽结束后才更新value的bug ([f184997](https://github.com/vm-component/vimo/commit/f184997))
* 修复弹出层插入位置 ([e050046](https://github.com/vm-component/vimo/commit/e050046))
* 修复部分组件引入type的问题 ([2e57570](https://github.com/vm-component/vimo/commit/2e57570))
* 修改 babelrc, 以支持tree-shaking ([9b790ba](https://github.com/vm-component/vimo/commit/9b790ba))
* 增加滚动控制scrollControl ([9012a3a](https://github.com/vm-component/vimo/commit/9012a3a))
* 弹出层组件z-index调整 ([480999b](https://github.com/vm-component/vimo/commit/480999b))
* 弹出层组件增加对vue-devtool的支持 ([ac43efe](https://github.com/vm-component/vimo/commit/ac43efe))
* 弹层组件使用 position: fixed; 定位 ([ed73932](https://github.com/vm-component/vimo/commit/ed73932))


### Features

* App组件修改disableScroll等方法逻辑 ([c5edb71](https://github.com/vm-component/vimo/commit/c5edb71))
* App组件的setDisableScroll方法重写 ([15ca418](https://github.com/vm-component/vimo/commit/15ca418))
* Vimo基础布局全部改为流式布局 ([59f051b](https://github.com/vm-component/vimo/commit/59f051b))


### Performance Improvements

* App组件增加slot=outer结构，用于在整体结构外部添加组件，比如landscape-prompt组件 ([8a0bcb3](https://github.com/vm-component/vimo/commit/8a0bcb3))
* Modal组件重构 ([1636756](https://github.com/vm-component/vimo/commit/1636756))
* Picker代码重构 ([521c2db](https://github.com/vm-component/vimo/commit/521c2db))
* popover重构 ([ad0a345](https://github.com/vm-component/vimo/commit/ad0a345))
* PreviewImage组件脱离Modal组件 ([2940cc3](https://github.com/vm-component/vimo/commit/2940cc3))
* Sheet重构 ([b66e7da](https://github.com/vm-component/vimo/commit/b66e7da))
* Toast重构 ([0d2ebc6](https://github.com/vm-component/vimo/commit/0d2ebc6))
* 新增组件LandscapePrompt组件，当手机横屏时黑屏并提示用户竖屏浏览。 ([d96efd1](https://github.com/vm-component/vimo/commit/d96efd1))
* 更新segment组件, 使用provide/inject属性 ([87d5923](https://github.com/vm-component/vimo/commit/87d5923))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/vm-component//vimo/compare/v0.8.0...v0.8.1) (2017-10-25)


### Bug Fixes

* 修复PopSheet组件showBackdrop属性支持 ([20516ff](https://github.com/vm-component//vimo/commit/20516ff))
* 修复Sheet组件direction参数拼写问题+showBackdrop属性支持, 惭愧.. ([ffbb31f](https://github.com/vm-component//vimo/commit/ffbb31f))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/vm-component/vimo/compare/v0.7.10...v0.8.0) (2017-10-24)


### Bug Fixes

* Sheet组件增加打开的方向, 现在支持'button'和'top'两个方向 ([fe87a5f](https://github.com/vm-component/vimo/commit/fe87a5f))
* 修复Sheet组件在其上下滚动时触发背景页面滚动的bug ([49d7bdd](https://github.com/vm-component/vimo/commit/49d7bdd))


### Features

* 增加PopSheet组件, 用于定制化显示Alert组件无法覆盖的场景 ([f2306ca](https://github.com/vm-component/vimo/commit/f2306ca))



<a name="0.7.10"></a>
## [0.7.10](https://github.com/vm-component/vimo/compare/v0.7.9...v0.7.10) (2017-10-23)


### Bug Fixes

* 修复Tab组件的mode设置无法自定义的问题([#11](https://github.com/vm-component/vimo/issues/11)) ([99a8e13](https://github.com/vm-component/vimo/commit/99a8e13))



<a name="0.7.9"></a>
## [0.7.9](https://github.com/vm-component/vimo/compare/v0.7.8...v0.7.9) (2017-10-20)


### Bug Fixes

* 修复Input组件边界检查text文本时在某些安卓机上字符跳动的问题 ([b5c5f10](https://github.com/vm-component/vimo/commit/b5c5f10))



<a name="0.7.8"></a>
## [0.7.8](https://github.com/vm-component/vimo/compare/v0.7.7...v0.7.8) (2017-10-20)


### Bug Fixes

* 修复Input组件在使用clear-input时, 没有触发input事件的bug ([b4e6520](https://github.com/vm-component/vimo/commit/b4e6520))



<a name="0.7.7"></a>
## [0.7.7](https://github.com/vm-component/vimo/compare/v0.7.6...v0.7.7) (2017-10-20)


### Bug Fixes

* 修复Input组件为非number类型时, 出现NaN的问题 ([7a4e413](https://github.com/vm-component/vimo/commit/7a4e413))



<a name="0.7.6"></a>
## [0.7.6](https://github.com/vm-component/vimo/compare/v0.7.5...v0.7.6) (2017-10-19)


### Bug Fixes

* Input/Textarea组件样式冲突的问题+增加font-size和line-height的变量设置 ([a8d6b84](https://github.com/vm-component/vimo/commit/a8d6b84))
* Input组件的min/max限制的问题在某些安卓机上出现数字抖动的问题 ([029af11](https://github.com/vm-component/vimo/commit/029af11))
* 修复Lable组件在某些机型上没垂直居中的问题 ([6698608](https://github.com/vm-component/vimo/commit/6698608))



<a name="0.7.5"></a>
## [0.7.5](https://github.com/vm-component/vimo/compare/v0.7.4...v0.7.5) (2017-10-17)


### Bug Fixes

* Input组件增加decimal属性, 如果是number类型, 则启用小数点输入限制 ([6968f6b](https://github.com/vm-component/vimo/commit/6968f6b))
* 修复项目Vue版本和Vimo中Vue版本不匹配的bug, 排除Vimo对vue的直接依赖, 改为开发依赖 ([4ca2542](https://github.com/vm-component/vimo/commit/4ca2542))



<a name="0.7.4"></a>
## [0.7.4](https://github.com/vm-component/vimo/compare/v0.7.3...v0.7.4) (2017-10-17)


### Bug Fixes

* 修复Input组件为number类型并设置max时, 出入超界会自动变更为max的问题 ([cfbd7ee](https://github.com/vm-component/vimo/commit/cfbd7ee))
* 修复picker显示宽度过长覆盖的问题([#17](https://github.com/vm-component/vimo/issues/17)) ([b98dbbd](https://github.com/vm-component/vimo/commit/b98dbbd))
* 修复必须同时确定min和max时, 范围限制才会生效的bug ([4f1a67a](https://github.com/vm-component/vimo/commit/4f1a67a))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/vm-component/vimo/compare/v0.7.2...v0.7.3) (2017-10-17)


### Bug Fixes

* picker找不到css的问题 ([6541c2c](https://github.com/vm-component/vimo/commit/6541c2c))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/vm-component/vimo/compare/v0.7.1...v0.7.2) (2017-10-17)


### Bug Fixes

* 修复Input组件输入type无法改变的情况 ([6ba8a98](https://github.com/vm-component/vimo/commit/6ba8a98))
* 修复test测试用例使用箭头函数的问题 ([b0768ae](https://github.com/vm-component/vimo/commit/b0768ae))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/vm-component/vimo/compare/v0.7.0...v0.7.1) (2017-10-11)


### Bug Fixes

* Alert组件使用document.getElementById返回undefined的问题 ([7a3b947](https://github.com/vm-component/vimo/commit/7a3b947))
* Navbary引入Popover调整下+文档整理 ([4663c0c](https://github.com/vm-component/vimo/commit/4663c0c))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/vm-component/vimo/compare/v0.6.3...v0.7.0) (2017-10-10)


### Features

* Button组件增加active属性, 用于表示当前按钮为选中状态 ([5368ad3](https://github.com/vm-component/vimo/commit/5368ad3))



<a name="0.6.3"></a>
## [0.6.3](https://github.com/vm-component/vimo/compare/v0.6.2...v0.6.3) (2017-10-09)


### Bug Fixes

* 修复title在第三方平台设置不成功的问题+修复navbar组件在keep-alive模式设置不成功的问题([#15](https://github.com/vm-component/vimo/issues/15)) ([b51a833](https://github.com/vm-component/vimo/commit/b51a833))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/vm-component/vimo/compare/v0.6.1...v0.6.2) (2017-10-09)


### Bug Fixes

* npm由本地发布 ([7d8eda7](https://github.com/vm-component/vimo/commit/7d8eda7))
* 修复title组件在keep-alive模式下不更新document.title的问题 ([bfbbd13](https://github.com/vm-component/vimo/commit/bfbbd13))
* 修复title组件在keep-alive模式下不更新document.title的问题([#15](https://github.com/vm-component/vimo/issues/15)) ([c75abbd](https://github.com/vm-component/vimo/commit/c75abbd))
* 修复在keep-alive模式, content使用record-position属性失效的问题([#12](https://github.com/vm-component/vimo/issues/12)) ([7c5e70d](https://github.com/vm-component/vimo/commit/7c5e70d))
* 增加判断防止重复设置title ([bf280d6](https://github.com/vm-component/vimo/commit/bf280d6))




<a name="0.6.0"></a>
# [0.6.0](https://github.com/vm-component/vimo/compare/0.5.33...0.6.0) (2017-10-07)


### Bug Fixes

* **Alert/Card/Item/List/Theme:** 修复使用postcss-px2rem插件时的错误 ([4ed02d2](https://github.com/vm-component/vimo/commit/4ed02d2))
* **App:** App组件区分MD和IOS两个字体差异 ([7abe82a](https://github.com/vm-component/vimo/commit/7abe82a))
* **Base:** config模块cache拼写错误 ([d0d5828](https://github.com/vm-component/vimo/commit/d0d5828))
* **Indicator:** 修复indicatorPresentMinTime修改不生效的问题 ([4b33d23](https://github.com/vm-component/vimo/commit/4b33d23))
* Input组件事件系统调整+Demo清理 ([99e53ec](https://github.com/vm-component/vimo/commit/99e53ec))
* **Indicator:** 内部属性发布在config上 ([933dc85](https://github.com/vm-component/vimo/commit/933dc85))
* Actionsheet组件icon样式bug修复 ([ce5fa7b](https://github.com/vm-component/vimo/commit/ce5fa7b))
* App组件和Content组件检查及Demo检查 ([a660ad7](https://github.com/vm-component/vimo/commit/a660ad7))
* button组件依赖调整 ([e3e81dc](https://github.com/vm-component/vimo/commit/e3e81dc))
* Card组件调整, 修复样式bug ([b1ed4d9](https://github.com/vm-component/vimo/commit/b1ed4d9))
* ChooseCity组件修复Modal的引用 ([794aa4b](https://github.com/vm-component/vimo/commit/794aa4b))
* ChooseCity组件整理, 确定最小依赖 ([a69ccf7](https://github.com/vm-component/vimo/commit/a69ccf7))
* demo测试修改 ([97b6519](https://github.com/vm-component/vimo/commit/97b6519))
* Footer/Header组件设置最小高度44px ([2b45299](https://github.com/vm-component/vimo/commit/2b45299))
* header and footer delete min-height attrs ([251e91b](https://github.com/vm-component/vimo/commit/251e91b))
* history的toRoot方法调整 ([b010fd8](https://github.com/vm-component/vimo/commit/b010fd8))
* Input组件单独使用时的bug修复 ([6e89244](https://github.com/vm-component/vimo/commit/6e89244))
* Input组件添加showFocusHighlight属性, 控制focus时高亮显示input组件 ([f6ce4a6](https://github.com/vm-component/vimo/commit/f6ce4a6))
* item-collapse组件样式调整 ([5cadab5](https://github.com/vm-component/vimo/commit/5cadab5))
* item-sliding组件拆分 ([2b58d70](https://github.com/vm-component/vimo/commit/2b58d70))
* Item/ItemCollapse/ItemSliding组件样式拆分 ([45d4d11](https://github.com/vm-component/vimo/commit/45d4d11))
* Menus组件修改实现展开逻辑 ([7ae2d3b](https://github.com/vm-component/vimo/commit/7ae2d3b))
* navbar内部逻辑调整 ([8165095](https://github.com/vm-component/vimo/commit/8165095))
* Picker组件将背景色的依赖给成白色 ([81be8cb](https://github.com/vm-component/vimo/commit/81be8cb))
* Select组件样式整理 ([eabefd0](https://github.com/vm-component/vimo/commit/eabefd0))
* textarea组件事件编辑 ([bdaac72](https://github.com/vm-component/vimo/commit/bdaac72))
* textarea组件样式整理 ([95b8ad0](https://github.com/vm-component/vimo/commit/95b8ad0))
* Toolbar组件设置最小高度, 用于在使用rem布局时, 在320px宽度设备上toolbar高度过小的显示问题 ([ce01d8f](https://github.com/vm-component/vimo/commit/ce01d8f))
* 修复"Cannot read property 'initWhenInWebview' of undefined"的问题([#5](https://github.com/vm-component/vimo/issues/5)) ([0e6d484](https://github.com/vm-component/vimo/commit/0e6d484))
* 修复alert组件在没有img属性时的padding问题 ([09f71f3](https://github.com/vm-component/vimo/commit/09f71f3))
* 修复Item样式的引入的问题 ([be74de5](https://github.com/vm-component/vimo/commit/be74de5))
* 修复其余组件对基础组件的依赖 ([bb37823](https://github.com/vm-component/vimo/commit/bb37823))
* 修复打包时icon引入错误的问题 ([d539879](https://github.com/vm-component/vimo/commit/d539879))
* 删除会被外部影响的.item/.input类 ([6bd570f](https://github.com/vm-component/vimo/commit/6bd570f))
* 去除无用的css代码 ([a16e033](https://github.com/vm-component/vimo/commit/a16e033))
* 固定一些px单位不被转化成rem单位, 比如几px的单位 ([b68a5f7](https://github.com/vm-component/vimo/commit/b68a5f7))
* **Scroll:** Scroll组件根据最新better-scroll的api更新 ([f7ceefd](https://github.com/vm-component/vimo/commit/f7ceefd))
* **Scroll:** 修复better-scroll的引用错误 ([522a6ac](https://github.com/vm-component/vimo/commit/522a6ac))
* **Toolbar/Navbar:** 修复MD原有样式 ([0bc0ae4](https://github.com/vm-component/vimo/commit/0bc0ae4))
* 组件内部的组建依赖更改名称, 避免console报错 ([3418eba](https://github.com/vm-component/vimo/commit/3418eba))
* 组件内部的组建依赖更改名称, 避免console报错 ([61e29f1](https://github.com/vm-component/vimo/commit/61e29f1))
* 组件内部的组建依赖更改名称, 避免console报错 ([c0356d1](https://github.com/vm-component/vimo/commit/c0356d1))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([96c5b2b](https://github.com/vm-component/vimo/commit/96c5b2b))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([#7](https://github.com/vm-component/vimo/issues/7)) ([3d4c8a9](https://github.com/vm-component/vimo/commit/3d4c8a9))


### Features

* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([9011ae2](https://github.com/vm-component/vimo/commit/9011ae2))
* **postcss-px2rem:** 使用postcss-px2rem插件的场景 ([d7a9a17](https://github.com/vm-component/vimo/commit/d7a9a17))
* 0.55px改成1px, 因为有些机型会转化为0px而不是1px ([dbeb944](https://github.com/vm-component/vimo/commit/dbeb944))
* Input组件与Textarea组件分离 ([dfefb95](https://github.com/vm-component/vimo/commit/dfefb95))
* Input组件和Textarea组件拆分, 两个使用重叠部分不大, 合并会增加复杂度 ([a17dd4c](https://github.com/vm-component/vimo/commit/a17dd4c))
* Item组件删除没用多余的slot ([b0c1d74](https://github.com/vm-component/vimo/commit/b0c1d74))
* Item组件引入方式整理 ([4991a95](https://github.com/vm-component/vimo/commit/4991a95))
* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([3e4c34c](https://github.com/vm-component/vimo/commit/3e4c34c))
* Item获取组件内部的文本过程优化 ([6a985c9](https://github.com/vm-component/vimo/commit/6a985c9))
* Select组件命名规范化 ([d4d3e96](https://github.com/vm-component/vimo/commit/d4d3e96))
* slides组件的样式和主题集成(修改轮播主题色方便多了) ([49c10cc](https://github.com/vm-component/vimo/commit/49c10cc))
* Teatarea增加count属性 ([16b7aab](https://github.com/vm-component/vimo/commit/16b7aab))
* 基础组件重定义 ([b724f32](https://github.com/vm-component/vimo/commit/b724f32))
* 将基础组件合并到base中 ([15465ce](https://github.com/vm-component/vimo/commit/15465ce))
* 将基础组件合并到base中 ([38a03a1](https://github.com/vm-component/vimo/commit/38a03a1))
* 折叠组件整理 ([1a0ecbd](https://github.com/vm-component/vimo/commit/1a0ecbd))
* 新增Textarea组件 ([b5b1a8a](https://github.com/vm-component/vimo/commit/b5b1a8a))
* 组件引入方式改变, 单个组件返回default, 而不是对象 ([325e7b6](https://github.com/vm-component/vimo/commit/325e7b6))
* 给Popover组件增加onDismiss回调函数, 动画完全关闭时触发([#9](https://github.com/vm-component/vimo/issues/9)) ([450c0d4](https://github.com/vm-component/vimo/commit/450c0d4))


### Performance Improvements

* input组件使用的正则优化基础类型 ([9de0ac5](https://github.com/vm-component/vimo/commit/9de0ac5))



<a name="0.5.50"></a>
## [0.5.50](https://github.com/vm-component/vimo/compare/0.5.33...0.5.50) (2017-10-07)


### Bug Fixes

* **Alert/Card/Item/List/Theme:** 修复使用postcss-px2rem插件时的错误 ([4ed02d2](https://github.com/vm-component/vimo/commit/4ed02d2))
* **App:** App组件区分MD和IOS两个字体差异 ([7abe82a](https://github.com/vm-component/vimo/commit/7abe82a))
* **Base:** config模块cache拼写错误 ([d0d5828](https://github.com/vm-component/vimo/commit/d0d5828))
* **Indicator:** 修复indicatorPresentMinTime修改不生效的问题 ([4b33d23](https://github.com/vm-component/vimo/commit/4b33d23))
* Input组件事件系统调整+Demo清理 ([99e53ec](https://github.com/vm-component/vimo/commit/99e53ec))
* **Indicator:** 内部属性发布在config上 ([933dc85](https://github.com/vm-component/vimo/commit/933dc85))
* Actionsheet组件icon样式bug修复 ([ce5fa7b](https://github.com/vm-component/vimo/commit/ce5fa7b))
* App组件和Content组件检查及Demo检查 ([a660ad7](https://github.com/vm-component/vimo/commit/a660ad7))
* button组件依赖调整 ([e3e81dc](https://github.com/vm-component/vimo/commit/e3e81dc))
* Card组件调整, 修复样式bug ([b1ed4d9](https://github.com/vm-component/vimo/commit/b1ed4d9))
* ChooseCity组件修复Modal的引用 ([794aa4b](https://github.com/vm-component/vimo/commit/794aa4b))
* ChooseCity组件整理, 确定最小依赖 ([a69ccf7](https://github.com/vm-component/vimo/commit/a69ccf7))
* demo测试修改 ([97b6519](https://github.com/vm-component/vimo/commit/97b6519))
* Footer/Header组件设置最小高度44px ([2b45299](https://github.com/vm-component/vimo/commit/2b45299))
* header and footer delete min-height attrs ([251e91b](https://github.com/vm-component/vimo/commit/251e91b))
* history的toRoot方法调整 ([b010fd8](https://github.com/vm-component/vimo/commit/b010fd8))
* Input组件单独使用时的bug修复 ([6e89244](https://github.com/vm-component/vimo/commit/6e89244))
* Input组件添加showFocusHighlight属性, 控制focus时高亮显示input组件 ([f6ce4a6](https://github.com/vm-component/vimo/commit/f6ce4a6))
* item-collapse组件样式调整 ([5cadab5](https://github.com/vm-component/vimo/commit/5cadab5))
* item-sliding组件拆分 ([2b58d70](https://github.com/vm-component/vimo/commit/2b58d70))
* Item/ItemCollapse/ItemSliding组件样式拆分 ([45d4d11](https://github.com/vm-component/vimo/commit/45d4d11))
* Menus组件修改实现展开逻辑 ([7ae2d3b](https://github.com/vm-component/vimo/commit/7ae2d3b))
* navbar内部逻辑调整 ([8165095](https://github.com/vm-component/vimo/commit/8165095))
* Picker组件将背景色的依赖给成白色 ([81be8cb](https://github.com/vm-component/vimo/commit/81be8cb))
* Select组件样式整理 ([eabefd0](https://github.com/vm-component/vimo/commit/eabefd0))
* textarea组件事件编辑 ([bdaac72](https://github.com/vm-component/vimo/commit/bdaac72))
* textarea组件样式整理 ([95b8ad0](https://github.com/vm-component/vimo/commit/95b8ad0))
* Toolbar组件设置最小高度, 用于在使用rem布局时, 在320px宽度设备上toolbar高度过小的显示问题 ([ce01d8f](https://github.com/vm-component/vimo/commit/ce01d8f))
* 修复"Cannot read property 'initWhenInWebview' of undefined"的问题([#5](https://github.com/vm-component/vimo/issues/5)) ([0e6d484](https://github.com/vm-component/vimo/commit/0e6d484))
* 修复alert组件在没有img属性时的padding问题 ([09f71f3](https://github.com/vm-component/vimo/commit/09f71f3))
* 修复Item样式的引入的问题 ([be74de5](https://github.com/vm-component/vimo/commit/be74de5))
* 修复其余组件对基础组件的依赖 ([bb37823](https://github.com/vm-component/vimo/commit/bb37823))
* 修复打包时icon引入错误的问题 ([d539879](https://github.com/vm-component/vimo/commit/d539879))
* 删除会被外部影响的.item/.input类 ([6bd570f](https://github.com/vm-component/vimo/commit/6bd570f))
* 去除无用的css代码 ([a16e033](https://github.com/vm-component/vimo/commit/a16e033))
* 固定一些px单位不被转化成rem单位, 比如几px的单位 ([b68a5f7](https://github.com/vm-component/vimo/commit/b68a5f7))
* **Scroll:** Scroll组件根据最新better-scroll的api更新 ([f7ceefd](https://github.com/vm-component/vimo/commit/f7ceefd))
* **Scroll:** 修复better-scroll的引用错误 ([522a6ac](https://github.com/vm-component/vimo/commit/522a6ac))
* **Toolbar/Navbar:** 修复MD原有样式 ([0bc0ae4](https://github.com/vm-component/vimo/commit/0bc0ae4))
* 组件内部的组建依赖更改名称, 避免console报错 ([3418eba](https://github.com/vm-component/vimo/commit/3418eba))
* 组件内部的组建依赖更改名称, 避免console报错 ([61e29f1](https://github.com/vm-component/vimo/commit/61e29f1))
* 组件内部的组建依赖更改名称, 避免console报错 ([c0356d1](https://github.com/vm-component/vimo/commit/c0356d1))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([96c5b2b](https://github.com/vm-component/vimo/commit/96c5b2b))
* 给input组件增加onKeyup事件, 用于对[@keyup](https://github.com/keyup).enter的支持, 这样使用: [@on](https://github.com/on)Keyup.enter ([#7](https://github.com/vm-component/vimo/issues/7)) ([3d4c8a9](https://github.com/vm-component/vimo/commit/3d4c8a9))


### Features

* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([9011ae2](https://github.com/vm-component/vimo/commit/9011ae2))
* **postcss-px2rem:** 使用postcss-px2rem插件的场景 ([d7a9a17](https://github.com/vm-component/vimo/commit/d7a9a17))
* 0.55px改成1px, 因为有些机型会转化为0px而不是1px ([dbeb944](https://github.com/vm-component/vimo/commit/dbeb944))
* Input组件与Textarea组件分离 ([dfefb95](https://github.com/vm-component/vimo/commit/dfefb95))
* Input组件和Textarea组件拆分, 两个使用重叠部分不大, 合并会增加复杂度 ([a17dd4c](https://github.com/vm-component/vimo/commit/a17dd4c))
* Item组件删除没用多余的slot ([b0c1d74](https://github.com/vm-component/vimo/commit/b0c1d74))
* Item组件引入方式整理 ([4991a95](https://github.com/vm-component/vimo/commit/4991a95))
* Item组件精简与拆分, 将divider/header/group绑定到Item上面 ([3e4c34c](https://github.com/vm-component/vimo/commit/3e4c34c))
* Item获取组件内部的文本过程优化 ([6a985c9](https://github.com/vm-component/vimo/commit/6a985c9))
* Select组件命名规范化 ([d4d3e96](https://github.com/vm-component/vimo/commit/d4d3e96))
* slides组件的样式和主题集成(修改轮播主题色方便多了) ([49c10cc](https://github.com/vm-component/vimo/commit/49c10cc))
* Teatarea增加count属性 ([16b7aab](https://github.com/vm-component/vimo/commit/16b7aab))
* 基础组件重定义 ([b724f32](https://github.com/vm-component/vimo/commit/b724f32))
* 将基础组件合并到base中 ([15465ce](https://github.com/vm-component/vimo/commit/15465ce))
* 将基础组件合并到base中 ([38a03a1](https://github.com/vm-component/vimo/commit/38a03a1))
* 折叠组件整理 ([1a0ecbd](https://github.com/vm-component/vimo/commit/1a0ecbd))
* 新增Textarea组件 ([b5b1a8a](https://github.com/vm-component/vimo/commit/b5b1a8a))
* 组件引入方式改变, 单个组件返回default, 而不是对象 ([325e7b6](https://github.com/vm-component/vimo/commit/325e7b6))
* 给Popover组件增加onDismiss回调函数, 动画完全关闭时触发([#9](https://github.com/vm-component/vimo/issues/9)) ([450c0d4](https://github.com/vm-component/vimo/commit/450c0d4))


### Performance Improvements

* input组件使用的正则优化基础类型 ([9de0ac5](https://github.com/vm-component/vimo/commit/9de0ac5))