/**
 * 当前文件用于popup的继承父类
 * */
import focusOutActiveElement from './focus-out-active-element'
import { urlChange } from './url-change'

const NOOP = () => {}

export default {
  data () {
    return {
      /**
       * Animate Data
       * */
      enabled: false,         // 是否在动画阶段
      disableDuring: 200,     // 是否在动画阶段
      isActive: false,        // 组件是否为激活状态
      dismissCallback: NOOP,  // dismiss的回调
      presentCallback: NOOP,  // present的回调
      unReg: null,

      $_dismissOnPageChange: true,
      $_recordInHistory: false
    }
  },
  props: {
    dismissOnPageChange: {
      type: Boolean,
      default: true
    },
    recordInHistory: {
      type: Boolean,
      default: false
    },
    // 滚动控制, 默认开启
    scrollControl: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * Transition Animate
     * Animate Hooks
     * */
    beforeEnter () {
      this.$emit('popup:beforeEnter')
      this.$app && this.$app.setEnabled(false, this.disableDuring)
      this.enabled = false // 不允许过渡中途操作
      focusOutActiveElement()
    },
    afterEnter () {
      this.$emit('popup:afterEnter')
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.$emit('popup:beforeLeave')
      this.$app && this.$app.setEnabled(false, this.disableDuring)
      this.enabled = false
      focusOutActiveElement()
    },
    afterLeave () {
      this.$emit('popup:afterLeave')
      this.dismissCallback()
      this.enabled = true
      this.$destroy()
    },

    /**
     * @override
     * */
    beforePresent () {},

    /**
     * @override
     * */
    beforeDismiss () {},

    /**
     * @function present
     * @description
     * 打开组件
     * @returns {Promise} 当关闭动画执行完毕后触发resolved
     * @private
     */
    present () {
      this.isActive = true
      this.beforePresent()
      return new Promise((resolve) => { this.presentCallback = resolve })
    },

    /**
     * @function dismiss
     * @description
     * 关闭组件
     * @returns {Promise} 当关闭动画执行完毕后触发resolved
     * @private
     */
    dismiss () {
      if (this.isActive) {
        this.isActive = false
        this.unReg && this.unReg()
        this.beforeDismiss()

        if (this.$_recordInHistory) {
          window.history.back()
        }

        return new Promise((resolve) => { this.dismissCallback = resolve })
      } else {
        return new Promise((resolve) => { resolve() })
      }
    }
  },
  created () {
    if (this.scrollControl) {
      this.$app && this.$app.$_disableScroll()
    }

    this.$_dismissOnPageChange = this.dismissOnPageChange
    this.$_recordInHistory = this.recordInHistory

    if (this.$_recordInHistory) {
      this.$_dismissOnPageChange = true
      window.history.pushState(
        {
          id: new Date().getTime(),
          name: `${this._uid}`
        },
        '',
        ''
      )
    }
    // url change -> dismiss popup component
    if (this.$_dismissOnPageChange) {
      this.unReg = urlChange(() => {
        this.$_recordInHistory = false
        this.isActive && this.dismiss()
      })
    }
  },
  destroyed () {
    if (this.scrollControl) {
      this.$app && this.$app.$_enableScroll()
    }
    this.$el && this.$el.remove()
  }
}
