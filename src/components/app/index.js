/**
 * @component App
 * @description
 *
 *  ## 基础组件 / App组件
 *
 * App组件是Vimo框架的根组件,用于管理及控制整个页面的状态.
 * 控制App行为的方法已挂载到`vue.prototype.$app`上, 所以在页面中直接像这样使用, 例如:
 *
 * ```
 * this.$app.setTitle('Hello World'); // 设置title
 * this.$app.isScrolling; // 获取可滚动状态
 * this.$app.isEnabled; // 获取可点击状态
 * ```
 *
 * 此外, 弹出层挂载点也在此组件中列举, 可以用id搜索到这些挂载点:
 *
 * - modalPortal
 * - sheetPortal
 * - alertPortal
 * - loadingPortal
 * - toastPortal
 *
 * ### 何为基础组件
 *
 * 布局组件就是基础组件, 比如: **App/Nav/Navbar/Page/Header/Footer/Content**, 一共7个. 此外, 如果不使用布局组件也没关系. 通过布局组件提供的方法就能知道它的作用了.
 *
 * - App: 根组件, 用于设置页面点击/滚动状态/设置文档title/设置根位置的样式
 * - Nav: 导航组件, 用于设置页面切换属性: 转场动画/转场是否显示Indicator/和Menus配合
 * - Page: 页面容器, 因为Vue要求业务template必须要使用一个根元素包裹, 故Page就是这个作用. 此外, 通过页面切换定义z-index层级.
 * - Header: 顾名思义, 页面的头部, 这部分不会页面滚动, 内部可安插Toolbar/Navbar等组件
 * - Footer: 使用方法和Header一致
 * - Content: 页面展示部分的容器, 可以使滚动内容, 也可以是固定内容, 详情参考组件介绍
 * - Nabvar: 该组件也在基础组件中, Navbar存在的意义是定义内容Title组件, 用于更新文档的Title. 页面切换在左侧显示后退按钮, 也可定义多个按钮. 使用方法和 Toolbar 一致.
 *
 * ### 可用状态(参考示例)
 *
 * - isScrolling  获取当前可滚动状态
 * - isEnabled    获取可点击状态
 *
 * ### 可在全局使用的公共样式
 *
 * -Text Alignment
 *    - [text-left]          - 文本左对齐
 *    - [text-center]        - 文本居中
 *    - [text-right]         - 文本右对齐
 *    - [text-justify]       - 文本右对齐
 *    - [text-nowrap]        - 文本不换行
 *
 *
 * -Text Transformation
 *    - [text-uppercase]     - 文本大写
 *    - [text-lowercase]     - 文本小写
 *    - [text-capitalize]    - 文本首字母大写
 *
 * -Normal
 *    - [padding]         - 结构增加padding, 默认16px
 *    - [no-padding]      - 结构去除padding
 *    - [hidden]          - display:none
 *    - .hidden           - display:none
 *
 * @props {String} [mode='ios'] - 模式, 用于在根处定义app的平台及样式
 *
 *
 * @slot 空               默认插入到正常页面中
 * @slot [outer]         插入到最外部， 用于定义在所有页面和弹出层之上的结构组件，比如：landscape-prompt组件
 *
 * @demo #/app
 *
 * @usage
 *
 * import { App, Content, Footer, Header, Install, Nav, Navbar, Page } from 'vimo'
 *
 * // -----------------
 * // 平台基础安装
 * Vue.use(Install, {
 *  custConf: APP_CONFIGS,
 *  pltConf: PLATFORM_CONFIGS,
 *  router: router
 * })
 * // 全局注册的组件(核心组件)
 * Vue.component(App.name, App)
 * Vue.component(Nav.name, Nav)
 * Vue.component(Navbar.name, Navbar)
 * Vue.component(Page.name, Page)
 * Vue.component(Header.name, Header)
 * Vue.component(Content.name, Content)
 * Vue.component(Footer.name, Footer)
 *
 * */
export { default } from './app.vue'
