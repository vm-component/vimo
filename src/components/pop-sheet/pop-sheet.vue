<template>
    <div class="vm-pop-sheet" :class="[modeClass,{'vm-pop-sheet-visible':isVisible}]">
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive && showBackdrop"></Backdrop>
        <transition
                name="pop-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="sheet-wrapper" v-show="isActive">
                <div class="sheet-container">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import Backdrop from '../backdrop/index'
  import animateExtend from '../../util/animate-extend'

  export default {
    name: 'PopSheet',
    extends: animateExtend,
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default () { return true }
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      showBackdrop: {
        type: Boolean,
        default: true
      },
      // 滚动控制, 默认开启
      scrollControl: Boolean
    },
    data () {
      return {
        /**
         * @desc
         * ActionSheet State
         * 属性      | 描述             | 未开启 | 'Present动画'开始 | 'Present动画'结束 | 'Dismiss动画'开始 | 'Dismiss动画'结束 | 未开启
         * ----------|------------------|--------|-------------------|-------------------|-------------------|-------------------|--------
         * isActive  | 开启关闭状态     | false  | true              | true              | true              | false             | false
         * enabled   | 是否在过渡动画中 | true   | false             | true              | true              | false             | true
         * isVisible | 判断是否在可视区 | false  | true              | true              | true              | true              | false
         * @private
         * */
        isVisible: false    // 是否处在显示阶段, 显示动画开启 -> 关闭动画完全关闭
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `pop-sheet-${this.mode}`
      }
    },
    methods: {
      /**
       * @function bdClick
       * @description
       * 点击backdrop
       * @private
       */
      bdClick () {
        if (this.enableBackdropDismiss) {
          this.dismiss()
        }
      }
    },
    created () {
      this.$on('animate:beforeEnter', () => {
        this.isVisible = true
      })
      this.$on('animate:afterLeave', () => {
        this.isVisible = false
      })

      this.$on('animate:present', () => {
        if (this.scrollControl) {
          this.$app && this.$app.$_disableScroll()
        }
      })

      this.$on('animate:dismiss', () => {
        if (this.scrollControl) {
          this.$app && this.$app.$_enableScroll()
        }
      })
    },
    components: {
      Backdrop
    }
  }
</script>
