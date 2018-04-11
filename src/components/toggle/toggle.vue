<template>
    <div class="ion-toggle"
         :class="[modeClass,colorClass,{'toggle-disabled':isDisabled},{'toggle-checked':isChecked,'toggle-activated':activated}]"
         @mousedown="pointStart($event)"
         @touchstart="pointStart($event)"
         @mouseup="pointEnd($event)"
         @touchend="pointEnd($event)"
         @click="clickHandler($event)">
        <div class="toggle-icon">
            <div class="toggle-inner"></div>
        </div>
        <button role="checkbox"
                type="button"
                ion-button="item-cover"
                :id="id"
                class="item-cover">
        </button>
    </div>
</template>
<script type="text/javascript">
  import { setElementClass } from '../../util/util'
  export default {
    name: 'Toggle',
    inject: {
      itemComponent: {
        from: 'itemComponent',
        default: null
      }
    },
    data () {
      return {
        isChecked: this.value,      // 选中状态
        isDisabled: this.disabled,  // 禁用状态
        activated: false,
        id: this._uid,
        init: false                 // 是否初始化
      }
    },
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: ''
      },

      /**
       * 是否被禁
       * */
      disabled: {
        type: Boolean,
        default: false
      },

      // 内部值
      value: {
        type: Boolean,
        default: false
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
      // 环境样式
      modeClass () {
        return `toggle toggle-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`toggle-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {

      // -------- private --------
      pointStart () {
        this.activated = true
      },
      pointEnd () {
        this.activated = false
      },
      clickHandler () {
        this.setChecked(!this.isChecked)
      },

      /**
       * 设置为被点击状态
       * @param {boolean} isChecked
       */
      setChecked (isChecked) {
        if (isChecked !== this.isChecked) {
          this.isChecked = isChecked
          if (this.init) {
            /**
             * @event component:Toggle#onChange
             * @description Toggle组件切换时发出的事件, 传递当前的选中状态
             * @property {Boolean} isChecked - 是否选中
             */
            this.$emit('onChange', isChecked)
            this.$emit('input', isChecked)
          }

          this.setItemCheckedClass(isChecked)
        }
      },
      setItemCheckedClass (isChecked) {
        this.itemComponent && this.itemComponent.$el && setElementClass(this.itemComponent.$el, 'item-toggle-checked', isChecked)
      },

      /**
       * 设置禁用状态
       * @param {boolean} isDisabled
       */
      setDisabled (isDisabled) {
        if (isDisabled !== this.isDisabled) {
          this.isDisabled = isDisabled
          this.setItemDisabledClass(isDisabled)
        }
      },
      setItemDisabledClass (isDisabled) {
        this.itemComponent && this.itemComponent.$el && setElementClass(this.itemComponent.$el, 'item-toggle-disabled', isDisabled)
      }
    },
    mounted () {
      if (this.itemComponent) {
        setElementClass(this.itemComponent.$el, 'item-toggle', true)
        this.setItemCheckedClass(this.isChecked)
        this.setItemDisabledClass(this.isDisabled)
      }

      this.setChecked(this.value)
      this.setDisabled(this.disabled)

      this.init = true
    }
  }
</script>
