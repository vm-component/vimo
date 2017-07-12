<template>
    <!--<div class="snakeBox">-->
    <div class="snakeBox" @click="handleClick">
        <div ref="bottom" class="snakeBox__bottom" :style="{height:`${lineWidth}px`}"></div>
        <div ref="left" class="snakeBox__left" :style="{width:`${lineWidth}px`}"></div>
        <div ref="top" class="snakeBox__top" :style="{height:`${lineWidth}px`}"></div>
        <div ref="right" class="snakeBox__right" :style="{width:`${lineWidth}px`}"></div>
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
    @import "snake-box.scss";
</style>
<script type="text/javascript">
  /**
   * @name 蛇形盒子
   *
   * @description
   *
   * 围绕外部像蛇一样转动的盒子, 且盒子只能是矩形的.
   *
   * 参数介绍:
   *
   * 开始的位置(startPosition)
   * 颜色(color)
   * 动画时间(duration)
   * 动画速率(radio)
   * 进入后自动触发(auto)
   * 延迟(delay)
   *
   * 盒子操作返回的对外事件:
   *
   * onSnakeBoxStarted: 点击盒子触发事件
   * onSnackBoxFinished: 点盒子, 动画完毕触发事件
   *
   * @props {Number} [trigger] - 改变一次值就出发一次动画, 可以使用random触发
   * @props {Boolean} [disableClick=false] - 静止点击触发动画
   * @props {Number} [lineWidth=3] - 默认的线宽
   * @props {String} [color='black'] - 定义snake的颜色, 支持red/#00FF00两个模式
   * @props {Number} [startPosition=20] - 开始的位置, 例如: 开始点为右下角向左20px的位置
   * @props {String} [initState='left'] - 初始化的位置, 可以是: 'left', 'right'
   * @props {Number} [duration=750] - 动画整体持续时间
   * @props {Number} [radio=0] - 宽高的时间比, 默认为宽高尺度比
   * @props {Boolean} [auto=false] - mounted之后自动触发
   * @props {Number} [delay=0] - 触发动画延迟执行
   *
   * */
  import Velocity from 'velocity-animate/velocity.js'
  import 'velocity-animate/velocity.ui.js'
  export default{
    name: 'SnakeBox',
    props: {
      /**
       * trigger改变一次就触发动画
       * */
      trigger: Number,
      /**
       * 静止点击触发动画
       * */
      disableClick: {
        type: Boolean,
        default: false
      },
      /**
       * 线宽, 默认是3, 单位为px
       * */
      lineWidth: {
        type: Number,
        default: 3
      },
      /**
       * 颜色, 支持red/#00FF00两个模式
       * */
      color: {
        type: String,
        default: 'black'
      },
      /**
       * 开始的位置,
       * 例如: 开始点为右下角向左20px的位置
       * */
      startPosition: {
        type: Number,
        default: 20
      },
      /**
       * 初始化的位置
       * left or right
       * */
      initState: {
        type: String,
        default: 'left'
      },
      /**
       * 动画整体持续时间
       * */
      duration: {
        type: Number,
        default: 750
      },
      /**
       * 宽高的时间比, 默认为宽高尺度比
       * */
      radio: {
        type: Number,
        default: 0
      },
      /**
       * mounted之后自动触发
       * */
      auto: {
        type: Boolean,
        default: false
      },
      /**
       * 触发动画延迟执行
       * */
      delay: {
        type: Number,
        default: 0
      }

    },
    data () {
      return {
        // DOM缓存
        _bottom: null,
        _left: null,
        _top: null,
        _right: null,

        isAnimate: false,
        reCalcRadio: this.radio,

        state: 'left', // 因为只有两个状态, left.在左边/right.在右边

        // 缓动函数
        startCubicBezier: [1, 0.01, 0.9, 0.73],
        middleCubicBezier: [0.31, 0.81, 0.4, 0.97],
        endCubicBezier: [0.15, 0.6, 0.27, 0.9]
      }
    },

    watch: {
      trigger () {
        this.goSnake()
      }
    },
    computed: {
      startPercent () {
        return this.startPosition + '%'
      },
      restPercent () {
        return (100 - this.startPosition) + '%'
      },
      widthDuration () {
        return this.duration * this.reCalcRadio / (this.reCalcRadio + 1)
      },
      heightDuration () {
        return this.duration / (this.reCalcRadio + 1)
      }
    },
    methods: {
      /**
       * init
       * */
      init () {
        const _this = this

        let dimension = _this.getBoxDimension()

        // if radio is zero, then use dimension radio
        if (parseInt(_this.reCalcRadio) === 0) {
          _this.reCalcRadio = dimension.w / dimension.h
        }

        // get Dom ele
        _this._bottom = _this.$refs.bottom
        _this._left = _this.$refs.left
        _this._top = _this.$refs.top
        _this._right = _this.$refs.right

        _this.setInitStyle(_this.initState)
      },

      /**
       * 设置初始化方向的样式
       * @param {string} direction -
       * */
      setInitStyle(direction){
        const _this = this
        if (direction === 'left') {
          _this._bottom.style.width = _this.restPercent
          _this._bottom.style.left = 0
          _this._bottom.style.backgroundColor = _this.color
          _this._left.style.height = '100%'
          _this._left.style.backgroundColor = _this.color
          _this._top.style.width = _this.startPercent
          _this._top.style.left = 0
          _this._top.style.backgroundColor = _this.color
          _this._right.style.height = '0%'
          _this._right.style.backgroundColor = _this.color
        } else {
          _this._bottom.style.width = _this.startPercent
          _this._bottom.style.right = 0
          _this._bottom.style.backgroundColor = _this.color
          _this._left.style.height = '0%'
          _this._left.style.backgroundColor = _this.color
          _this._top.style.width = _this.restPercent
          _this._top.style.right = 0
          _this._top.style.backgroundColor = _this.color
          _this._right.style.height = '100%'
          _this._right.style.backgroundColor = _this.color
        }

      },

      /**
       * 获取当前蛇形图的位置
       * */
      getState () {
        return parseInt(this._left.style.height) > 0 ? 'left' : 'right'
      },

      /**
       * 处理点击事件
       * */
      handleClick () {
        const _this = this

        if (_this.disableClick) return

        _this.goSnake()

      },

      /**
       * 动画执行
       **/
      goSnake () {
        const _this = this
        let sequenceBottom
        let sequenceTop
        let startPercent = _this.startPercent
        let restPercent = _this.restPercent

        if (_this.isAnimate) return
        _this.isAnimate = true
        window.setTimeout(function () {
          if (_this.getState() === 'left') {
            sequenceBottom = [
              {
                e: _this._bottom,
                p: {width: ['0%', restPercent]},
                o: {
                  begin () {
                    _this._bottom.style.left = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.startCubicBezier
                }
              },
              {
                e: _this._left,
                p: {height: ['0%', '100%']},
                o: {
                  begin () {
                    _this._bottom.style.left = 'inherit'
                    _this._left.style.top = 0
                  },
                  duration: _this.heightDuration,
                  easing: _this.middleCubicBezier
                }
              },
              {
                e: _this._top,
                p: {width: [restPercent, '100%']},
                o: {
                  begin () {
                    _this._top.style.right = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.endCubicBezier
                }
              }
            ]
            sequenceTop = [
              {
                e: _this._top,
                p: {width: ['100%', startPercent]},
                o: {
                  begin () {
                    _this._top.style.left = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.startCubicBezier
                }
              },
              {
                e: _this._right,
                p: {height: ['100%', '0%']},
                o: {
                  begin () {
                    _this._top.style.left = 'inherit'
                    _this._right.style.top = 0
                  },
                  duration: _this.heightDuration,
                  easing: _this.middleCubicBezier
                }
              },
              {
                e: _this._bottom,
                p: {width: [startPercent, '0%']},
                o: {
                  begin () {
                    _this._bottom.style.right = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.endCubicBezier,
                  complete(){
                    _this.isAnimate = false
                    _this.$emit('onSnackBoxFinished', _this.getState())
                  }
                }
              }
            ]
            Velocity.RunSequence(sequenceBottom)
            Velocity.RunSequence(sequenceTop)
          } else {
            sequenceBottom = [
              {
                e: _this._bottom,
                p: {width: ['100%', startPercent]},
                o: {
                  begin () {
                    _this._bottom.style.right = 0
                    _this._bottom.style.left = 'inherit'
                  },
                  duration: _this.widthDuration,
                  easing: _this.startCubicBezier
                }
              },
              {
                e: _this._left,
                p: {height: ['100%', '0%']},
                o: {
                  begin () {
                    _this._bottom.style.left = 'inherit'
                    _this._left.style.top = 'inherit'
                    _this._left.style.bottom = 0
                  },
                  duration: _this.heightDuration,
                  easing: _this.middleCubicBezier
                }
              },
              {
                e: _this._top,
                p: {width: [startPercent, '0%']},
                o: {
                  begin () {
                    _this._top.style.left = 0
                    _this._top.style.right = 'inherit'
                  },
                  duration: _this.widthDuration,
                  easing: _this.endCubicBezier
                }
              }
            ]
            sequenceTop = [
              {
                e: _this._top,
                p: {width: ['0%', restPercent]},
                o: {
                  begin () {
                    _this._top.style.right = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.startCubicBezier
                }
              },
              {
                e: _this._right,
                p: {height: ['0%', '100%']},
                o: {
                  begin () {
                    _this._top.style.right = 'inherit'
                    _this._right.style.top = 'inherit'
                    _this._right.style.bottom = 0
                  },
                  duration: _this.heightDuration,
                  easing: _this.middleCubicBezier
                }
              },
              {
                e: _this._bottom,
                p: {width: [restPercent, '100%']},
                o: {
                  begin () {
                    _this._right.style.bottom = 'inherit'
                    _this._bottom.style.right = 'inherit'
                    _this._bottom.style.left = 0
                  },
                  duration: _this.widthDuration,
                  easing: _this.endCubicBezier,
                  complete(){
                    _this._bottom.style.left = 'inherit'
                    _this.isAnimate = false
                    _this.$emit('onSnackBoxFinished', _this.getState())
                  }
                }
              }
            ]
            Velocity.RunSequence(sequenceBottom)
            Velocity.RunSequence(sequenceTop)
          }
        }, _this.delay)

        _this.$emit('onSnakeBoxStarted', _this.getState())
      },

      /**
       * 获取盒子的尺寸
       * */
      getBoxDimension () {
        const _this = this
        return {
          h: _this.$el.offsetHeight,
          w: _this.$el.offsetWidth
        }
      }
    },
    mounted () {
      this.init()
      if (this.auto) {
        this.handleClick()
      }
      let width = this.$slots.default[0].elm.style.width
      let height = this.$slots.default[0].elm.style.height
      this.$el.style.width = width
      this.$el.style.height = height
    }
  }
</script>
