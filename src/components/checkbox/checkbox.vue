<template>
    <div class="ion-checkbox" :class="[modeClass,colorClass,{'checkbox-disabled':disabledValue}]">
        <div class="checkbox-icon" :class="{'checkbox-checked':checkedValue}">
            <div class="checkbox-inner"></div>
        </div>
        <vm-button role="item-cover"
                   :mode="mode"
                   @click="onPointerDownHandler()"
                   type="button"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<script type="text/javascript">

  import { setElementClass } from '../../util/util'
  import Button from '../button'

  export default {
    name: 'Checkbox',
    inject: {
      itemComponent: {
        from: 'itemComponent',
        default: null
      }
    },
    components: {'vm-button': Button},
    data () {
      return {
        checkedValue: this.value,           // 内部维护的checked
        disabledValue: this.disabled,       // 内部维护的disabled
        init: false                        // 是否初始化
      }
    },
    props: {
      disabled: Boolean,
      value: Boolean,
      color: String,
      mode: {
        type: String,
        default () {
          return this.$config && this.$config.get('mode') || 'ios'
        }
      }
    },
    watch: {
      disabled (val) {
        this.setDisabled(val)
      },
      value (val) {
        this.setChecked(val)
      }
    },
    computed: {
      modeClass () {
        return `checkbox checkbox-${this.mode}`
      },
      colorClass () {
        return this.color ? (`checkbox-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      setChecked (isChecked) {
        if (isChecked !== this.checkedValue) {
          this.checkedValue = isChecked
          if (this.init) {
            /**
             * @event component:Checkbox#onChange
             * @description 点按选择时触发
             * @property {boolean} value - 当前值
             */
            this.$emit('onChange', this.checkedValue)
            this.$emit('input', this.checkedValue)
          }
          this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-checked', isChecked)
        }
      },
      setDisabled (isDisabled) {
        this.disabledValue = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-checkbox-disabled', isDisabled)
      },
      onPointerDownHandler () {
        this.setChecked(!this.checkedValue)
      }
    },
    mounted () {
      if (this.itemComponent) {
        setElementClass(this.itemComponent.$el, 'item-checkbox', true)
      }

      this.setChecked(this.value)
      this.setDisabled(this.disabled)

      this.init = true
    }
  }
</script>
