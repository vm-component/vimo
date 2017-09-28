<template>
    <div class="ion-select" :class="[modeClass,{'select-disabled':isDisabled}]">
        <div v-if="!text" class="select-placeholder select-text">{{placeholder}}</div>
        <div v-else class="select-text">{{selectedText || text}}</div>
        <div class="select-icon">
            <div class="select-icon-inner"></div>
        </div>
        <button @click="onPointerDownHandler($event)"
                ref="button"
                :id="id"
                class="item-cover">
        </button>
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "select";
    @import "select.ios.less";
    @import "select.md.less";
</style>
<script type="text/javascript">
  /**
   * @name Select
   * @component Select
   * @description
   *
   * ## 表单组件 / Select选择组件
   *
   * ### 说明
   *
   * 如果在Select中使用了`v-model`指令时, Option中的`checked`属性将不起作用, 因为两者的使用逻辑是冲突的!
   *
   * `v-model`是在Select组件中使用数据控制, 而`checked`是在Option中使用checked属性控制.
   *
   * ### 数据源
   *
   * 使用此组件建议使用固定数据而不是异步数据, 异步数据使用Alert组件完成.
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Select, SelectOption } from 'vimo/lib/select'
   * // 安装
   * Vue.component(Select.name, Select)
   * Vue.component(Option.name, SelectOption)
   * // 或者
   * export default{
   *   components: {
   *     Select, SelectOption
   *  }
   * }
   * ```
   * @props {String} [cancelText='取消'] - cancel按钮显示文本
   * @props {String} [cancelText='确认'] - OK按钮显示文本
   * @props {Boolean} [disabled='false'] - OK按钮显示文本
   * @props {String} [interface='alert'] - 显示界面类型, 可以是'action-sheet','alert'两个
   * @props {Boolean} [multiple='false'] - 单选多选,默认为单选
   * @props {String} [placeholder] - 当未选择时显示的值
   * @props {Object} [selectOptions] - select组件掉用alert和action-sheet组件的, 这个是针对传入的参数 title/subTitle/message/cssClass/enableBackdropDismiss等
   * @props {String} [selectedText] - 选择组件的文本提示, 代替选择的option选项
   * @props {String} [mode='ios'] - 模式
   * @props {Object|String|Array} [value='ios'] - 组件值
   *
   * @fires component:Select#onChange
   * @fires component:Select#onCancel
   * @fires component:Select#onSelect
   *
   * @demo #/select
   *
   * @usage
   * <Item>
   *    <Label>Gender</Label>
   *    <Select item-right placeholder="Select" interface="alert"
   *            @ onChange="onChange"
   *            @ onSelect="onSelect"
   *            @ onCancel="onCancel">
   *        <Option value="f" checked>Female</Option>
   *        <Option value="m">Male</Option>
   *    </Select>
   * </Item>
   * */
  import { setElementClass, isTrueProperty, isBlank, isCheckedProperty } from '../util/util'
  import ActionSheet from '../action-sheet'
  import Alert from '../alert'

  let id = 0
  export default {
    name: 'Select',
    data () {
      return {
        isDisabled: this.disabled,      // 内部 禁用
        id: `rb-${id++}`,               // id
        itemComponent: null,            // item组件实例
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
        default () { return '取消' }
      },
      // OK按钮显示文本
      okText: {
        type: String,
        default () { return '确认' }
      },
      disabled: [Boolean],
      // 显示界面类型, 可以是'action-sheet','alert'两个
      interface: {
        type: String,
        default () { return 'alert' }
      },
      // 单选多选,默认为单选
      multiple: [Boolean],
      // 当未选择时显示的值
      placeholder: [String],
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
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
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
