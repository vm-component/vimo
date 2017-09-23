<template>
    <div class="spinner" :class=[colorClass,nameClass,pausedClass]>
        <svg v-if="circles && circles.length>0" viewBox="0 0 64 64" v-for="i in circles" :style="i.style">
            <circle :r="i.r" transform="translate(32,32)"></circle>
        </svg>
        <svg v-if="lines && lines.length>0" viewBox="0 0 64 64" v-for="i in lines" :style="i.style">
            <line :y1="i.y1" :y2="i.y2" transform="translate(32,32)"></line>
        </svg>
    </div>
</template>
<style lang="less">
    @import "spinner";
    @import "spinner.ios.less";
    @import "spinner.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Spinner
   * @description
   *
   * ## 其他 / Spinner菊花组件
   *
   * ### 说明
   * Spinner组件提供了一个使用svg+js的方式事项的菊花图(loading). Spinner组件可以通过传入`props`来实时控制Spinner的样子, 用来模拟诸如: processing/thinking/waiting/chilling 等特性.
   *
   * ### 菊花风格
   *
   * Spinner的风格可以是下面的一种: ios/ios-small/bubbles/circles/crescent/dots, 其中, ios默认的是'ios'; md默认的是'crescent'; wp默认的是'circles'; 这些可以通过`config`配置
   *
   *
   * ### 如何使用
   *
   * ```
   * // 引入
   * import Spinner from 'vimo/lib/spinner'
   * // 安装
   * Vue.component(Spinner.name, Spinner)
   * // 或者
   * export default{
   *   components: {
   *    Spinner
   *  }
   * }
   * ```
   *
   * @props {String} [color] - 颜色
   * @props {String} [mode='ios'] - 模式
   * @props {String} [name] - 菊花样式
   * @props {String} [duration] - 旋转动画的持续时间
   * @props {Boolean} [paused] - 是否暂停
   *
   * @demo #/spinner
   *
   * @usage
   * <Spinner></Spinner>
   * <Spinner name="ios"></Spinner>
   * <Spinner mode="wp"></Spinner>
   * <Spinner color="secondary" name="dots"></Spinner>
   * <Spinner duration="3000" name="dots"></Spinner>
   * <Spinner :paused="true" name="ios"></Spinner>
   * */

  export default{
    name: 'Spinner',
    props: {
      // 按钮color：primary、secondary、danger、light、dark
      color: [String],

      // mode 按钮平台 ios/window/android
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },

      // name 风格
      // ios/ios-small/bubbles/circles/crescent/dots
      name: String,

      // duration 持续时间
      duration: String,

      // paused 是否暂停
      paused: Boolean
    },
    data () {
      return {
        isInit: false,
        // svg动画数组
        lines: [],
        circles: [],
        // ios/ios-small/bubbles/circles/crescent/dots
        nameClass: null
      }
    },
    watch: {
      // 因为实例创建在前，赋值在后，如果name和duration改变则从新初始化
      name () {
        this.load()
      },
      duration () {
        this.load()
      }
    },
    computed: {
      // primary、secondary、danger、light、dark
      colorClass () {
        return this.color ? `spinner-${this.mode}-${this.color}` : null
      },
      // 设置Alert的风格
      modeClass () {
        return this.mode ? `spinner-${this.mode}` : null
      },
      pausedClass () {
        return this.paused ? 'spinner-paused' : null
      }
    },
    methods: {
      load () {
        if (this.isInit) {
          // 因为会涉及到再次渲染，故提前制空
          this.lines = []
          this.circles = []

          // 如果指定了name，则使用指定的name。
          // 如果没指定name，则根据设备别使用默认的name
          let name
          if (this.name) {
            name = this.name
          } else {
            if (this.mode === 'ios') {
              name = 'ios'
            } else if (this.mode === 'md') {
              name = 'crescent'
            } else if (this.mode === 'wp') {
              name = 'circles'
            } else {
              name = this.$config && this.$config.get('spinner', 'ios') || 'ios'
            }
          }
          const spinner = SPINNERS[name]

          if (spinner) {
            if (spinner.lines) {
              for (let i = 0, l = spinner.lines; i < l; i++) {
                this.lines.push(this._loadEle(spinner, i, l))
              }
            } else if (spinner.circles) {
              for (let i = 0, l = spinner.circles; i < l; i++) {
                this.circles.push(this._loadEle(spinner, i, l))
              }
            }
            this.nameClass = `spinner-${name} spinner-${this.mode}-${name}`
          }
        }
      },
      _loadEle (spinner, index, total) {
        let duration = parseInt(this.duration) || spinner.dur
        let data = spinner.fn(duration, index, total)
        data.style['animation-duration'] = parseInt(duration) + 'ms'
        return data
      }

    },
    created () {
      this.isInit = true
      this.load()
    }
  }

  const SPINNERS = {
    ios: {
      dur: 1000,
      lines: 12,
      fn (dur, index, total) {
        const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms'
        return {
          y1: 17,
          y2: 29,
          style: {
            transform: transform,
            webkitTransform: transform,
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        }
      }
    },

    'ios-small': {
      dur: 1000,
      lines: 12,
      fn (dur, index, total) {
        const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms'
        return {
          y1: 12,
          y2: 20,
          style: {
            transform: transform,
            webkitTransform: transform,
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        }
      }
    },

    bubbles: {
      dur: 1000,
      circles: 9,
      fn (dur, index, total) {
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms'
        return {
          r: 5,
          style: {
            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        }
      }
    },

    circles: {
      dur: 1000,
      circles: 8,
      fn (dur, index, total) {
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms'
        return {
          r: 5,
          style: {
            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        }
      }
    },

    crescent: {
      dur: 750,
      circles: 1,
      fn (dur) {
        return {
          r: 26,
          style: {}
        }
      }
    },

    dots: {
      dur: 750,
      circles: 3,
      fn (dur, index, total) {
        const animationDelay = -(110 * index) + 'ms'
        return {
          r: 6,
          style: {
            left: (9 - (9 * index)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        }
      }
    }

  }
</script>
