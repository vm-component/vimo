<template>
    <div class="ion-list" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: 'List',
    provide () {
      const _this = this
      return {
        listComponent: _this
      }
    },
    data () {
      return {
        // -------- Radio --------
        radioComponentList: [],
        isSendOut: false,
        timer: null
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * shouldEnable whether the item-sliding should be enabled or not
       * */
      sliding: Boolean,

      // -------- Radio --------
      radioGroup: Boolean,
      value: String,
      disabled: Boolean
    },
    watch: {
      value (val) {
        if (this.isSendOut) {
          this.isSendOut = false
        } else {
          this.radioComponentList.forEach((radioComponent) => {
            if (!radioComponent.isDisabled) {
              radioComponent.setChecked(val)
            }
          })
        }
      },
      disabled (isDisabled) {
        if (this.radioGroup) {
          this.disableAllRadio(isDisabled)
          this.onRadioChange(null)
        }
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `list-${this.mode}`
      }
    },
    methods: {

      // -------- Radio --------
      /**
       * radio组件点击时执行这个命令
       * @private
       * */
      onRadioChange (value) {
        this.radioComponentList.forEach((radioComponent) => {
          if (!radioComponent.isDisabled) {
            radioComponent.setChecked(value)
          }
        })
        this.isSendOut = true
        /**
         * @event component:List#onChange
         * @description Radio组件数值变化时触发
         * @property {*} value - 变化值
         */
        this.$emit('input', value)
        this.$emit('onChange', value)
      },

      /**
       * 禁用全部radio
       * @private
       * */
      disableAllRadio (isDisable) {
        this.radioComponentList.forEach((radioComponent) => {
          radioComponent.setDisabled(isDisable)
        })
      },

      /**
       * 让radio组件记录自己
       * @private
       * */
      recordRadio (radioComponent) {
        this.radioComponentList.push(radioComponent)

        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          this.radioComponentList.forEach((radioComponent) => {
            if (!radioComponent.isDisabled) {
              radioComponent.setChecked(this.value)
            }
          })
        }, 0)
      }
    },
    mounted () {
      // -------- Radio --------
      // 内部定义了Radio组件
      if (this.radioGroup) {
        this.disableAllRadio(this.disabled)
      }
    }
  }
</script>
