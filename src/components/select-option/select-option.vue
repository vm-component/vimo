<template>
    <span :value="value" :label="label" :disabled="disabled" :checked="checked"></span>
</template>
<script type="text/javascript">
  /**
   * @component Select/SelectOption
   * @description
   *
   * ## 表单组件 / SelectOption选择组件
   *
   * @demo #/select
   **/
  import { isBlank } from '../../util/type'

  export default {
    name: 'SelectOption',
    inject: {
      selectComponent: {
        from: 'selectComponent',
        default: null
      }
    },
    data () {
      return {
        label: null,                // 获取标签
        isChecked: this.checked,    // check内部记录值
        optionValue: this.value     // value内部记录值
      }
    },
    props: {
      value: [Object, String, Array],
      disabled: Boolean,
      text: String,
      checked: Boolean
    },
    methods: {
      getText () {
        if (this.text) {
          return this.text.trim()
        } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text) {
          return this.$slots.default[0].text.trim()
        } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].tag && this.$slots.default[0].children[0].text) {
          let tmpStr = ''
          this.$slots.default.forEach((item) => {
            if (item.children && item.children.length > 0 && item.children[0] && item.children[0].text) {
              tmpStr += item.children[0].text.trim()
            }
          })
          return tmpStr
        }
        return ''
      }
    },
    created () {
      this.label = this.getText()
      if (this.selectComponent) {
        this.selectComponent.recordOption(this)
      }

      if (isBlank(this.optionValue)) {
        this.optionValue = this.label
      }
    }
  }
</script>
