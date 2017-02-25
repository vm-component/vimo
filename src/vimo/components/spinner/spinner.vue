<template>
  <div class="spinner" :class=[colorClass,nameClass,pausedClass]>
    <svg v-if="!!circles && circles.length>0" viewBox="0 0 64 64" v-for="i in circles" :style="i.style">
      <circle :r="i.r" transform="translate(32,32)"></circle>
    </svg>
    <svg v-if="!!lines && lines.length>0" viewBox="0 0 64 64" v-for="i in lines" :style="i.style">
      <line :y1="i.y1" :y2="i.y2" transform="translate(32,32)"></line>
    </svg>
  </div>
</template>
<style scoped lang="scss">
  @import './spinner';
  @import './spinner.ios';
  @import './spinner.md';
  @import './spinner.wp';

</style>
<script type="text/ecmascript-6">

  const SPINNERS = {

    ios: {
      dur: 1000,
      lines: 12,
      fn (dur, index, total) {
        const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)';
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms';
        return {
          y1: 17,
          y2: 29,
          style: {
            transform: transform,
            webkitTransform: transform,
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        };
      }
    },

    'ios-small': {
      dur: 1000,
      lines: 12,
      fn (dur, index, total) {
        const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)';
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms';
        return {
          y1: 12,
          y2: 20,
          style: {
            transform: transform,
            webkitTransform: transform,
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        };
      }
    },

    bubbles: {
      dur: 1000,
      circles: 9,
      fn (dur, index, total) {
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms';
        return {
          r: 5,
          style: {
            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        };
      }
    },

    circles: {
      dur: 1000,
      circles: 8,
      fn (dur, index, total) {
        const animationDelay = -(dur - ((dur / total) * index)) + 'ms';
        return {
          r: 5,
          style: {
            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        };
      }
    },

    crescent: {
      dur: 750,
      circles: 1,
      fn (dur) {
        return {
          r: 26,
          style: {}
        };
      }
    },

    dots: {
      dur: 750,
      circles: 3,
      fn (dur, index, total) {
        const animationDelay = -(110 * index) + 'ms';
        return {
          r: 6,
          style: {
            left: (9 - (9 * index)) + 'px',
            animationDelay: animationDelay,
            webkitAnimationDelay: animationDelay
          }
        };
      }
    }

  };

  export default{
    name: 'Spinner',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * mode 按钮平台 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },

      /**
       * name 按钮风格
       * ios/ios-small/bubbles/circles/crescent/dots
       * */
      name: {
        type: String,
        default: null,
      },

      /**
       * duration 持续时间
       * */
      duration: {
        type: String,
        default: null,
      },

      /**
       * paused 是否暂停
       * */
      paused: {
        type: Boolean,
        default: false,
      }

    },
    data() {
      return {
        isInit: false,

        /**
         * svg动画数组
         */
        lines: [],
        circles: [],

        /**
         * ios/ios-small/bubbles/circles/crescent/dots
         * */
        nameClass: null,
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
        return !!this.color ? `spinner-${this.mode}-${this.color}` : null
      },
      // 设置Alert的风格
      modeClass () {
        return !!this.mode ? `spinner-${this.mode}` : null
      },
      pausedClass () {
        return !!this.paused ? "spinner-paused" : null
      }
    },
    methods: {
      load () {
        const _this = this;
        if (_this.isInit) {

          // 因为会涉及到再次渲染，故提前制空
          _this.lines = [];
          _this.circles = [];

          // 如果指定了name，则使用指定的name。
          // 如果没指定name，则根据设备别使用默认的name
          let name;
          if (!!_this.name) {
            name = _this.name;
          } else {
            if (_this.mode === 'ios') {
              name = 'ios';
            } else if (_this.mode === 'md') {
              name = 'crescent';
            } else if (_this.mode === 'wp') {
              name = 'circles';
            } else {
              name = VM.config.get('spinner', 'ios');
            }
          }
          const spinner = SPINNERS[name];

          if (spinner) {
            if (spinner.lines) {
              for (let i = 0, l = spinner.lines; i < l; i++) {
                _this.lines.push(this._loadEle(spinner, i, l));
              }

            } else if (spinner.circles) {
              for (let i = 0, l = spinner.circles; i < l; i++) {
                _this.circles.push(this._loadEle(spinner, i, l));
              }
            }
            _this.nameClass = `spinner-${name} spinner-${_this.mode}-${name}`;
          }
        }

      },
      _loadEle(spinner, index, total) {
        let duration = parseInt(this.duration) || spinner.dur;
        let data = spinner.fn(duration, index, total);
        data.style['animation-duration'] = parseInt(duration) + 'ms';
        return data;
      }

    },
    created () {
      this.isInit = true;
      this.load();
    }
  }
</script>
