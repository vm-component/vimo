<template>
    <div @click.prevent.stop="onPointerDownHandler()" class="segment-button"
         :class="{'segment-activated':isSelected,'segment-button-disabled':isDisabled}">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  import { isString, isTrueProperty } from '../../util/type'

  export default {
    name: 'SegmentButton',
    inject: {
      segmentComponent: {
        from: 'segmentComponent',
        default: null
      }
    },
    data () {
      return {
        theValue: null, // 当前环境的value副本
        isInit: false,
        isSelected: false, // 标志当前是否选中
        isDisabled: false
      }
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      disabled: Boolean
    },
    watch: {
      disabled (val) {
        this.setDisabled(isTrueProperty(val))
      }
    },
    methods: {
      /**
       * 设置当前组件的禁用状态
       * @private
       * */
      setDisabled (isDisabled) {
        this.setState(null)
        this.isDisabled = isDisabled
      },

      /**
       * 设置当前子组件选中状态
       * @private
       * */
      setState (stateValue) {
        let isSelected = (stateValue === this.theValue) && !this.isDisabled
        if (this.isSelected !== isSelected) {
          this.isSelected = isSelected
          /**
           * @event component:Segment#onSelect
           * @description 当子元素被点击选中的时触发
           * @property {string} value - 当前传入的值
           */
          this.isInit && this.isSelected && this.$emit('onSelect', this.theValue)
        }
      },

      /**
       * 子组件点击告知父组件
       * @private
       * */
      onPointerDownHandler () {
        this.segmentComponent && this.segmentComponent.$_onChildChange(this.theValue)
      },

      /**
       * @function getValue
       * @description
       * 获取组件的value值
       * @return {String}
       * @private
       * */
      getValue () {
        if (this.isInit) {
          return this.theValue
        } else {
          let _value = this.value
          if (isString(this.value)) {
            _value = this.value.trim()
          }
          return _value
        }
      }
    },
    created () {
      if (!this.segmentComponent) {
        throw new Error('SegmentButton need Segment as parent Component!')
      }
      // let parent to record this comp
      this.segmentComponent && this.segmentComponent.$_recordChild(this)

      // define value
      this.theValue = this.getValue()
      this.setDisabled(this.disabled)

      this.isInit = true
    }
  }
</script>
