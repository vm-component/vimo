/**
 * 当前文件用于popup的继承父类
 * */
import { urlChange } from './url-change'
import animateExtend from './animate-extend'

export default {
  extends: animateExtend,
  data () {
    return {
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
     * @override
     * */
    beforePresent () {},

    /**
     * @override
     * */
    beforeDismiss (data) {}
  },
  created () {
    if (this.scrollControl) {
      this.$app && this.$app.$_disableScroll()
    }

    this.$app && this.$app.$_addChild(this)

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
        this.dismiss()
      })
    }

    // animate四个状态事件
    this.$on('animate:beforeEnter', () => {
      this.$emit('popup:beforeEnter')
    })
    this.$on('animate:afterEnter', () => {
      this.$emit('popup:afterEnter')
    })
    this.$on('animate:beforeLeave', () => {
      this.$emit('popup:beforeLeave')
    })
    this.$on('animate:afterLeave', () => {
      this.$emit('popup:afterLeave')
      this.$destroy()
    })

    // 开启关闭事件
    this.$on('animate:present', () => {
      this.$emit('popup:present')
      this.beforePresent()
    })
    this.$on('animate:dismiss', (data) => {
      this.$emit('popup:dismiss')
      this.unReg && this.unReg()
      if (this.$_recordInHistory) {
        window.history.back()
      }
      this.beforeDismiss(data)
    })
  },
  destroyed () {
    if (this.scrollControl) {
      this.$app && this.$app.$_enableScroll()
    }
    this.$app && this.$app.$_removeChild(this)
    this.$el && this.$el.remove()
  }
}
