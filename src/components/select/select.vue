<template>
    <div class="ion-select" :class="[modeClass,{'select-disabled':isDisabled}]">
        <div v-if="!text" class="select-placeholder select-text">{{placeholder}}</div>
        <div v-else class="select-text">{{selectedText || text}}</div>
        <div class="select-icon">
            <div class="select-icon-inner"></div>
        </div>
        <button @click="onPointerDownHandler($event)"
                ref="button"
                role="select"
                :id="id"
                class="item-cover">
        </button>
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  import { setElementClass } from '../../util/util'
  import { isBlank, isCheckedProperty, isTrueProperty } from '../../util/type'
  import ActionSheet from '../action-sheet'
  import Alert from '../alert'

  let id = 0
  export default {
    name: 'Select',
    inject: {
      itemComponent: {
        from: 'itemComponent',
        default: null
      }
    },
    provide () {
      const _this = this
      return {
        selectComponent: _this
      }
    },
    data () {
      return {
        isDisabled: this.disabled,      // 内部 禁用
        id: `rb-${id++}`,               // id
        optionComponents: [],           // Select子组件Option的集合
        texts: [],                      // 回显的数组
        text: null,                     // 回显的string, 已texts为基
        timer: null,                    // setTimeout
        values: []                     // options中所有选中的value数组
      }
    },
    props: {
      // cancel按钮显示文本
      cancelText: {
        type: String,
        default: '取消'
      },
      // OK按钮显示文本
      okText: {
        type: String,
        default: '确认'
      },
      disabled: [Boolean],
      // 显示界面类型, 可以是'action-sheet','alert'两个
      interface: {
        type: String,
        default: 'alert',
        validator (val) {
          return ~[
            'alert',
            'action-sheet'
          ].indexOf(val)
        }
      },
      // 单选多选,默认为单选
      multiple: Boolean,
      // 当未选择时显示的值
      placeholder: String,
      // select组件掉用alert和action-sheet组件的, 这个是针对传入的参数
      // title/subTitle/message/cssClass/enableBackdropDismiss等
      selectOptions: {
        type: Object,
        default () { return {} }
      },
      // 选择组件的文本提示, 代替选择的option选项
      selectedText: String,
      // 模式
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      value: [Object, String, Array]
    },
    watch: {
      disabled (val) {
        this.setDisabled(isTrueProperty(val))
      }
    },
    computed: {
      modeClass () {
        return `select select-${this.mode}`
      },
      buttonElement () {
        return this.$refs.button
      }
    },
    methods: {
      /**
       * 设置当前radio的禁用状态
       * */
      setDisabled (isDisabled) {
        this.isDisabled = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-select-disabled', isDisabled)
      },

      /**
       * 点击组件时触发
       * */
      onPointerDownHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        this.open()
      },

      /**
       * 组件开启
       * */
      open () {
        var selectCssClass
        if (this.isDisabled) {
          return
        }
        console.debug('select, open alert')

        // 避免引用产生问题
        const selectOptions = JSON.parse(JSON.stringify(this.selectOptions))

        // 重新给buttons赋值
        selectOptions.buttons = [{
          text: this.cancelText,
          role: 'cancel',
          handler: () => {
            /**
             * @event component:Select#onCancel
             * @description 点击取消的时间
             */
            this.$emit('onCancel', null)
          }
        }]

        // 如果 selectOptions 没有提供title, 则使用Lable的文本
        if (!selectOptions.title && this.itemComponent) {
          selectOptions.title = this.itemComponent.getLabelText()
        }

        if (this.interface === 'action-sheet' && this.optionComponents.length > 6) {
          console.warn('Interface cannot be "action-sheet" with more than 6 options. Using the "alert" interface.')
          this.interface = 'alert'
        }

        if (this.interface === 'action-sheet' && this.multiple) {
          console.warn('Interface cannot be "action-sheet" with a multi-value select. Using the "alert" interface.')
          this.interface = 'alert'
        }

        if (this.interface === 'action-sheet') {
          selectOptions.buttons = selectOptions.buttons.concat(this.optionComponents.map(input => {
            return {
              role: (input.isChecked ? 'selected' : ''),
              text: input.label,
              handler: () => {
                this.onChange(input.optionValue)

                /**
                 * @event component:Select#onChange
                 * @description 值发生变化时触发
                 * @property {any} value - 变化值
                 */

                /**
                 * @event component:Select#onSelect
                 * @description 点击选择时触发
                 * @property {any} value - 变化值
                 */
                this.$emit('onChange', input.optionValue)
                this.$emit('input', input.optionValue)
                this.$emit('onSelect', input.optionValue)
              }
            }
          }))
          selectCssClass = 'select-action-sheet'

          // 允许用户自定义css样式
          selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : ''

          selectOptions.cssClass = selectCssClass

          // 初始化并开启
          ActionSheet.present(selectOptions)
        } else {
          this.interface = 'alert'
          // 从option中获取input参数
          selectOptions.inputs = this.optionComponents.map(input => {
            return {
              type: (this.multiple ? 'checkbox' : 'radio'),
              label: input.label,
              value: input.optionValue,
              checked: input.isChecked,
              disabled: input.disabled,
              handler: (selectedOption) => {
                // 点击选中时触发事件
                if (selectedOption.isChecked) {
                  this.$emit('onSelect', input.optionValue)
                }
              }
            }
          })

          selectCssClass = 'select-alert'

          if (this.multiple) {
            // 使用勾选框组件样式
            selectCssClass += ' multiple-select-alert'
          } else {
            // 使用单选框组件样式
            selectCssClass += ' single-select-alert'
          }

          // 允许用户自定义样式
          selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : ''
          selectOptions.cssClass = selectCssClass
          selectOptions.buttons.push({
            text: this.okText,
            handler: (selectedValues) => {
              this.onChange(selectedValues)
              this.$emit('onChange', selectedValues)
              this.$emit('input', selectedValues)
            }
          })

          // 初始化并开启
          Alert.present(selectOptions)
        }
      },

      /**
       * 当用户点击选择时
       * @private
       * */
      onChange (value) {
        console.debug('select, onChange value:', value)
        this.values = (Array.isArray(value) ? value : isBlank(value) ? [] : [value])
        this.updOpts()
      },

      /**
       * 更新子组件option的状态
       * @private
       * */
      updOpts () {
        this.texts = []
        if (this.optionComponents) {
          this.optionComponents.forEach(option => {
            // check this option if the option's value is in the values array
            option.isChecked = this.values.some(selectValue => {
              return isCheckedProperty(selectValue, option.optionValue)
            })
            if (option.isChecked) {
              this.texts.push(option.label)
            }
          })
        }
        this.text = this.texts.join(', ')
        console.debug('updOpts')
      },

      /**
       * 由子组件调用, 将自己的this传递给父组件
       * */
      recordOption (optionComponent) {
        this.optionComponents.push(optionComponent)
        if (isBlank(this.value)) {
          this.values = this.optionComponents.filter(o => o.isChecked).map(o => o.optionValue)
        }
        this.timer && window.clearTimeout(this.timer)
        // 保证只调用一次
        this.timer = window.setTimeout(() => {
          this.updOpts()
        }, 0)
      }
    },
    mounted () {
      // 找到外部item实例
      if (this.itemComponent) {
        setElementClass(this.itemComponent.$el, 'item-select', true)
      } else {
        // 如果不在item中的话, 则button填充满整个组件. 否则填充整个Item组件.
        this.$el.style.position = 'relative'
        this.buttonElement.style.cssText = 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: transparent;cursor: pointer;'
      }

      if (!isBlank(this.value)) {
        this.values.push(this.value)
      }
    }
  }
</script>
