<template>
    <div class="vm-scroll-segment">
        <div class="scroll-segment-outer" ref="scrollSegmentOuter">
            <div class="scroll-segment-wrap" ref="scrollSegmentWrap">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .vm-scroll-segment {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .scroll-segment-outer {
            overflow-x: scroll;
            overflow-y: hidden;
            position: relative;
            height: calc(100% + 10px);
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        .scroll-segment-wrap {
            display: inline-flex;
            height: 100%;
            flex-direction: row;
            flex-wrap: nowrap;
            /*background: #333;*/
        }
    }
</style>
<script type="text/javascript">
  /**
   * @props {String} [activeClass] - button被选中的样式
   * */
  import { clamp } from '../../util/util'
  export default{
    name: 'ScrollSegment',
    data () {
      return {
        min: 0,
        max: 0,
        rafId: null,
        childComponents: [], // 子组件列表
        wrapRect: null, // 滚动部分的尺寸
        contentRect: null // 当前组件盒子的尺寸
      }
    },
    props: {
      activeClass: {
        type: String,
        default: 'segment-button-active'
      },
      // 选中的index, 而不是子组件的_uid
      value: {
        type: Number,
        default: 0
      }
    },
    watch: {
      value (val, oldValue) {
        let selectedComponent = this.childComponents[val]
        if (selectedComponent) {
          this.refresh(selectedComponent._uid, selectedComponent.rect)
        } else {
          this.$emit('input', oldValue)
        }
      }
    },
    computed: {
      outerElement () {
        return this.$refs.scrollSegmentOuter
      },
      wrapElement () {
        return this.$refs.scrollSegmentWrap
      }
    },
    methods: {
      /**
       * 记录组组件
       * @private
       * */
      record (childComponent) {
        this.childComponents.push(childComponent)
      },

      /**
       * 子组件调用, 刷新组件的位置
       * @param {String} id - id
       * @param {Object} rect - rect
       * @param {Number} rect.height - rect.height
       * @param {Number} rect.width - rect.width
       * @param {Number} rect.right - rect.right
       * @param {Number} rect.left - rect.left
       * @param {Number} rect.top - rect.top
       * @param {Number} rect.bottom - rect.bottom
       * */
      refresh (id, rect) {
        window.cancelAnimationFrame(this.rafId)

        // 设置子组件的class状态
        for (let i = 0, len = this.childComponents.length; len > i; i++) {
          let child = this.childComponents[i]
          child.setState(id)
          if (id === child._uid) {
            this.$emit('input', i)
          }
        }

        let contentWidth = this.contentRect.width
        let contentLeft = this.contentRect.left

        let itemWidth = rect.width
        let itemLeft = rect.left - contentLeft

        let target = itemLeft - contentWidth / 2 + itemWidth / 2
        // 滚动的实际值, 必须在最大最小值之间(warp的滚动最大最小值)
        target = clamp(this.min, target, this.max)

        // 调整scrollLeft的位置
        const step = () => {
          let speed = 6 // 惯性速度
          let now = this.outerElement.scrollLeft
          let to = Math.floor((now - target) / speed)
          this.outerElement.scrollLeft = now - to

          // 如果距离不为零, 继续调用迭代本函数
          // 如果页面没被激活则不进行动画
          if (Math.abs(to) > 0) {
            this.rafId = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(this.rafId)
          }
        }

        // 边界检查
        if (target < this.min) {
          target = this.min
        }
        if (target > this.max) {
          target = this.max
        }
        this.rafId = window.requestAnimationFrame(step)
      }
    },
    mounted () {
      // 获取当前组件的尺寸及距离页面的位置
      // height/width right/left/top/bottom
      this.contentRect = this.outerElement.getBoundingClientRect()
      this.wrapRect = this.wrapElement.getBoundingClientRect()

      // 边界
      this.min = 0
      this.max = this.wrapRect.width - this.contentRect.width

      // 初始化时确定初始选中的位置
      let selectedComponent = this.childComponents[this.value]
      this.childComponents.forEach((child) => {
        child.setState(selectedComponent._uid)
      })
      let target = selectedComponent.rect.left - this.contentRect.left - this.contentRect.width / 2 + selectedComponent.rect.width / 2
      this.outerElement.scrollLeft = clamp(this.min, target, this.max)

      // 隐藏scrollbar
      let height = this.$el.getBoundingClientRect().height
      this.$el.style.height = height + 'px'
      this.wrapElement.style.height = height + 'px'
    }
  }
</script>
