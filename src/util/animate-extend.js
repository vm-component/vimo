/**
 * 当前文件用于popup的继承父类
 * */
import focusOutActiveElement from './focus-out-active-element'

const NOOP = () => {}

export default {
  data () {
    return {
      /**
       * Animate Data
       * */
      enabled: true,         // 是否在动画阶段
      disableDuring: 200,     // 是否在动画阶段
      isActive: false,        // 组件是否为激活状态
      dismissCallback: NOOP,  // dismiss的回调
      presentCallback: NOOP  // present的回调
    }
  },
  methods: {
    /**
     * Transition Animate
     * Animate Hooks
     * */
    beforeEnter () {
      this.$emit('animate:beforeEnter')
      this.$app && this.$app.setEnabled(false, this.disableDuring)
      this.enabled = false // 不允许过渡中途操作
      focusOutActiveElement()
    },
    afterEnter () {
      this.$emit('animate:afterEnter')
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.$emit('animate:beforeLeave')
      this.$app && this.$app.setEnabled(false, this.disableDuring)
      this.enabled = false
      focusOutActiveElement()
    },
    afterLeave () {
      this.$emit('animate:afterLeave')
      this.dismissCallback()
      this.enabled = true
    },

    /**
     * @function present
     * @description
     * 打开组件
     * @returns {Promise} 当关闭动画执行完毕后触发resolved
     * @private
     */
    present () {
      this.isActive = true
      this.$emit('animate:present')
      return new Promise((resolve) => { this.presentCallback = resolve })
    },

    /**
     * @function dismiss
     * @description
     * 关闭组件
     * @returns {Promise} 当关闭动画执行完毕后触发resolved
     * @private
     */
    dismiss (data) {
      if (this.isActive) {
        this.isActive = false
        this.$emit('animate:dismiss', data)
        return new Promise((resolve) => { this.dismissCallback = resolve })
      } else {
        return new Promise((resolve) => { resolve() })
      }
    }
  }
}
