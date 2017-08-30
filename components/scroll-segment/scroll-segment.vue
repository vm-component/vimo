<template>
    <div class="vm-scroll-segment">
        <div class="scroll-segment-outer" ref="scrollSegmentOuter">
            <div class="scroll-segment-wrap" ref="scrollSegmentWrap">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component ScrollSegment
   * @description
   *
   * ## 滑动片段组件 / ScrollSegment
   *
   * ### 介绍
   *
   * 该组件提供了一个可横向滚动的盒子, 子组件`ScrollSegmentButton`作为每一项在其中可滚动. 比如用在横向的Segment选择, 比如网易新闻的不同新闻类别;或者电影的横向滚动清单等. 当点击某一个`ScrollSegmentButton`子组件时, 该组件滚动到中间. 需要注意的是, 该组件提供水平方向的滚动, 且子组件的长度并不是固定的, 任意长度都能点击后移动到中间.
   *
   *
   * ### v-model控制初始值
   *
   * 通过v-model控制初始值, 当值发生变化时, 组件也能同步更新位置. 如果设置的值超过子组件的数量边界(0 -> length-1), 则设置的值不生效.
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { ScrollSegment, ScrollSegmentButton } from 'vimo/lib/scroll-segment'
   * // 安装
   * Vue.component(ScrollSegment.name, ScrollSegment)
   * Vue.component(ScrollSegmentButton.name, ScrollSegmentButton)
   * // 或者
   * export default{
   *   components: {
   *     ScrollSegment, ScrollSegmentButton
   *  }
   * }
   * ```
   *
   * @props {String} [activeClass='segment-button-active'] - 子组件激活时添加的class
   * @props {Number} [value=0] - 子组件初始值
   *
   * @demo #/scroll-segment
   * @usage
   *
   * <ScrollSegment :value="2">
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">鱼香肉丝</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">红烧狮子头</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">卷了三个鸡蛋的煎饼果子</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">新疆烤肉和香酥烤全羊</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">土家酱饼</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">杭椒牛柳</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">鸡蛋灌饼</div>
   *    </ScrollSegmentButton>
   *    <ScrollSegmentButton>
   *        <div class="srollSegmentButton">超级辣的BT变态烤翅</div>
   *    </ScrollSegmentButton>
   *     <ScrollSegmentButton>
   *        <div class="srollSegmentButton">啤酒</div>
   *    </ScrollSegmentButton>
   * </ScrollSegment>
   *
   * */
  import { clamp } from '../util/util'
  export default{
    name: 'ScrollSegment',
    data () {
      return {
        isInit: false,
        timer: null,

        min: 0,
        max: 0,
        rafId: null,
        childComponents: [],        // 子组件列表
        wrapRect: null,             // 滚动部分的尺寸
        contentRect: null          // 当前组件盒子的尺寸
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
          // 如果没有子组件对应则返回上一个值
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
        console.assert(!this.isInit, 'ScrollSegment组件为异步组件, 且因为机制问题只能异步一次, 如果场景特殊请使用v-if关闭组件后再开启. ')
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          if (!this.isInit) {
            this.init()
          }
          this.isInit = true
        }, 0)
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
       * @private
       * */
      refresh (id, rect) {
        window.cancelAnimationFrame(this.rafId)
        this.rafId = null

        // fixBug: 弹性滚动时不触发refresh
        if (this.outerElement.scrollLeft < 0 || this.outerElement.scrollLeft > (this.outerElement.scrollWidth - this.outerElement.offsetWidth)) {
          return
        }

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
            this.rafId = null
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
      },

      /**
       * 初始化
       * @private
       * */
      init () {
        // 获取当前组件的尺寸及距离页面的位置
        // width left
        this.contentRect = {
          left: this.outerElement.offsetLeft,
          width: this.outerElement.offsetWidth
        }

        this.wrapRect = {
          left: this.wrapElement.offsetLeft,
          width: this.wrapElement.offsetWidth
        }

        // 边界
        this.min = 0
        this.max = this.wrapRect.width - this.contentRect.width

        // 初始化时确定初始选中的位置
        let selectedComponent = this.childComponents[this.value]
        this.childComponents.forEach((child) => {
          child.setState(selectedComponent._uid)
        })

        let target = selectedComponent.rect.left - this.contentRect.width / 2 + selectedComponent.rect.width / 2
        this.outerElement.scrollLeft = clamp(this.min, target, this.max)

        // 隐藏scrollbar
        let height = this.$el.getBoundingClientRect().height
        this.$el.style.minHeight = height + 'px'
        this.wrapElement.style.minHeight = height + 'px'
      }
    },
    mounted () {

    }
  }
</script>
<style lang="less">
    .vm-scroll-segment {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .scroll-segment-outer {
            overflow-x: scroll;
            overflow-y: hidden;
            position: relative;
            // for hide scroll bar
            height: ~'calc(100% + 10px)';
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        .scroll-segment-wrap {
            display: inline-flex;
            flex-direction: row;
            flex-wrap: nowrap;
            // for hide scroll bar
            height: ~'calc(100% - 10px)';
        }
    }
</style>