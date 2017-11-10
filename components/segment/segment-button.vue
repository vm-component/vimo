<template>
    <div @click="onPointerDownHandler($event)" class="segment-button"
         :class="{'segment-activated':isSelected,'segment-button-disabled':isDisabled}">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Segment/SegmentButton
   * @description
   *
   * ## 小标签 / SegmentButton
   *
   * Segment组件的子组件SegmentButton, 两者配合使用, 属于嵌套关系.
   *
   * @props {String|Number} value - 当前SegmentButton的值, 如果父元素的value和这个相同, 这个当前被选中
   * @props {Boolean} [disabled=false] - 当前SegmentButton的禁用状态
   * @props {String} [mode='ios'] - 当前样式模式
   *
   * @slot 空 - 当前button的显示值, 如果没有提供value值, 建议不要嵌套过多的结构.
   *
   * @fires component:Segment#onSelect
   * @see component:Segment
   *
   * */
  import { isTrueProperty, isString, isPresent } from '../util/util'
  import componentIsMatch from '../util/componentIsMatch.js'

  const NOOP = () => {}

  export default {
    name: 'SegmentButton',
    inject: {
      recordChild: {
        from: 'recordChild',
        default: NOOP
      },
      onChildChange: {
        from: 'onChildChange',
        default: NOOP
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
      /**
       * 当前button的激活值
       * */
      value: [String, Number],
      disabled: Boolean,
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
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
      onPointerDownHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        this.onChildChange(this.theValue)
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
          let _value
          if (isPresent(this.value)) {
            // prop传入title值
            _value = this.value
            if (isString(this.value)) {
              _value = this.value.trim()
            }
          } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text) {
            // 如果是直接写在slot中的值
            _value = this.$slots.default[0].text.trim()
          } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].tag && this.$slots.default[0].children[0].text) {
            this.$slots.default.forEach((item) => {
              if (item.children && item.children.length > 0 && item.children[0] && item.children[0].text) {
                _value += item.children[0].text.trim()
              }
            })
          }
          return _value
        }
      }
    },
    created () {
        /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && !componentIsMatch(this.$parent, 'segment')) {
        console.error('The component of SegmentButton must combine with Segment component!')
        return
      }

      // let parent to record this comp
      this.recordChild(this)

      // define value
      this.theValue = this.getValue()
      this.setDisabled(this.disabled)

      this.isInit = true
    }
  }
</script>
