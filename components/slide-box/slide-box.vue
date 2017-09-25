<template>
    <div class="vm-slideBox" :state="state">
        <div class="vm-slideBox-placeholder">{{placeholder}}</div>
        <div class="vm-slideBox-track" ref="slideBoxTrack" :style="{'transform':'translateX(-'+translateX+'px)'}">
            <div class="track-background">
                <span v-if="state === 'checking'">{{checkingText}}</span>
                <span v-if="state === 'completing'">{{completeText}}</span>
                <span v-if="state === 'failing'">{{failText}}</span>
            </div>
            <!--按钮-->
            <div class="track-btn" ref="slideBoxBtn"
                 @touchstart="onPointerStartHandler($event)"
                 @mousedown="onPointerStartHandler($event)"
                 @touchmove="onPointerMoveHandler($event)"
                 @mousemove="onPointerMoveHandler($event)"
                 @touchend="onPointerEndHandler($event)"
                 @mouseup="onPointerEndHandler($event)">
                <i class="icon-arrow-right"
                   v-if="state === 'inactive' || state === 'sliding' || state === 'cancelling'"></i>
                <i class="icon-ok" v-if="state === 'completing'"></i>
                <i class="icon-error" v-if="state === 'failing'"></i>
                <i class="icon-refresh" v-if="state === 'checking'"></i>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @green: #78c430;
    @red: #ef4644;
    .vm-slideBox {
        position: relative;
        height: 52px;
        box-shadow: 0 0 3px #999;
        background-color: #ddd;
        overflow: hidden;
        .vm-slideBox-placeholder {
            background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-animation: slidetounlock 3s infinite;
            -webkit-text-size-adjust: none;
            line-height: 52px;
            height: 52px;
            text-align: center;
            font-size: 16px;
            display: block;
            width: 100%;
            color: #aaa;
            @keyframes slidetounlock {
                0% {
                    background-position: -200px 0
                }
                100% {
                    background-position: 200px 0
                }
            }
        }
        .vm-slideBox-track {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;

            .track-background {
                line-height: 52px;
                height: 52px;
                text-align: center;
                font-size: 16px;
                color: #fff;
                width: 100%;
            }
            .track-btn {
                position: absolute;
                right: 0;
                top: 0;
                width: 52px;
                height: 52px;
                cursor: pointer;
                opacity: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fff;
                .icon-arrow-right {
                    width: 20px;
                    height: 20px;
                    background: #fff url(images/arrow.png) no-repeat center center/20px 20px;
                }
                .icon-ok {
                    width: 20px;
                    height: 20px;
                    background: #fff url(images/ok.png) no-repeat center center/20px 20px;
                }
                .icon-error {
                    width: 20px;
                    height: 20px;
                    background: #fff url(images/error.png) no-repeat center center/20px 20px;
                }
                .icon-refresh {
                    width: 20px;
                    height: 20px;
                    background: #fff url(images/refresh.png) no-repeat center center/20px 20px;
                    animation: revolve 2s linear infinite;
                }
                @keyframes revolve {
                    from {
                        -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                    }

                    to {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }

    .vm-slideBox[state="inactive"],
    .vm-slideBox[state="sliding"],
    .vm-slideBox[state="checking"],
    .vm-slideBox[state="cancelling"],
    .vm-slideBox[state="completing"] {
        .vm-slideBox-track {
            .track-background {
                background-color: @green;
            }
        }
    }

    .vm-slideBox[state="failing"] {
        .vm-slideBox-track {
            .track-background {
                background-color: @red;
            }
        }
    }

    .vm-slideBox[state="cancelling"] {

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            pointer-events: none;
        }

        .vm-slideBox-track {
            transition: transform ease 500ms;
            will-change: transform;
        }
    }

</style>
<script type="text/javascript">
  /**
   * @component SlideBox
   * @description
   *
   * ## 滑动验证组件 / SlideBox
   *
   * ### 介绍
   *
   * 这是一个仿照淘宝注册的一个验证组件, 向右滑动到底部意味着用户确认协议可以继续向下进行. 组件一共有以下几种状态, 且状态只能维持其一, 且一下状态的切换由业务自己控制:
   *
   *  - checking
   *  - cancelling
   *  - completing
   *  - failing
   *
   *
   * 下面是组件的全部状态, 同一时间只能保持一个
   *
   * - inactive     // 初始状态
   * - sliding      // 滑动状态
   * - checking     // 正在验证
   * - cancelling   // 释放状态
   * - completing   // 验证通过状态
   * - failing      // 验证失败状态
   *
   * ### 如何引入
   * ```
   * // 引入
   * import SlideBox from 'vimo/lib/slide-box'
   * // 安装
   * Vue.component(SlideBox.name, SlideBox)
   * // 或者
   * export default{
   *   components: {
   *     SlideBox
   *  }
   * }
   * ```
   *
   * ### 如果获取组件实例
   *
   * - 通过ref标记获取
   * - 监听组件的`onSlideEnd`事件, 事件传递组件实例
   *
   *
   * @demo #/slide-box
   * @fires component:SlideBox#onSlideEnd
   * @usage
   *
   * <p>向右滑动进入验证状态, 1s后重置</p>
   * <SlideBox @onSlideEnd="onSlideEndHandler"></SlideBox>
   *
   * methods: {
   *    // 向右滑动进入验证状态, 4s后重置
   *    onSlideEndHandler (ins) {
   *      ins.checking()
   *      setTimeout(() => {
   *        ins.cancel()
   *      }, 1000)
   *    },
   *  }
   *
   * */
  import { pointerCoord, clamp, transitionEnd } from '../util/util'

  const STATE_INACTIVE = 'inactive'         // 初始状态
  const STATE_SLIDING = 'sliding'           // 滑动状态
  const STATE_CHECKING = 'checking'         // 正在验证
  const STATE_CANCELLING = 'cancelling'     // 释放(取消)状态
  const STATE_COMPLETING = 'completing'     // 验证通过状态
  const STATE_FAILING = 'failing'           // 验证失败状态
  export default {
    name: 'SlideBox',
    data () {
      return {
        timer: null,            // 计时器
        unReg: null,            // 动画完毕的解绑函数
        min: 0,                 // 可移动的最小距离
        max: 0,                 // 可移动的最大距离

        translateX: null,       // 向右移动数值
        state: STATE_INACTIVE // 初始状态
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '向右滑动验证'
      },
      checkingText: {
        type: String,
        default: '正在验证'
      },
      completeText: {
        type: String,
        default: '验证通过'
      },
      failText: {
        type: String,
        default: '验证失败'
      }
    },
    watch: {},
    computed: {
      slideBoxTrackElement () {
        return this.$refs.slideBoxTrack
      },
      slideBoxBtnElement () {
        return this.$refs.slideBoxBtn
      }
    },
    methods: {
      // ------ public ------
      /**
       * @function cancel
       * @description
       * 验证取消, 滑动到底部
       * */
      cancel () {
        this.state = STATE_CANCELLING
        this.translateX = this.max

        // 从两个维度判断, 状态必须变更
        this.timer = window.setTimeout(() => {
          this.unReg && this.unReg()
          this.$nextTick(() => {
            this.state = STATE_INACTIVE
          })
        }, 500)

        this.unReg = transitionEnd(this.slideBoxTrackElement, () => {
          this.timer && window.clearTimeout(this.timer)
          this.$nextTick(() => {
            this.state = STATE_INACTIVE
          })
        })
      },

      /**
       * @function checking
       * @description
       * 进入验证状态
       * */
      checking () {
        this.state = STATE_CHECKING
      },

      /**
       * @function complete
       * @description
       * 验证完成
       * */
      complete () {
        this.state = STATE_COMPLETING
      },

      /**
       * @function fail
       * @description
       * 验证失败, 等待2s后重置
       * */
      fail () {
        this.state = STATE_FAILING
      },

      // ------ private------
      onPointerStartHandler ($event) {
        if (this.state !== STATE_INACTIVE) return
        $event.preventDefault()
        this.state = STATE_SLIDING
        let coord = pointerCoord($event)
        this.pointerStart = coord.x - this.slideBoxBtnElement.getBoundingClientRect().left
      },
      onPointerMoveHandler ($event) {
        if (this.state !== STATE_SLIDING) return
        $event.preventDefault()
        let coord = pointerCoord($event)
        let left = coord.x - this.$el.offsetLeft - this.pointerStart >> 0
        this.translateX = this.max - clamp(this.min, left, this.max)
        if (this.translateX === this.min) {
          this.$emit('onSlideEnd', this)
        }
      },
      onPointerEndHandler () {
        if (this.state !== STATE_SLIDING) return
        if (this.translateX === this.min) {
          /**
           * @event component:SlideBox#onSlideEnd
           * @description 滚动到最右侧时触发
           * @property {VueComponent} this - 组件实例
           */
          this.$emit('onSlideEnd', this)
        } else {
          this.cancel()
        }
      }
    },
    mounted () {
      let boxWidth = parseInt(window.getComputedStyle(this.$el).width)
      let btnWidth = parseInt(window.getComputedStyle(this.slideBoxBtnElement).width)
      this.translateX = this.max = boxWidth - btnWidth >> 0
    }
  }

</script>
