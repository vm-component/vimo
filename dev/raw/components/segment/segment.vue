<template>
    <div class="ion-segment segment" :class="[modeClass,colorClass]">
        <slot ref="demo"></slot>
    </div>
</template>
<style lang="scss">
    @import './segment.scss';
    @import './segment.ios.scss';
    @import './segment.md.scss';
</style>
<script>
  /**
   * @component Component/Segment
   * @description
   *
   * Segment组件, 父子组件通过slot的关系套在一起, 建议直接修改$parent及$children的值进行, 而不是通过事件. 因为中间
   * 隔了一层slot, 这个事件传递就过不去了, 且也不能单独向上向下传递, 故在父组件的this中直接操作是唯一方法.
   *
   * @property {String} value - 这个是v-model中设置的值,表示那个btn被选中,响应式的
   * @property {String} color - 颜色
   * @property {String} mode - 样式模式
   *
   *
   * @fires onChange - 被选中的事件, 发送当前被选中的值
   *
   * */
  export default{
    name: 'Segment',
    props: {
      /**
       * 接收value信息
       * */
      value: {
        type: String,
        default: ''
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: ''
      },
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
