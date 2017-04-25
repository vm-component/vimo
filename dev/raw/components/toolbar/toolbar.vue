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
<script>
  /**
   * @component Component/Toolbar
   * @description
   * 工具条, 一般放在Header或者Footer中, 工具条中包含按钮组或者title, 也可以放segment和searchbar组件.
   *
   * slots:
   *
   * 1. 默认: 作为内容, 比如Title/Searchbar/Segment
   * 2. buttons: 按钮组, 别忘记加[left]/[right]/[start]/[end]属性标记位置
   *
   * @property {String} mode - 模式
   * @property {String} color - 颜色
   *
   * @example
   *
   <Toolbar>
   <!--menutoggle-->
   <Button icon-only role="bar-button" shape="menutoggle" slot="buttons">
   <Icon class="icon" name="menu"></Icon>
   </Button>
   <!--title-->
   <Title>Left Menu</Title>
   </Toolbar>
   *
   * */
  export default{
    name: 'Toolbar',
    data(){
      return {
        statusbarPadding: window.VM && window.VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String]
    },
    computed: {
      // 颜色
      colorClass () {
        return !!this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
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
