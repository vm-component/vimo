<template>
    <div class="ion-picker-cmp" :class="[modeClass,cssClass]">
        <Backdrop :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive" :bdClick="bdClick"></Backdrop>
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
                        <Button @click="btnClick(b)" :class="b.cssClass" class="picker-button" clear>{{b.text}}</Button>
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
<style lang="scss">
    @import "./picker.scss";
    @import "./picker.ios.scss";
    @import "./picker.md.scss";

    // transitioName = 'picker'
    .picker-enter-active, .picker-leave-active {
        transform: translateY(0%);
    }

    .picker-enter, .picker-leave-active {
        transform: translateY(100%);
    }
</style>
<script type="text/javascript">
  /**
   *
   * ## button的role
   *
   * 这个只能是 'cancel'
   *
   *
   *
   * data的数据结构
   *
   export interface PickerOptions {
  buttons?: any[];
  columns?: PickerColumn[];
  cssClass?: string;
  enableBackdropDismiss?: boolean;
}

   export interface PickerColumn {
  name?: string;
  align?: string;
  selectedIndex?: number;
  prefix?: string;
  suffix?: string;
  options?: PickerColumnOption[];
  cssClass?: string;
  columnWidth?: string;
  prefixWidth?: string;
  suffixWidth?: string;
  optionsWidth?: string;
}

   export interface PickerColumnOption {
  text?: string;
  value?: any;
  disabled?: boolean;
}
   *
   *
   *
   *
   * @props {Object} buttons - 组件初始化的数据
   * @props {Object} columns - 组件初始化的数据
   * @props {String} [mode='ios'] - 模式
   * @props {String} [cssClass] - 样式
   * @props {Boolean} [enableBackdropDismiss=true] - 点击backdrop是否能关闭
   * @props {Function} [onChange=noop] - picker数据变化时触发, 某一个col变化也触发, 返回最新值
   * @props {Function} [onSelect=noop] - 某一列发生变化时触发
   *
   *
   * @fires onChange
   * @fires onSelect
   * */
  import { isString, isPresent, isNumber, hashChange } from '../../util/util'
  import PickerCol from './picker-col.vue'
  import { Backdrop } from '../backdrop'
  import { Button } from '../button'
  export default{
    name: 'Picker',
    data () {
      return {
        isActive: false,        // 控制当前组件的激活状态
        enabled: true,          // 是否不在动画中(是否为可行为状态)

        dismissCallback: null,  // 关闭的回调
        presentCallback: null,  // 打开的回调

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
        default () { return this.$config.get('mode') || 'ios' }
      },
      cssClass: String,
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      dismissOnPageChange: {
        type: Boolean,
        default: true
      },
      onChange: Function,
      onSelect: Function,
      onDismiss: Function
    },
    computed: {
      modeClass () {
        return `picker picker-${this.mode}`
      }
    },
    methods: {
      /**
       * Component Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this.enabled = true
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

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
       * 开启
       * @private
       * */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * 关闭
       * @private
       * */
      dismiss () {
        this.isActive = false
        this.unreg && this.unreg()
        this.onDismiss && this.onDismiss()
        return new Promise((resolve) => { this.dismissCallback = resolve })
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
          // column.selectedIndex = 0
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

      // dismissOnPageChange
      if (this.dismissOnPageChange) {
        this.unreg = hashChange(() => {
          this.isActive && this.dismiss()
        })
      }
    },
    beforeMount () {
      let pickerCmpElements = document.querySelectorAll('.ion-picker-cmp')
      if (pickerCmpElements.length > 0) {
        pickerCmpElements.forEach((ele) => {
          ele.remove()
        })
      }
    },
    components: {Backdrop, PickerCol, Button}
  }
</script>
