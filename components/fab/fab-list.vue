<template>
    <div class="ion-fab-list" :side="side" :style="sideMargin">
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
  import { parsePxUnit } from '../util/util'

  export default {
    name: 'FabList',
    data () {
      return {
        fabs: [],
        sideMargin: {},
        visible: false
      }
    },
    props: {
      side: {
        type: String,
        default: 'bottom',
        validator (val) {
          return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1
        }
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') }
      }
    },
    provide () {
      let _this = this
      return {
        fabListComponent: _this
      }
    },
    inject: {
      fabComponent: {
        from: 'fabComponent',
        default: null
      }
    },
    methods: {
      /**
       * @param {Boolean} visible - val
       * @private
       */
      $_setVisible (visible) {
        let _this = this
        if (visible === this.visible) {
          return
        }
        this.visible = visible

        let fabs = this.fabs

        let interval = 16 * 3

        if (visible) {
          this.$_setElementClass('fab-list-active', visible)
          this.$nextTick(() => {
            for (let i = 0, len = fabs.length; len > i; i++) {
              window.setTimeout(() => {
                let fab = fabs[i]
                fab.$_setElementClass('show', true)
              }, i * interval)
            }
          })
        } else {
          this.$nextTick(() => {
            for (let i = 0, len = fabs.length; len > i; i++) {
              (function (i) {
                window.setTimeout(() => {
                  let fab = fabs[i]
                  fab.$_setElementClass('show', false)
                  if (fabs.length - 1 === i) {
                    window.setTimeout(() => {
                      _this.$nextTick(() => {
                        _this.$_setElementClass('fab-list-active', visible)
                      })
                    }, 300)
                  }
                }, i * interval)
              })(i)
            }
          })
        }
      },

      /**
       * @param {String} className - className
       * @param {Boolean} add - whether
       * @private
       * */
      $_setElementClass (className, add) {
        setElementClass(this.$el, className, add)
      }
    },
    created () {
      this.fabComponent.fabListComponents.push(this)
    },
    mounted () {
      let fabSize = parsePxUnit(window.getComputedStyle(this.fabComponent.$el).height)
      let fabContentMargin = this.fabComponent.fabContentMargin

      this.sideMargin = {
        margin: `${fabSize + fabContentMargin}px 0`
      }

      if (this.side === 'left' || this.side === 'right') {
        this.sideMargin = {
          margin: `0 ${fabSize + fabContentMargin}px`
        }
      }
    }
  }
</script>
