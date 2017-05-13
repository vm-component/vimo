<template>
    <div class="ion-picker-cmp" :class="[modeClass,cssClass]">
        <Backdrop :enableBackdropDismiss="true" :isActive="true" :bdClick="bdClick"></Backdrop>
        <!--<ion-backdrop (click)="bdClick()"></ion-backdrop>-->
        <div class="picker-wrapper" v-if="data">
            <div class="picker-toolbar">
                <div v-for="(b,index) in data.buttons"
                     :key="index"
                     class="picker-toolbar-button"
                     :class="[b.cssRole]">
                    <Button @click="btnClick(b)" :class="b.cssClass" class="picker-button" clear>
                        {{b.text}}
                    </Button>
                </div>
            </div>
            <div class="picker-columns">
                <div class="picker-above-highlight"></div>
                <PickerCol v-for="(c,index) in data.columns"
                           :index="index"
                           :key="c.name"
                           :col="c"
                           @onChange="colChange"></PickerCol>
                <div class="picker-below-highlight"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "./picker";
    @import "./picker.ios";
    @import "./picker.md";
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
   *
   * */
  import { Backdrop } from '../backdrop'
  import { Button } from '../button'
  import { isString, isPresent, isNumber } from '../../util/util'
  import PickerCol from './picker-col.vue'
  export default{
    name: 'Picker',
    data () {
      return {
        isActive: true,
        id: this._uid,
        enabled: true,
        lastClick: 0,

        dismissCallback: null,
        presentCallback: null,

        cols: [],  //  每列的数据
        timer: null
      }
    },
    props: {
      data: Object,
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      },
      cssClass: String,
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      data () {
        this.normalizeData()
      }
    },
    computed: {
      modeClass () {
        return `picker picker-${this.mode}`
      }
    },
    methods: {
      bdClick () {
        if (this.enabled && this.data.enableBackdropDismiss) {
          this.lastClick = Date.now()
          this.dismiss()
        }
      },

      dismiss () {
        this.isActive = false
        return new Promise((resolve) => { this.dismissCallback = resolve })
      },

      /**
       * 标题左右的两个按钮点击
       * */
      btnClick (button) {
        if (!this.enabled) {
          return
        }

        // keep the time of the most recent button click
        this.lastClick = Date.now()

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
       *
       * @return {Array} selected - selected
       * @return {String} selected.text - text
       * @return {String} selected.value - value
       * @return {String} selected.columnIndex - columnIndex
       * */
      getSelected () {
        let selected = {}
        this.data.columns.forEach((col, index) => {
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
       * */
      colChange (data, index) {
        this.$emit('onSelect', data, index)
        this.$emit('onChange', this.getSelected())
      },

      refresh () {
        this.cols.forEach(column => {
          column.refresh()
        })
      },

      /**
       * data数据格式化
       *
       * > 在this.data原值上操作
       *
       * - data.buttons: 如果传入的string字符串数组, 则button的文本将是这个字符串
       * - data.buttons: 如过role定义了, 则加上cssRole: `picker-toolbar-${button.role}`
       * - columns -> column.options: 如果不是对象, 则将其toString后转给text/value
       *
       * @private
       * */
      normalizeData () {
        // normalize the data
        let data = this.data
        data.buttons = data.buttons.map(button => {
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
        data.columns = data.columns.map(column => {
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

      recordChildComponent (childComponent) {
        this.cols.push(childComponent)
      }
    },
    created () {
      this.normalizeData()
    },
    mounted () {
    },
    activated () {},
    components: {Backdrop, PickerCol, Button}
  }
</script>
