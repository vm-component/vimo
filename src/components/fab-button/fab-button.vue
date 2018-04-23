<template>
    <button @click="$_clickHandler"
            :class="[modeClass,colorClass,isNormalButtonClass,{'fab-close-active':isMainButton && fabComponent.listsActive}]"
            :mini="mini">
        <Icon name="close" class="fab-close-icon"></Icon>
        <span class="button-inner">
            <slot></slot>
        </span>
        <ButtonRipple />
    </button>
</template>
<script type="text/javascript">
  import Icon from '../icon'
  import { setElementClass } from '../../util/util'
  import ButtonRipple from '../button-ripple/index.js'

  export default {
    name: 'FabButton',
    inject: {
      fabComponent: {
        from: 'fabComponent',
        default () {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[Component] FabButton组件 需要与 Fab组件 组合使用!')
          }
          return null
        }
      },
      fabListComponent: {
        from: 'fabListComponent',
        default: null
      }
    },
    props: {
      mini: Boolean,
      mode: {
        type: String,
        default () {
          return this.$config && this.$config.get('mode')
        }
      },
      color: String
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
        this.fabListComponent && this.fabListComponent.fabs.push(this)
      }
    },
    components: {Icon,ButtonRipple}
  }
</script>
