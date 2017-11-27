/**
 * @component Loading
 * @description
 *
 * ## 弹出层 / Loading组件(大Loading)
 *
 * Loading也有大小之分
 *
 * ### 关于大小Loading的问题
 *
 * Loading的使用场景是这样的: 当用户访问数据/资源加载/需要等待操作的需求下使用, 完整的情况下需要向用户说明我这次Loading是做什么, 比如Loading是提示"**正在请求资源, 请稍后!**", 有时我们并不需提示, 只需要显示菊花图即可, 因为频繁的显示大Loading还是很烦的,
 *   这里需要介绍下Indicator组件, 他是继承Loading组件, 但是只显示菊花图, 而且调用也简单, 不必每次传入参数.
 *
 * ### 弹出层
 *
 * - Loading通过present开启, 如果没设置duration, 则需要手动dismiss,
 * - Vimo的弹出层都是独立于页面的, 但也不是`body`的直接子元素, 而是挂载在App组件中的. 这样做是有考量的.
 * - 组件相应路由切换, 路由切换则自动关闭
 *
 * ### 用法
 *
 * - 不传参数则显示菊花
 * - 传入string则显示string
 * - 参考下面的示例
 *
 *
 * @props {string} [spinner='ios'] - 菊花样式
 * @props {string} [content] - 内容
 * @props {string} [cssClass] - 自定义样式
 * @props {boolean} [showBackdrop=false] - 是否显示黑色背景
 * @props {number} [duration] - loading持续时间, 如果为0则无效
 * @props {boolean} [dismissOnPageChange=true] - 页面切换是否关闭loading
 * @props {string} [mode='ios'] - 模式
 *
 * @demo #/loading
 * @see component:Indicator
 * @usage
 *
 * // 只显示菊花
 * spinnerOnly () {
   *      this.$loading.present();
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 1000)
   * },
 *
 * // 是显示name
 * stringOnly () {
   *      this.$loading.present('只传入了String');
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 1000)
   * },
 *
 * // 普通的
 * showDefault () {
   *      this.$loading.present({
   *        content: '正在加载, 6000ms后自动关闭...',
   *        dismissOnPageChange: false, // url变化后关闭loading(默认)
   *        showBackdrop: true,
   *      });
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 6000);
   * },
 *
 * */
import Backdrop from '../backdrop'
import Spinner from '../spinner'
import popupExtend from '../../util/popup-extend'

export default {
  name: 'Loading',
  extends: popupExtend,
  components: {
    Backdrop, Spinner
  },
  props: {
    spinner: {
      type: String,
      default () { return this.$config && this.$config.get('spinner', 'ios') || 'ios' }
    },
    content: String,
    cssClass: String,
    showBackdrop: {
      type: Boolean,
      default: true
    },
    duration: Number,
    mode: {
      type: String,
      default () { return this.$config && this.$config.get('mode') || 'ios' }
    }
  },
  data () {
    return {
      timer: null
    }
  },
  computed: {
    // 设置ActionSheet的风格
    modeClass () {
      return `loading-${this.mode}`
    },
    showSpinner () {
      return this.spinner !== 'hide'
    }
  },
  methods: {
    beforePresent () {
      if (parseInt(this.duration) > 16) {
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          this.dismiss()
        }, this.duration)
      }
    },
    beforeDismiss () {
      this.timer && window.clearTimeout(this.timer)
    }
  }
}
