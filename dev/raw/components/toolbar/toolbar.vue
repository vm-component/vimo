<template>
    <div class="toolbar ion-toolbar"
         :class="[modeClass,colorClass,{'statusbar-padding':statusbarPadding}]">
        <div class="toolbar-background" :class="[toolbarBackgroundClass]"></div>
        <slot name="buttons"></slot>
        <div class="toolbar-content" :class="[toolbarContentClass]">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
    @import './toolbar.scss';
    @import './toolbar-button.scss';
    @import './toolbar.ios.scss';
    @import './toolbar.md.scss';
</style>
<script type="text/javascript">
  /**
   * @component Toolbar
   * @description
   *
   * ## 工具条 / Toolbar
   *
   * 工具条一般放在Header或者Footer中, 工具条中包含按钮组或者title, 也可以放segment和searchbar组件. 目前来说, Toolbar组件只是一个容器.
   *
   *
   * ### 位置属性
   *
   * Toolbar组件中的元素设置位置标记: start/end/left/end 可以切换他们的位置. 比如backButton后退按钮始终在最左边, 标记`end/right`的menu-toggle按钮始终在最右边.
   *
   * Toolbar组件内提供Buttons组件, 用于整体标记位置.
   *
   * 名称         | back-button | menu-toggle-start | buttons-left | buttons-start | content | buttons-end | buttons-right | menu-toggle-end
   * -----------|-------------|-------------------|--------------|---------------|---------|-------------|---------------|-----------------
   * order(ios) | 0           | 1                 | 2            | 3             | 4       | 5           | 6             | 7
   * order(md)  | 0           | 1                 | 2            | 4             | 3       | 5           | 6             | 7
   *
   *
   * ### Button组件
   *
   * **注意在Toolbar组件中的Button组件需要加上`role="bar-button"`属性, 这样才能正确显示样式.**
   *
   * ### 可用的样式属性
   *
   * - [transparent] - 背景透明
   *
   * ### 如何引入
   *
   * **这里有点特别, Title组件的名称是在`Title.name`中定义的, 使用时小心.**
   *
   * ```
   * // 引入
   * import { Toolbar, Buttons, Title } from 'vimo/components/toolbar'
   * // 安装
   * Vue.component(Toolbar.name, Toolbar)
   * Vue.component(Title.name, Title)
   * Vue.component(Buttons.name, Buttons)
   * ```
   *
   *
   * @props {String} [mode=ios] - 模式
   * @props {String} [color] - 颜色
   *
   * @slot [空] 作为内容, 比如Title/Searchbar/Segment放置的位置
   * @slot [buttons] 按钮组, 别忘记加[left]/[right]/[end]属性标记位置
   * @demo https://dtfe.github.io/vimo-demo/#/toolbar
   *
   *
   * @usage
   * <Toolbar color="danger">
   *    <!--start-->
   *    <Buttons start slot="buttons">
   *        <Button icon-only role="bar-button">
   *            <Icon class="icon" name="contact"></Icon>
   *        </Button>
   *        <Button icon-only role="bar-button">
   *            <Icon class="icon" name="search"></Icon>
   *        </Button>
   *    </Buttons>
   *    <!--end-->
   *    <Buttons end slot="buttons">
   *        <Button icon-only role="bar-button">
   *            <Icon class="icon" name="more"></Icon>
   *        </Button>
   *    </Buttons>
   *    <!--title-->
   *    <Title>My Toolbar Title</Title>
   * </Toolbar>
   *
   *  <Toolbar>
   *    <!--menutoggle-->
   *    <Button left icon-only role="bar-button" menutoggle slot="buttons">
   *        <Icon class="icon" name="menu"></Icon>
   *    </Button>
   *    <!--title-->
   *    <Title>Left Menu</Title>
   * </Toolbar>
   * */
  export default{
    name: 'Toolbar',
    data () {
      return {
        statusbarPadding: this.$config && this.$config.getBoolean('statusbarPadding', false) // 是否有statusbar的padding
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String]
    },
    computed: {
      // 颜色
      colorClass () {
        return this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
      },
      // 环境样式
      modeClass () {
        return `toolbar-${this.mode}`
      },
      toolbarBackgroundClass () {
        return `toolbar-background-${this.mode}`
      },
      toolbarContentClass () {
        return `toolbar-content-${this.mode}`
      }
    }
  }
</script>
