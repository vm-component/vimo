<template>
    <div class="ion-fab-list" :side="side">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Fab/FabList
   * @description
   *
   * ## 浮层组件 / FAB浮动按钮组件 - 盒子
   *
   * 这个组件为Fab组件的子组件, 用法及说明参考下方链接.
   *
   * @props {String} [side='bottom'] - 内部按钮展开方向, 默认向下
   * @props {String} [mode='ion'] - 模式
   *
   * @see component:Fab
   * @demo #/fab
   * */
  import { setElementClass, isTrueProperty } from '../util/util'
  export default{
    name: 'FabList',
    data () {
      return {
        fabs: [],
        visible: false
      }
    },
    props: {
      side: {
        type: String,
        default: 'bottom'
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') }
      }
    },
    methods: {
      /**
       * @param {Boolean} val - val
       * @private
       */
      setVisible (val) {
        let visible = isTrueProperty(val)
        if (visible === this.visible) {
          return
        }
        this.visible = visible

        let fabs = this.fabs
        let i = 1
        if (visible) {
          fabs.forEach(fab => {
            window.setTimeout(() => fab.setElementClass('show', true), i * 30)
            i++
          })
        } else {
          fabs.forEach(fab => fab.setElementClass('show', false))
        }
        this.setElementClass('fab-list-active', visible)
      },

      /**
       * @param {String} className - className
       * @param {Boolean} add - whether
       * @private
       * */
      setElementClass(className, add) {
        setElementClass(this.$el, className, add)
      }
    },
    mounted () {
      this.$children.forEach((child) => {
        if (child.$options._componentTag.toLowerCase() === 'fabbutton') {
          this.fabs.push(child)
        }
      })

      if (this.fabs.length === 0) {
        console.error('The FabList component need at least one BabButton component, please check!')
      }

      const className = `fab-${this.mode}-in-list`
      this.fabs.forEach((fab) => {
        fab.setElementClass('fab-in-list', true)
        fab.setElementClass(className, true)
      })

    }
  }
</script>
