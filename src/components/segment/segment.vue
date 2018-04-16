<template>
    <div class="ion-segment segment" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  import modeMixins from '../../mixins/mode-mixin/index.js'

  export default {
    name: 'Segment',
    mixins: [modeMixins],
    provide () {
      let _this = this
      return {
        segmentComponent: _this
      }
    },
    model: {
      prop: 'value',
      event: 'onChange'
    },
    props: {
      /**
       * 接收value信息
       * */
      value: [String, Number],
      disabled: Boolean
    },
    data () {
      return {
        // value的缓存值，因为props的value不能直接修改
        childComponents: [],
        theValue: this.value,
        timer: null
      }
    },
    watch: {
      value (value) {
        // 更新子组件状态
        this.$_refreshChildState(value)
      }
    },
    methods: {
      /**
       * 更新子组件状态
       * @private
       * */
      $_refreshChildState (value) {
        this.childComponents.forEach((childComponent) => {
          if (!childComponent.isDisabled) {
            childComponent.setState(value)
          }
        })
      },

      /**
       * 记录子组件, 这个由子组件自己找到并调用
       * @param {Object} childComponent - 子组件实例(子组件的this)
       * @private
       * */
      $_recordChild (childComponent) {
        this.childComponents.push(childComponent)
        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          // 更新子组件状态
          this.$_refreshChildState(this.value)
        }, 0)
      },

      /**
       * 子组件点击时操作此函数
       * @param {string} value - 当前子组件的点击值
       * @private
       * */
      $_onChildChange (value) {
        // 更新子组件状态
        this.$_refreshChildState(value)
        /**
         * @event component:Segment#onChange
         * @description 子元素 样式更新后发送onChange事件，并传入value变化值
         * @property {string} value - 滚动事件对象
         */
        this.$emit('onChange', value)
      }
    }
  }
</script>
