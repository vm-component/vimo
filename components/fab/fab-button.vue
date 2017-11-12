<template>
    <button
            ion-fab
            @click="$_clickHandler"
            :class="[modeClass,colorClass,isNormalButtonClass,{'fab-close-active':isMainButton && fabComponent.listsActive}]"
            :mini="mini">
        <Icon name="close" class="fab-close-icon"></Icon>
        <span class="button-inner">
            <slot></slot>
        </span>
    </button>
</template>
<script type="text/javascript">
  /**
   * @component Fab/FabButton
   * @description
   *
   * ## 浮层组件 / FAB浮动按钮组件 - 按钮
   *
   * 这个组件为Fab组件的子组件, 用法及说明参考下方链接.
   *
   *
   * @props {Boolean} mini - 尺寸
   * @props {String} [mode='ios'] - 模式
   * @props {String} color - 颜色
   *
   * @see component:Fab
   * @demo #/fab
   * */
  import Icon from '../icon/index'
  import { setElementClass } from '../util/util'

  export default {
    name: 'FabButton',
    props: {
      mini: Boolean,
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') }
      },
      color: String
    },
    inject: {
      fabComponent: {
        from: 'fabComponent',
        default: null
      },
      fabListComponent: {
        from: 'fabListComponent',
        default: null
      }
    },
    computed: {
      isMainButton () {
        return !this.fabListComponent && !!this.fabComponent
      },
      modeClass () {
        return `fab fab-${this.mode}`
      },
      colorClass () {
        return this.color && `fab-${this.mode}-${this.color}`
      },
      isNormalButtonClass () {
        return !this.isMainButton && `fab-in-list fab-${this.mode}-in-list`
      }
    },
    methods: {
      /**
       * @param {String} className - className
       * @param {Boolean} add - whether
       * @private
       * */
      $_setElementClass (className, add) {
        setElementClass(this.$el, className, add)
      },

      /**
       * 按钮点击处理函数, 如果是主button, 则Fab组件改写此方法
       * @private
       * */
      $_clickHandler () {
        this.$emit('click', this.fabComponent)
        this.isMainButton && this.fabComponent.$_toggleList()
      }
    },
    created () {
      if (!this.isMainButton) {
        this.fabListComponent.fabs.push(this)
      }
    },
    components: {Icon}
  }
</script>
