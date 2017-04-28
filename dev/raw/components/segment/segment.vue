<template>
    <div class="ion-segment segment" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import './segment.scss';
    @import './segment.ios.scss';
    @import './segment.md.scss';
</style>
<script>
  /**
   * @component Segment
   * @description
   *
   * ## 小标签 / Segment
   *
   * Segment组件可以说是联动的按钮组合, 他不负责路由, 只是按钮组合而已. 如果涉及路由, 请使用Tab组件.
   *
   * ### 父子组件组合
   *
   * Segment组件和SegmentButton组件是互相组合的模式, 不可分离. 父组件可使用`v-model`指令监听子组件当前的选中状态.
   *
   * ### 异步加载子组件
   *
   * 父组件通过被动的的方式获取对子组件的控制权, 便于异步动态初始化子组件的情形. 子组件的value是子组件的标示, 当value没有值时, 通过SegmentButton组件中的text内容获取唯一标示.
   *
   * @props {String} color - 颜色
   * @props {String} mode - 样式模式
   *
   * @fires component:Segment#onChange
   * @demo http://xiangsongtao.com/vimo/#/segment
   *
   *
   * @usage
   * 123123
   * */
  export default{
    name: 'Segment',
    props: {
      /**
       * 接收value信息
       * */
      value: [String],
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String],
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
    },
    data () {
      return {
        // value的缓存值，因为props的value不能直接修改
        parentVal: this.value
      }
    },
    watch: {
      // 监听传入值的变化，修改父元素的缓存值
      value (val) {
        this.parentVal = val;
      },
      // 缓存之变动后，进行子元素样式更新
      parentVal () {
        this.setChildrenSelectState();
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `segment-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`segment-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {
      /**
       * 子元素样式更新，
       * 更新后发送onChange事件，并传入parentVal变化值
       * */

      /**
       * @event component:Segment#onChange
       * @description 子元素 样式更新后发送onChange事件，并传入parentVal变化值
       * @property {string} value - 滚动事件对象
       */
      setChildrenSelectState () {
        this.$children.forEach((child) => {
          child.isSelected = (child.value === this.parentVal)
        })
        this.$emit('onChange', this.parentVal)
        this.$emit('input', this.parentVal)
      }
    },
    mounted () {
      this.setChildrenSelectState();
    }
  }
</script>
