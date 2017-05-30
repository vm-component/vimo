<template>
    <div class="ion-buttons bar-buttons" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss"></style>
<script type="text/javascript">
  /**
   * @component Buttons
   * @description
   *
   * ## 按钮组(Toolbar) / Buttons
   *
   * 这个组件只在Toolbar中使用.
   *
   * ### 如何引入
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
   * @props {String} [mode=ios] - 模式
   *
   * @see component:Toolbar
   *
   * */
  export default{
    name: 'Buttons',
    props: {
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `bar-buttons-${this.mode}`
      }
    }
  }
</script>
