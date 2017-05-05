/**
 * Created by Hsiang on 2017/5/3.
 */
export default {
  props: {
    /**
     * 按钮color：primary、secondary、danger、light、dark
     * */
    color: [String],
    /**
     * mode 按钮风格 ios/window/android/we/alipay
     * */
    mode: {
      type: String,
      default () { return this.$config.get('mode') || 'ios' }
    }
  },
  computed: {
    // 环境样式
    modeClass () {
      return `${this.componentName} ${this.componentName}-${this.mode}`
    },
    // 颜色
    colorClass () {
      return this.color ? (`${this.componentName}-${this.mode}-${this.color}`) : ''
    }
  }
}
