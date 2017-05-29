<template>
    <div class="vm-slideBox" :state="state">
        <div class="vm-slideBox-placeholder">{{placeholder}}</div>

        <!--绿色背景-->
        <div class="vm-slideBox-track" :style="{'width':left+'px'}">
            <div class="track-green" v-if="boxRect" :style="{'width':boxRect.width+'px'}">
                <span v-if="state === 'inactive' || state === 'sliding' ||state === 'cancelling'"> {{placeholder}}</span>
                <span v-if="state === 'checking'">{{checkingText}}</span>
                <span v-if="state === 'completing'">{{completeText}}</span>
                <span v-if="state === 'failing'">{{failText}}</span>
            </div>
        </div>

        <!--按钮-->
        <div class="vm-slideBox-btn" :style="{'transform':'translateX('+left+'px)'}"
             ref="slideBoxBtn"
             @touchstart="onPointerStartHandler($event)"
             @touchmove="onPointerMoveHandler($event)"
             @touchend="onPointerEndHandler($event)"
        >
            <i class="icon-arrow-right"
               v-if="state === 'inactive' || state === 'sliding' || state === 'cancelling'"></i>
            <i class="icon-ok" v-if="state === 'completing'"></i>
            <i class="icon-error" v-if="state === 'failing'"></i>
            <i class="icon-refresh" v-if="state === 'checking'"></i>

        </div>
    </div>
</template>
<style lang="scss">
    $completeColor: #78c430;
    $failColor: #ef4644;
    .vm-slideBox {
        position: relative;
        height: 52px;
        box-shadow: 0 0 3px #999;
        background-color: #ddd;
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
            width: 0;
            overflow: hidden;
            .track-green {
                line-height: 52px;
                height: 52px;
                text-align: center;
                font-size: 16px;
                background-color: $completeColor;
                color: #fff;
                width: 100%;
            }
        }
        .vm-slideBox-btn {
            position: absolute;
            left: 0;
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
                background: #fff url(./images/arrow.png) no-repeat center center/20px 20px;
            }
            .icon-ok {
                width: 20px;
                height: 20px;
                background: #fff url(./images/ok.png) no-repeat center center/20px 20px;
            }
            .icon-error {
                width: 20px;
                height: 20px;
                background: #fff url(./images/error.png) no-repeat center center/20px 20px;
            }
            .icon-refresh {
                width: 20px;
                height: 20px;
                background: #fff url(./images/refresh.png) no-repeat center center/20px 20px;
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

    .vm-slideBox[state="failing"] {
        .vm-slideBox-track {
            .track-green {
                background-color: $failColor;
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
            transition: width ease 500ms;
            will-change: width;
        }
        .vm-slideBox-btn {
            transition: transform ease 500ms;
            will-change: transform;
        }

    }
</style>
<script type="text/javascript">
  /**
   *
   *
   * 组件的状态, 同一时间只能保持一个
   *
   * - inactive     // 初始状态
   * - sliding      // 滑动状态
   * - checking     // 正在验证
   * - cancelling   // 释放状态
   * - completing   // 验证通过状态
   * - failing      // 验证失败状态
   *
   *
   * */
  import { pointerCoord, clamp, transitionEnd } from '../../util/util'
  const STATE_INACTIVE = 'inactive'         // 初始状态
  const STATE_SLIDING = 'sliding'           // 滑动状态
  const STATE_CHECKING = 'checking'         // 正在验证
  const STATE_CANCELLING = 'cancelling'     // 释放(取消)状态
  const STATE_COMPLETING = 'completing'     // 验证通过状态
  const STATE_FAILING = 'failing'           // 验证失败状态
  export default{
    name: 'name',
    data () {
      return {
        min: 0,             // 可移动的最小距离
        max: 0,             // 可移动的最大距离

        left: null,         // 向右移动数值

        isReleasing: false,    // 当前输入btn释放状态

        state: STATE_INACTIVE, // 初始状态

        boxRect: null,      // 外容器的尺寸数据
        btnRect: null       // 初始化时的btn的尺寸
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '向右滑动验证'
        // 请按住滑块,拖动到最右边
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
      slideBoxBtnElement () {
        return this.$refs.slideBoxBtn
      }
    },
    methods: {
      // ------ public ------

      /**
       * 验证取消, 滑动到底部
       * */
      cancel () {
        this.state = STATE_CANCELLING
        this.left = 0
        transitionEnd(this.slideBoxBtnElement, () => {
          this.$nextTick(() => {
            this.state = STATE_INACTIVE
          })
        })
      },

      /**
       * 进入验证状态
       * */
      checking () {
        this.state = STATE_CHECKING

      },

      /**
       * 验证完成
       * */
      complete () {
        this.state = STATE_COMPLETING
      },

      /**
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
        let left = coord.x - this.boxRect.left - this.pointerStart
        this.left = clamp(this.min, left, this.max)
      },
      onPointerEndHandler () {
        if (this.state !== STATE_SLIDING) return
        if (this.left === this.max) {
          this.$emit('onSlideEnd', this)
        } else {
          this.cancel()
        }
      }
    },
    created () {},
    mounted () {
      this.boxRect = this.$el.getBoundingClientRect()
      this.btnRect = this.slideBoxBtnElement.getBoundingClientRect()
      this.max = this.boxRect.width - this.btnRect.width
    },
    activated () {},
    components: {}
  }
</script>
