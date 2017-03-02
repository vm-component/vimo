<template>
  <div class="snakeBox" @click="handleClick">
    <div ref="bottom" class="snakeBox__bottom"></div>
    <div ref="left" class="snakeBox__left"></div>
    <div ref="top" class="snakeBox__top"></div>
    <div ref="right" class="snakeBox__right"></div>
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
  @import "snake-box.scss";
</style>
<script type="text/ecmascript-6">
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
   * 进入后自动触发(animateAfterMounted)
   * 延迟(delay)
   *
   *
   * 盒子操作返回的对外事件:
   *
   * onSnakeBoxStarted: 点击盒子触发事件
   * onSnackBoxFinished: 点盒子, 动画完毕触发事件
   *
   * */
  import  'velocity';
  import  'velocity.ui';
  import { getStyle } from '../../util/dom'
  export default{
    name: 'SnakeBox',
    props: {
      /**
       * 颜色
       * */
      color: {
        type: String,
        default: 'red',
      },
      /**
       * 开始的位置,
       * 例如: 开始点为右下角向左20px的位置
       * */
      startPosition: {
        type: Number,
        default: 20,
      },

      /**
       * 动画整体持续时间
       * */
      duration: {
        type: Number,
        default: 750,
      },

      /**
       * 宽高的时间比, 默认为宽高尺度比
       * */
      radio: {
        type: Number,
        default: 0,
      },

      /**
       * mounted之后自动触发
       * */
      animateAfterMounted: {
        type: Boolean,
        default: false,
      },

      /**
       *  触发动画延迟执行
       * */
      delay: {
        type: Number,
        default: 0,
      }

    },
    data(){
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
        endCubicBezier: [0.15, 0.6, 0.27, 0.9],

      }
    },

    watch: {},
    computed: {
      startPercent(){
        return this.startPosition + '%'
      },
      restPercent(){
        return (100 - this.startPosition) + '%'
      },
      widthDuration(){
        return this.duration * this.reCalcRadio / (this.reCalcRadio + 1)
      },
      heightDuration(){
        return this.duration / (this.reCalcRadio + 1)
      },
    },
    methods: {
      /**
       * init
       * */
      init(){
        const _this = this;

        let dimension = _this.getBoxDimension();

        // if radio is zero, then use dimension radio
        if (parseInt(_this.reCalcRadio) === 0) {
          _this.reCalcRadio = dimension.w / dimension.h;
        }

        // get Dom ele
        _this._bottom = _this.$refs.bottom;
        _this._left = _this.$refs.left;
        _this._top = _this.$refs.top;
        _this._right = _this.$refs.right;

        // set init style
        _this._bottom.style.width = _this.restPercent;
        _this._bottom.style.left = 0;
        _this._bottom.style.backgroundColor = _this.color;
        _this._left.style.height = '100%';
        _this._left.style.backgroundColor = _this.color;
        _this._top.style.width = _this.startPercent;
        _this._top.style.left = 0;
        _this._top.style.backgroundColor = _this.color;
        _this._right.style.height = '0%';
        _this._right.style.backgroundColor = _this.color;

      },

      /**
       * 获取当前蛇形图的位置
       * */
      getState(){
        return parseInt(this._left.style.height) > 0 ? 'left' : 'right'
      },

      /**
       * 处理点击事件
       * */
      handleClick(){
        const _this = this;
        if (_this.isAnimate) return;
        _this.isAnimate = true;
        setTimeout(function () {
          _this.circleGo()
        }, _this.delay)
        _this.$emit('onSnakeBoxStarted', _this.getState());
      },

      circleGo(){
        const _this = this;
        let sequenceBottom;
        let sequenceTop;
        let startPercent = _this.startPercent;
        let restPercent = _this.restPercent;

        if (_this.getState() === 'left') {
          sequenceBottom = [
            {
              e: _this._bottom,
              p: {width: ['0%', restPercent]},
              o: {
                begin () {
                  _this._bottom.style.left = 0;
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
                  _this._bottom.style.left = 'inherit';
                  _this._left.style.top = 0;
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
                  _this._top.style.right = 0;
                },
                duration: _this.widthDuration,
                easing: _this.endCubicBezier,
              }
            },
          ];
          sequenceTop = [
            {
              e: _this._top,
              p: {width: ['100%', startPercent]},
              o: {
                begin () {
                  _this._top.style.left = 0;
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
                  _this._top.style.left = 'inherit';
                  _this._right.style.top = 0;
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
                  _this._bottom.style.right = 0;
                },
                duration: _this.widthDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this.isAnimate = false;
                  _this.$emit('onSnackBoxFinished', _this.getState());
                }
              }
            },
          ];
          Velocity.RunSequence(sequenceBottom);
          Velocity.RunSequence(sequenceTop);
        } else {
          sequenceBottom = [
            {
              e: _this._bottom,
              p: {width: ['100%', startPercent]},
              o: {
                begin () {
                  _this._bottom.style.right = 0;
                  _this._bottom.style.left = 'inherit';
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
                  _this._bottom.style.left = 'inherit';
                  _this._left.style.top = 'inherit';
                  _this._left.style.bottom = 0;
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
                  _this._top.style.left = 0;
                  _this._top.style.right = 'inherit';
                },
                duration: _this.widthDuration,
                easing: _this.endCubicBezier,
              }
            },
          ];
          sequenceTop = [
            {
              e: _this._top,
              p: {width: ['0%', restPercent]},
              o: {
                begin () {
                  _this._top.style.right = 0;
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
                  _this._top.style.right = 'inherit';
                  _this._right.style.top = 'inherit';
                  _this._right.style.bottom = 0;
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
                  _this._right.style.bottom = 'inherit';
                  _this._bottom.style.right = 'inherit';
                  _this._bottom.style.left = 0;
                },
                duration: _this.widthDuration,
                easing: _this.endCubicBezier,
                complete(){
                  _this._bottom.style.left = 'inherit';
                  _this.isAnimate = false;
                  _this.$emit('onSnackBoxFinished', _this.getState());
                }
              }
            },
          ];
          Velocity.RunSequence(sequenceBottom);
          Velocity.RunSequence(sequenceTop);
        }
      },

      /**
       * 获取盒子的尺寸
       * */
      getBoxDimension(){
        const _this = this;
        return {
          h: parseInt(getStyle(_this.$el, 'height')),
          w: parseInt(getStyle(_this.$el, 'width')),
        }
      },
    },
    mounted () {
      this.init();
    }
  }
</script>
