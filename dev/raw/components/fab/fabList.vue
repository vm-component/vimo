<template>
    <div class="ion-fab-list" :side="side">
        <slot></slot>
    </div>
</template>
<style lang="scss">

</style>
<script type="text/javascript">
  /**
   *
   * @component FabList
   * @description
   *
   * ## 其他 / 浮动按钮组件(FAB) - 盒子
   *
   * @props {String} [side='bottom'] - 内部按钮展开方向, 默认向下
   * @props {String} [mode='ion'] - 模式
   * */
  import { setElementClass, isTrueProperty } from '../../util/util'
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
        default () { return this.$config.get('mode') }
      }
    },
    watch: {},
    computed: {},
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
    created () {},
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

    },
    activated () {},
    components: {}
  }
</script>
