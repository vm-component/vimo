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
                        <vm-button @click="btnClick(b)" :class="b.cssClass" class="picker-button" clear>{{b.text}}
                        </vm-button>
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
<style lang="less">
    @import "picker";
    @import "picker.ios.less";
    @import "picker.md.less";

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
   * @component Picker
   * @description
   *
   * ## 弹出层组件 / 单多列选择器Picker
   *
   * ### 简介
   *
   * Picker组件适用于单多列数据的选择, 这个不同于Select组件, Select组件只能做单类型数据的选择, 比如选择水果的话不能类别和新鲜度同时选择. 因此, 如果期望能进行城市三级选择, Picker能够解决这个需求, 详情参考Demo.
   *
   * ### 传参说明
   *
   * 因为Picker组件为了满足大多数的需求, 且能根据业务定制化, 比如被Datetime组件/CitySelect业务定制等. 因此Picker传参有点点麻烦. 主要参数如下:
   *
   *
   * #### 1. buttons属性
   *
   名称 / Name | 类型 / Type | 描述 / Description
   ----------|-----------|--------------------------------
   text      | string    | 显示的文本
   role      | string    | 按钮的角色, 取消按钮的role为cancel, 其他的没有
   handler   | function  | 点击按钮的处理方法
   *
   * #### 2. columns属性
   *
   名称 / Name     | 类型 / Type          | 描述 / Description
   --------------|--------------------|---------------------------
   name          | string             | 这个column的名称
   align         | string             | column对齐方式
   selectedIndex | number             | 当前column的初始选的位置(index)
   prefix        | string             | 这一列显示的前缀
   prefixWidth   | string             | 前缀固定宽度, 例如'50px'
   suffix        | string             | 这一列显示的后缀
   suffixWidth   | string             | 后缀固定宽度, 例如'50px'
   cssClass      | string             | 当前column的自定义样式, 使用空格分割多个值
   columnWidth   | string             | 每个column的最大宽度, 默认宽度均分
   optionsWidth  | string             | 每个column中的选项最大宽度
   options       | PickerColumnOption | 当前column的每个选项列表
   *
   *
   * #### 3. columns属性中的options属性
   *
   名称 / Name | 类型 / Type | 描述 / Description
   ----------|-----------|------------------
   text      | string    | 显示的文本
   value     | *         | 对显示文本的值
   disabled  | boolean   | 是否禁用
   *
   *
   * #### 4. onChange钩子
   *
   * 当用户选定后触发钩子, 传递的数据包括三列的详细选择信息.
   *
   * #### 5. onSelect钩子
   *
   * 某一列选择之后触发, 包含单列的选择信息
   *
   * ### 组件自动支持切换alipay组件
   *
   * 如果强制使用H5模式需要在开启options中传入`isH5=true`, alipay组件只支持最多两级且不可联动.
   *
   * ### 如何使用
   *
   * 因为是弹出层组件, 故引入后, `Picker.present(...)`就可打开组件
   *
   * ```
   *  import Picker from 'vimo/lib/picker'
   * ```
   *
   * @demo #/picker
   * */
  import { isString, isPresent, isNumber, urlChange } from '../util/util'
  import PickerCol from './picker-col.vue'
  import Backdrop from '../backdrop'
  import Button from '../button/index'
  import * as appComponentManager from '../util/appComponentManager'

  const NOOP = () => {}

  export default {
    name: 'Picker',
    data () {
      return {
        isActive: false,        // 控制当前组件的激活状态
        enabled: true,          // 是否不在动画中(是否为可行为状态)

        dismissCallback: NOOP,  // 关闭的回调
        presentCallback: NOOP,  // 打开的回调

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
        return `picker-${this.mode}`
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
       * @function present
       * @param {object} options - 传入参数
       * @param {Object} options.buttons - 组件初始化的button数据
       * @param {Array} options.columns - 组件初始化的column数据
       * @param {String} options.column.name - 组件初始化的column数据
       * @param {String} options.columns.align - 组件初始化的column数据
       * @param {String} [options.mode='ios'] - 模式
       * @param {String} [options.cssClass] - 样式
       * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否能关闭
       * @param {Function} [options.onChange=noop] - picker数据变化时触发, 某一个col变化也触发, 返回最新值
       * @param {Function} [options.onSelect=noop] - 某一列发生变化时触发
       * @description
       * 开启
       * */
      present () {
        this.isActive = true
        // add to App Component
        appComponentManager.addChild(this)
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭
       * */
      dismiss () {
        if (this.isActive) {
          this.isActive = false
          this.unreg && this.unreg()
          this.onDismiss && this.onDismiss()
          // remove from App Component
          appComponentManager.removeChild(this)
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
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

      // dismissOnPageChange
      if (this.dismissOnPageChange) {
        this.unreg = urlChange(() => {
          this.isActive && this.dismiss()
        })
      }
    },
    beforeMount () {
      let pickerCmpElements = document.querySelectorAll('.ion-picker-cmp')
      if (pickerCmpElements.length > 0) {
        pickerCmpElements.forEach((ele) => {
          ele.remove()
          console.error('beforeMount find Picker opened!')
        })
      }
    },
    components: {'vm-backdrop': Backdrop, PickerCol, 'vm-button': Button}
  }
</script>
