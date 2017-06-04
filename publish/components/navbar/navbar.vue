<template>
    <div class="ion-navbar toolbar"
         :class="[modeClass,colorClass,{'statusbar-padding':statusbarPadding}]" v-show="!hideNavBar">
        <div class="toolbar-background" :class="[toolbarBackgroundClass]"></div>
        <!--show-back-button-->
        <Button @click="backButtonClickHandler" role="bar-button" class="back-button"
                :class="[backButtonClass,{'show-back-button':!hideBackButton}]" v-if="!hideBb">
            <Icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></Icon>
            <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
        </Button>
        <!--buttons/menuToggle-->
        <slot name="buttons"></slot>
        <div class="toolbar-content" :class="[toolbarContentClass]">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
    // style from toolbar
</style>
<script type="text/javascript">
  /**
   * @component Navbar
   * @description
   *
   * ## 导航条 / Navbar
   *
   * ### 特别之处
   *
   * 导航条和工具条的属性类似, 只是导航条多了后退按钮, 且在当前业务页面中, **Navbar有且必须只有一个**, 也只有这个组件中的Title组件才有控制`document.title`的能力.
   *
   * Navbar一般是放在Header组件中使用, 并且在Navbar组件中经常和Title组件组合使用.
   *
   * 因为Navbar和Toolbar很相似, 其位置属性完全一样. 包括: **start/end/left/end**
   *
   * ### 后退按钮显示时机
   * 因为Vimo内建导航历史记录, 当历史记录中有上一条历史时显示后退按钮,反之, 不显示后退按钮. 当然也可以通过`hideBackButton`属性控制
   *
   * ### 点击后退
   *
   * 点击后退执行的是 `window.history.back()` 方法, 这个和点击后退按钮的效果是一样的.
   *
   * ### 如何引入
   *
   * ```
   * // 引入
   * import { Navbar } from 'vimo/components/navbar'
   * // 安装
   * Vue.component(Navbar.name, Navbar)
   * ```
   *
   * @see component:Toolbar
   * @see History
   *
   * @props {String} [mode=ios] - 模式
   * @props {String} [color] - 颜色
   * @props {Boolean} [hideBackButton=false] - 是否显示后退按钮
   *
   * @slot [空] 作为内容, 比如Title/Searchbar/Segment放置的位置
   * @slot [buttons] 按钮组, 别忘记加[left]/[right]/[start]/[end]属性标记位置
   *
   * @usage
   * <template>
   *  <Page>
   *    <Header>
   *      <Navbar :hideBackButton="false" color="danger">
   *        <Title>Demo</Title>
   *        <Button left icon-only role="bar-button" menutoggle slot="buttons">
   *            <Icon class="icon" name="menu"></Icon>
   *        </Button>
   *      <Navbar>
   *    </Header>
   *    <Content>
   *      <h1>这里是内容</h1>
   *    </Content>
   *  </Page>
   * </template>
   * */

  import { Button } from '../button'
  import { Icon } from '../icon'
  export default{
    name: 'Navbar',
    data () {
      return {
        hideBb: false,
        bbIcon: this.$config.get('backButtonIcon', 'arrow-back') || 'arrow-back',
        backText: this.$config.get('backButtonText', 'Back') || 'Back',
        hideNavBar: this.$config.getBoolean('hideNavBar', false),
        statusbarPadding: this.$config.getBoolean('statusbarPadding', false) // 是否有statusbar的padding
      }
    },
    props: {
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String],
      /**
       * 是否显示后退按钮
       * */
      hideBackButton: [Boolean]
    },
    computed: {
      modeClass () {
        return `toolbar-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
      },
      backButtonClass () {
        return `back-button-${this.mode}`
      },
      backButtonTextClass () {
        return `back-button-text-${this.mode}`
      },
      backButtonIconClass () {
        return `back-button-icon-${this.mode}`
      },
      toolbarBackgroundClass () {
        return `toolbar-background-${this.mode}`
      },
      toolbarContentClass () {
        return `toolbar-content-${this.mode}`
      }

    },
    methods: {
      backButtonClickHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        window.history.back()
      }
    },
    created () {
      this.hideBb = !this.$history.canGoBack()
    },
    components: {
      Button, Icon
    }
  }
</script>
