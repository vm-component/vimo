<template>
    <div class="ion-buttons" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Toolbar/Buttons
   * @description
   *
   * ## 按钮组(Toolbar) / Buttons
   *
   * 这个组件只在Toolbar中使用. start/left/right/end等位置属性只能在此组组件上起作用. 可以理解为Button的放置盒子
   *
   * ### 如何引入
   *
   * ```
   * // 引入
   * import { Toolbar, Buttons, Title } from 'vimo/lib/toolbar'
   * // 安装
   * Vue.component(Toolbar.name, Toolbar)
   * Vue.component(Title.name, Title)
   * Vue.component(Buttons.name, Buttons)
   * ```
   *
   * ### 说明
   *
   * [left]/[right]/[end]属性标记位置, 注意没有[start]属性!!!
   *
   *
   *
   * @props {String} [mode=ios] - 模式
   * @props {Boolean} [left=false] - 放置在左侧
   * @props {Boolean} [right=false] - 放置在右侧
   * @props {Boolean} [end=false] - 放置在最右侧
   *
   * @see component:Toolbar
   *
   **/
  import ToolbarMixins from './toolbarMixins.vue'
  export default {
    name: 'vm-buttons',
    mixins: [ToolbarMixins],
    props: {
      left: Boolean,
      right: Boolean,
      end: Boolean
    },
    created () {
      this.roleName = 'bar-buttons'
    },
    mounted () {
      let postion = this.getPosition()
      console.log('postion ' + postion)
      this.$el.setAttribute(postion, '')
    },
    methods: {
      /**
       * @private
       **/
      getPosition () {
        if (this.right || this.end) {
          return 'right'
        }
        return 'left'
      }
    }
  }
</script>
