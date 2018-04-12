export { default } from './toolbar-title.vue'
/**
 * @component Toolbar/Title
 * @description
 *
 *
 * ## 文档标题 / Title
 *
 * 设置顶部的title及document.title, 请使用ref获取Title组件的setTitle方法, 使用该方法会同步设置document.title(默认)
 *
 * ### 等级
 *
 * 只有在Navbar组件中的Title组件才会自动更新`document.title`的值,
 *
 *
 * ### 如何引入
 *
 * ```
 * // 引入
 * import { Toolbar, Buttons, Title } from 'vimo'
 * // 安装
 * Vue.component(Toolbar.name, Toolbar)
 * Vue.component(Title.name, Title)
 * Vue.component(Buttons.name, Buttons)
 * ```
 *
 *
 * ### 如果在支付宝中
 * 如果在支付宝中, 则使用支付宝的方式设置title及其壳子的title, 可用方法如下:
 *
 * - setTitle
 * - reset
 *
 * @props {String} [mode=ios] - 模式
 * @props {String} [title] - 标题
 * @fires component:Title#title:click
 * @see component:Toolbar
 * @usage
 * <template>
 *  <Page>
 *    <Header>
 *      <Navbar>
 *        <Title ref="title">Demo</Title>
 *      <Navbar>
 *    </Header>
 *    <Content>
 *      <h1>这里是内容</h1>
 *    </Content>
 *  </Page>
 * </template>
 *
 * ...
 *
 * computed: {
   *   titleComponent () {
   *     return this.$refs.title
   *   }
   * },
 * methods: {
   *   setAllTitle () {
   *      this.titleComponent.setTitle('title')
   * }
   *
   * */
