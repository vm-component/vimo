<template>
    <div class="vm-slide-box" :state="state">
        <div class="vm-slide-box-placeholder">{{placeholder}}</div>
        <div class="vm-slide-box-track" ref="slideBoxTrack" :style="{'transform':'translateX(-'+translateX+'px)'}">
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
<style lang="scss" src="./style.scss"></style>
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
   * import { SlideBox } from 'vimo'
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
  import { pointerCoord, clamp, transitionEnd } from '../../util/util'

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
