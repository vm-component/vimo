<template>
    <div class="ion-radio" :class="[modeClass,colorClass,{'radio-disabled':isDisabled}]">
        <div class="radio-icon" :class="{'radio-checked':isChecked}">
            <div class="radio-inner"></div>
        </div>
        <vm-button role="radio" @click="onPointerDownHandler($event)"
                   type="button"
                   :id="id"
                   ion-button="item-cover"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<script type="text/javascript">
  import { setElementClass } from '../../util/util'
  import { isTrueProperty } from '../../util/type'
  import Button from '../button'

  let id = 0
  export default {
    name: 'Radio',
    components: {
      'vm-button': Button
    },
    inject: {
      itemComponent: {
        from: 'itemComponent',
        default: null
      },
      listComponent: {
        from: 'listComponent',
        default: null
      }
    },
    data () {
      return {
        isChecked: false,               // 内部 选中
        isDisabled: this.disabled,      // 内部 禁用
        radioGroupComponent: null,      // list(radioGroup)组件实例
        isInit: false,                  // 初始化状态
        id: `rb-${id++}`               // id
      }
    },
    props: {
      // 固定值
      value: String,
      disabled: Boolean,
      color: String,
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      }
    },
    watch: {
      disabled (val) {
        this.setDisabled(isTrueProperty(val))
      }
    },
    computed: {
      modeClass () {
        return `radio radio-${this.mode}`
      },
      colorClass () {
        return this.color ? (`radio-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      /**
       * 设置当前radio的禁用状态
       * */
      setDisabled (isDisabled) {
        this.setChecked(null)
        this.isDisabled = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-radio-disabled', isDisabled)
      },

      /**
       * 设置当前的radio的选中状态
       * */
      setChecked (checked) {
        let isChecked = (checked === this.value) && !this.isDisabled
        if (this.isChecked !== isChecked) {
          this.isChecked = isChecked
          this.isInit && this.isChecked && this.$emit('onSelect', this.value)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-checked', this.isChecked)
        }
      },

      /**
       * 当radio点击时
       * */
      onPointerDownHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        !this.isDisabled && this.radioGroupComponent && this.radioGroupComponent.onRadioChange(this.value)
      },

      /**
       * init
       * */
      init () {
        // 找到外部item实例
        if (this.itemComponent) {
          setElementClass(this.itemComponent.$el, 'item-radio', true)
        }

        // 找到外部List实例
        if (this.listComponent) {
          if (this.listComponent.radioGroup) {
            this.radioGroupComponent = this.listComponent
            this.radioGroupComponent.recordRadio(this)
          }
        }

        // 初始化禁用状态
        this.setDisabled(this.disabled)

        this.isInit = true
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
