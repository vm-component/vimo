/**
 * 主题mode minxis
 * */
const kebabcase = require('lodash.kebabcase')

export default {
  props: {
    mode: {
      type: String,
      default () {
        return this.$config && this.$config.get('mode', 'ios') || 'ios'
      }
    },
    /**
     * 按钮color：primary、secondary、danger、light、dark
     * */
    // color: String
    color: {
      type: String,
      default () {
        return 'default'
      }
    }
  },
  data () {
    return {
      $_mode: this.mode
    }
  },
  computed: {
    $_name () {
      return kebabcase(this.$options.name)
    },
    modeClass () {
      return `${this.$_name}-${this.$_mode}`
    },
    // 颜色
    colorClass () {
      return this.color ? `${this.$_name}-${this.$_mode}-${this.color}` : ''
    }
  },
  created () {
    // this.$config && this.$config.on && this.$config.on('mode', (val) => {
    //
    // })
  }
}
