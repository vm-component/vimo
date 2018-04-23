<template>
    <div class="vm-scroll wrapper">
        <div class="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
  import JsScroll from 'better-scroll'
  import props from './props'

  export default {
    name: 'Scroll',
    data () {
      return {
        jsScrollInstance: null
      }
    },
    props: props,
    methods: {
      initEvent () {
        // 滚动开始之前触发
        this.jsScrollInstance.on('beforeScrollStart', (ev) => {
          this.$emit('beforeScrollStart', ev)
        })
        // 滚动时触发
        this.jsScrollInstance.on('scrollStart', (ev) => {
          this.$emit('scrollStart', ev)
        })
        // 滚动时触发
        this.jsScrollInstance.on('scroll', (ev) => {
          this.$emit('scroll', ev)
        })
        // 取消滚动时触发
        this.jsScrollInstance.on('scrollCancel', (ev) => {
          this.$emit('scrollCancel', ev)
        })
        // 滚动结束时触发
        this.jsScrollInstance.on('scrollEnd', (ev) => {
          this.$emit('scrollEnd', ev)
        })
        // 手指移开屏幕时触发
        this.jsScrollInstance.on('touchEnd', (ev) => {
          this.$emit('touchEnd', ev)
        })
        // 触发了 fastclick 时的回调函数
        this.jsScrollInstance.on('flick', (ev) => {
          this.$emit('flick', ev)
        })
        // 当 better-scroll 刷新时触发
        this.jsScrollInstance.on('refresh', (ev) => {
          this.$emit('refresh', ev)
        })
        // 销毁 better-scroll 实例时触发
        this.jsScrollInstance.on('destroy', (ev) => {
          this.$emit('destroy', ev)
        })
      }
    },
    mounted () {
      // 初始化实例
      let propsData = JSON.parse(JSON.stringify(this.$options.propsData))
      this.jsScrollInstance = new JsScroll(this.$el, propsData)
      this.initEvent()
    },
    destroyed () {
      this.jsScrollInstance.destroy()
    }
  }
</script>
