<template>
    <div class="ion-picker-cmp" :class="[modeClass,cssClass]">
        <vm-backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive"
                     :bdClick="bdClick"></vm-backdrop>
        <transition
                name="picker"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="picker-wrapper" v-show="isActive">
                <div class="picker-toolbar">
                    <div v-for="(b,index) in buttons"
                         :key="index"
                         class="picker-toolbar-button"
                         :class="[b.cssRole]">
                        <vm-button @click="btnClick(b)" :class="b.cssClass" class="picker-button" clear>{{b.text}}</vm-button>
                    </div>
                </div>
                <div class="picker-columns">
                    <div class="picker-above-highlight"></div>
                    <PickerCol v-for="(c,index) in columns"
                               :index="index"
                               :key="c.name"
                               :col="c"
                               @onChange="colChange"></PickerCol>
                    <div class="picker-below-highlight"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import { isNumber, isPresent, isString } from '../../util/type'
  import PickerCol from './picker-col.vue'
  import Backdrop from '../backdrop'
  import Button from '../button'
  import popupExtend from '../../util/popup-extend'

  export default {
    name: 'Picker',
    provide () {
      const _this = this
      return {
        pickerComponent: _this
      }
    },
    components: {'vm-backdrop': Backdrop, PickerCol, 'vm-button': Button},
    extends: popupExtend,
    data () {
      return {
        cols: [],               // 每列的数据
        timer: null,            // 计时器
        unreg: null             // 页面切换关闭组件的解绑函数
      }
    },
    props: {
      buttons: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      cssClass: String,
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      onChange: Function,
      onSelect: Function,
      onDismiss: Function
    },
    computed: {
      modeClass () {
        return `picker-${this.mode}`
      }
    },
    methods: {
      /**
       * 背景backdrop点击
       * @private
       * */
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          this.dismiss()
        }
      },
      /**
       * 标题左右的两个按钮点击(取消/确定)
       * @private
       * */
      btnClick (button) {
        if (!this.enabled) {
          return
        }

        let shouldDismiss = true

        if (button.handler) {
          // a handler has been provided, execute it
          // pass the handler the values from the inputs
          if (button.handler(this.getSelected()) === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        if (shouldDismiss) {
          this.dismiss(button.role)
        }
      },

      /**
       * 获取当前选择的值, 有多少列返回多少列的数据
       * @return {Array} selected - selected
       * @return {String} selected.text - text
       * @return {String} selected.value - value
       * @return {String} selected.columnIndex - columnIndex
       * @private
       * */
      getSelected () {
        let selected = {}
        this.columns.forEach((col, index) => {
          let selectedColumn = col.options[col.selectedIndex]
          selected[col.name] = {
            text: selectedColumn ? selectedColumn.text : null,
            value: selectedColumn ? selectedColumn.value : null,
            columnIndex: index
          }
        })
        return selected
      },

      /**
       * 当选择变化,对外发送事件
       * @private
       * */
      colChange (data) {
        // col发生变化时触发onSelect事件, 传递触发col的信息
        this.$emit('onSelect', data)
        this.onSelect && this.onSelect(data)

        // col发生变化, 则获取当前选中的整体数据, 触发onChange事件
        let selectedData = this.getSelected()
        this.$emit('onChange', selectedData)
        this.onChange && this.onChange(selectedData)
      },

      /**
       * data数据格式化
       *
       * PS: 在this.data原值上操作
       *
       * - this.buttons: 如果传入的string字符串数组, 则button的文本将是这个字符串
       * - this.buttons: 如过role定义了, 则加上cssRole: `picker-toolbar-${button.role}`
       * - columns -> column.options: 如果不是对象, 则将传入的值toString后转给text/value
       *
       * @private
       * */
      normalizeData () {
        // normalize the data
        this.buttons = this.buttons.map(button => {
          if (isString(button)) {
            return {text: button}
          }
          if (button.role) {
            // role: cancel / button
            button.cssRole = `picker-toolbar-${button.role}`
          }
          return button
        })

        // clean up dat data
        this.columns = this.columns.map(column => {
          if (!isPresent(column.options)) {
            column.options = []
          }
          // 取值必须>=0
          column.selectedIndex = Math.max(0, parseInt(column.selectedIndex))
          column.options = column.options.map(inputOpt => {
            // PickerColumnOption
            let opt = {
              text: '',
              value: '',
              disabled: inputOpt.disabled
            }

            if (isPresent(inputOpt)) {
              if (isString(inputOpt) || isNumber(inputOpt)) {
                opt.text = inputOpt.toString()
                opt.value = inputOpt
              } else {
                opt.text = isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value
                opt.value = isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text
              }
            }
            return opt
          })
          return column
        })
      },

      /**
       * 由子组件调用, 用于记录自己
       * @private
       * */
      recordChildComponent (childComponent) {
        this.cols.push(childComponent)
      },

      // ------- 动态添加数据接口 --------
      /**
       * 动态添加修改列数据时,对某一列数据修改并刷新显示
       * */
      resetColumn (index) {
        this.cols[index].reset()
      },

      /**
       * 如果设置的选中值与显示不一致, 使用这个刷新, 他会更新滚动位置
       * @private
       * */
      refresh () {
        this.cols.forEach(column => {
          column.refresh()
        })
      }
    },
    created () {
      this.normalizeData()
    },
    beforeMount () {
      // TODO: remove ion
      let pickerCmpElements = document.querySelectorAll('.ion-picker-cmp')
      if (pickerCmpElements.length > 0) {
        pickerCmpElements.forEach((ele) => {
          ele.remove()
          console.error('beforeMount find Picker opened!')
        })
      }
    }
  }
</script>
