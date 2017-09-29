<template>
    <div class="ion-datetime" @click="clickHandler($event)"
         :displayFormat="displayFormat"
         :pickerFormat="pickerFormat"
         :min="min"
         :max="max">
        <div v-if="!text" class="datetime-text datetime-placeholder">{{placeholder}}</div>
        <div v-if="text" class="datetime-text">{{text}}</div>
        <vm-button type="button"
                   :id="_uid"
                   role="item-cover"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<style lang="less">
    @import "datetime";
    @import "datetime.ios.less";
    @import "datetime.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Datetime
   * @description
   *
   * ## 时间组件 / Datetime时间选择组件
   *
   * ### 简介
   * Datetime组件是对Picker组件的再封装, 这个和Select组件对Alert组件的封装类似. Datetime组件用于替代原生input[type="datetime"]的解决方案, 且功能比原生更丰富. 支持单列~多列时间的选择/固定时间范围/固定时间的选择间隔等.
   *
   * ### 感谢Ionic
   *
   * 该组件是对Ionic的Datetime组件的转义, 具体使用和Ionic的datetime完全一致. API参考下方链接.
   *
   * ### 改进部分
   * Ionic原组件值对符合ISO格式的日期能正确显示使用, 这里做了改进:
   *
   * 通过v-model可以传入如下类型: **Date日期对象/ISO格式的时间String/能转化为Date对象**的字符串 这三类. 但是v-model返回的数据都是ISO格式日期String, 如果期望返回每个column返回的详细结果, 请监听onChange事件.
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Datetime from 'vimo/lib/datetime'
   * // 安装
   * Vue.component(Datetime.name, Datetime)
   * // 或者
   * export default{
   *   components: {
   *     Datetime
   *  }
   * }
   * ```
   *
   * @usage
   * <Item>
   *    <Label>MMMM</Label>
   *    <Datetime slot="item-right" displayFormat="MMMM" v-model="monthOnly"></Datetime>
   * </Item>
   *
   * @props {String} [min] - ISO 8601 datetime 的时间格式, 1996-12-19
   * @props {String} [max] - ISO 8601 datetime 的时间格式, 1996-12-19
   * @props {String} displayFormat - 外部 显示的格式
   * @props {String} [pickerFormat] - picker 显示的格式
   * @props {String} [placeholder] - placeholder
   * @props {String|Object|Date} value - value
   * @props {String} [cancelText='取消'] - 取消的显示文本
   * @props {String} [doneText='确认'] - 确定的显示文本
   * @props {String|Array} [yearValues] - 显示可以选择的 年 信息, 例如: "2024,2020,2016,2012,2008"
   * @props {String|Array} [monthValues] - 显示可以选择的 月 信息, 例如: "6,7,8"
   * @props {String|Array} [dayValues] - 显示可以选择的 月 信息, 例如: "6,7,8"
   * @props {String|Array} [hourValues] - 显示可以选择的 小时 信息,
   * @props {String|Array} [minuteValues] - 显示可以选择的 分钟 信息,
   * @props {String|Array} [monthNames] - 每个月 的名字
   * @props {String|Array} [monthShortNames] - 每个月 的短名字
   * @props {String|Array} [dayNames] - 每天 的显示名字
   * @props {String|Array} [dayShortNames] - 每天 的短名字
   * @props {Object} [pickerOptions] - pickerOptions
   * @props {String} [mode='ios'] - mode
   *
   *
   * @see http://ionicframework.com/docs/demos/src/datetime/www/?production=true&ionicplatform=ios
   * @see http://ionicframework.com/docs/api/components/datetime/DateTime/
   * @demo #/time-picker
   * @fires component:Datetime#onCancel
   * @fires component:Datetime#onChange
   * */
  import { isBlank, isPresent, isTrueProperty, isArray, isString, setElementClass } from '../util/util'
  import Picker from '../picker/index'
  import Button from '../button/index'
  import {
    dateValueRange,
    renderDateTime,
    renderTextFormat,
    convertFormatToKey,
    getValueFromFormat,
    parseTemplate,
    parseDate,
    updateDate,
    convertDataToISO,
    daysInMonth,
    dateSortValue,
    dateDataSortValue
  } from './datetime-util'

  const DEFAULT_FORMAT = 'MMM D, YYYY'
  // const DEFAULT_FORMAT = 'YYYY/MM/DD'
  export default {
    name: 'Datetime',
    data () {
      return {
        itemComponent: null, // 父组件Item实例
        theDisabled: this.disabled,
        text: '',
        theMin: this.min,
        theMax: this.max,
        theValue: {},
        locale: {}
      }
    },
    props: {
      min: String,                      //  ISO 8601 datetime 的时间格式, 1996-12-19
      max: String,                      //  ISO 8601 datetime 的时间格式, 1996-12-19

      displayFormat: String,            // 外部 显示的格式
      pickerFormat: String,             // picker 显示的格式
      placeholder: String,
      value: [String, Object, Date],

      cancelText: {                     // 取消的显示文本
        type: String,
        default: '取消'
      },
      doneText: {                       // 确定的显示文本
        type: String,
        default: '确认'
      },

      yearValues: [String, Array],      // 显示可以选择的 年 信息, 例如: "2024,2020,2016,2012,2008"
      monthValues: [String, Array],     // 显示可以选择的 月 信息, 例如: "6,7,8"
      dayValues: [String, Array],       // 显示可以选择的 日 信息, 例如: "6,7,8"
      hourValues: [String, Array],      // 显示可以选择的 小时 信息,
      minuteValues: [String, Array],    // 显示可以选择的 分钟 信息,

      monthNames: [String, Array],               // 每个月 的名字
      monthShortNames: [String, Array],          // 每个月 的短名字
      dayNames: [String, Array],                  // 每天 的显示名字
      dayShortNames: [String, Array],            // 每天 的显示名字

      pickerOptions: {
        type: Object,
        default () { return {} }
      },

      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    watch: {
      disabled (val) {
        this.theDisabled = isTrueProperty(val)
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-datetime-disabled', this.theDisabled)
      },
      value (val) {
        this.theValue = parseDate(val)
        this.onChange(val)
      }
    },
    methods: {
      clickHandler ($event) {
        if ($event.detail === 0) {
          // do not continue if the click event came from a form submit
          return
        }
        $event.preventDefault()
        $event.stopPropagation()
        this.open()
      },

      open () {
        if (this.theDisabled) {
          return
        }

        // the user may have assigned some options specifically for the alert
        const pickerOptions = JSON.parse(JSON.stringify(this.pickerOptions))

        pickerOptions.buttons = [
          {
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
              /**
               * @event component:Datetime#onCancel
               * @description 点击取消按钮触发
               */
              this.$emit('onCancel', null)
            }
          },
          {
            text: this.doneText,
            handler: (data) => {
              console.debug('datetime, done', data)
              this.onChange(data)
              let value = convertDataToISO(this.theValue)
              /**
               * @event component:Datetime#onChange
               * @description 点击确定按钮
               */
              this.$emit('input', value)
              this.$emit('onChange', data)
            }
          }
        ]
        pickerOptions.columns = []

        this.generate(pickerOptions)
        this.validate(pickerOptions)

        pickerOptions.onChange = () => {
          this.validate(pickerOptions)
          Picker.refresh()
        }
        pickerOptions.onDismiss = () => {}
        pickerOptions.isH5 = true // 强制使用h5模式

        Picker.present(pickerOptions)

        Picker.refresh()
      },

      /**
       * @private
       */
      generate (pickerOptions) {
        // if a picker format wasn't provided, then fallback
        // to use the display format
        let template = this.pickerFormat || this.displayFormat || DEFAULT_FORMAT

        if (isPresent(template)) {
          // make sure we've got up to date sizing information
          this.calcMinMax()

          // does not support selecting by day name
          // automaticallly remove any day name formats
          template = template.replace('DDDD', '{~}').replace('DDD', '{~}')
          if (template.indexOf('D') === -1) {
            // there is not a day in the template
            // replace the day name with a numeric one if it exists
            template = template.replace('{~}', 'D')
          }
          // make sure no day name replacer is left in the string
          template = template.replace(/{~}/g, '')

          // parse apart the given template into an array of "formats"
          parseTemplate(template).forEach(format => {
            // loop through each format in the template
            // create a new picker column to build up with data
            let key = convertFormatToKey(format)
            let values

            // first see if they have exact values to use for this input
            if (isPresent((this)[key + 'Values'])) {
              // user provide exact values for this date part
              values = convertToArrayOfNumbers((this)[key + 'Values'], key)
            } else {
              // use the default date part values
              values = dateValueRange(format, this.theMin, this.theMax)
            }

            let column = {
              name: key,
              selectedIndex: 0,
              options: values.map(val => {
                return {
                  value: val,
                  text: renderTextFormat(format, val, null, this.locale)
                }
              })
            }

            if (column.options.length) {
              // cool, we've loaded up the columns with options
              // preselect the option for this column
              var selected
              if (this.theValue) {
                selected = column.options.find(opt => opt.value === getValueFromFormat(this.theValue, format))
              }
              if (selected) {
                // set the select index for this column's options
                column.selectedIndex = column.options.indexOf(selected)
              }

              // add our newly created column to the picker
              pickerOptions.columns.push(column)
            }
          })

          this.divyColumns(pickerOptions)
        }
      },

      /**
       * @private
       */
      validate (pickerOptions) {
        let i
        let today = new Date()
        let columns = pickerOptions.columns

        // find the columns used
        let yearCol = columns.find(col => col.name === 'year')
        let monthCol = columns.find(col => col.name === 'month')
        let dayCol = columns.find(col => col.name === 'day')

        let yearOpt
        let monthOpt
        let dayOpt

        // default to the current year
        let selectedYear = today.getFullYear()

        if (yearCol) {
          // default to the first value if the current year doesn't exist in the options
          if (!yearCol.options.find(col => col.value === today.getFullYear())) {
            selectedYear = yearCol.options[0].value
          }

          yearOpt = yearCol.options[yearCol.selectedIndex]
          if (yearOpt) {
            // they have a selected year value
            selectedYear = yearOpt.value
          }
        }

        // default to assuming this month has 31 days
        let numDaysInMonth = 31
        let selectedMonth
        if (monthCol) {
          monthOpt = monthCol.options[monthCol.selectedIndex]
          if (monthOpt) {
            // they have a selected month value
            selectedMonth = monthOpt.value

            // calculate how many days are in this month
            numDaysInMonth = daysInMonth(selectedMonth, selectedYear)
          }
        }

        // create sort values for the min/max datetimes
        let minCompareVal = dateDataSortValue(this.theMin)
        let maxCompareVal = dateDataSortValue(this.theMax)

        if (monthCol) {
          // enable/disable which months are valid
          // to show within the min/max date range
          for (i = 0; i < monthCol.options.length; i++) {
            monthOpt = monthCol.options[i]

            // loop through each month and see if it
            // is within the min/max date range
            monthOpt.disabled = (dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
              dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal)
          }
        }

        if (dayCol) {
          if (isPresent(selectedMonth)) {
            // enable/disable which days are valid
            // to show within the min/max date range
            for (i = 0; i < dayCol.options.length; i++) {
              dayOpt = dayCol.options[i]

              // loop through each day and see if it
              // is within the min/max date range
              var compareVal = dateSortValue(selectedYear, selectedMonth, dayOpt.value)

              dayOpt.disabled = (compareVal < minCompareVal ||
                compareVal > maxCompareVal ||
                numDaysInMonth <= i)
            }
          } else {
            // enable/disable which numbers of days to show in this month
            for (i = 0; i < dayCol.options.length; i++) {
              dayCol.options[i].disabled = (numDaysInMonth <= i)
            }
          }
        }
      },

      /**
       * 制作picker的columns
       * @private
       */
      divyColumns (pickerOptions) {
        let pickerColumns = pickerOptions.columns
        let columns = []

        pickerColumns.forEach((col, i) => {
          columns.push(0)

          col.options.forEach(opt => {
            if (opt.text.length > columns[i]) {
              columns[i] = opt.text.length
            }
          })
        })

        if (columns.length === 2) {
          let width = Math.max(columns[0], columns[1])
          pickerColumns[0].align = 'right'
          pickerColumns[1].align = 'left'
          pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = `${width * 17}px`
        } else if (columns.length === 3) {
          let width = Math.max(columns[0], columns[2])
          pickerColumns[0].align = 'right'
          pickerColumns[1].columnWidth = `${columns[1] * 17}px`
          pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = `${width * 17}px`
          pickerColumns[2].align = 'left'
        }
      },

      /**
       * @private
       */
      setValue (newData) {
        this.theValue = updateDate(this.theValue, newData)
      },

      /**
       * @private
       */
      checkHasValue (inputValue) {
        if (this.itemComponent) {
          setElementClass(this.itemComponent.$el, 'input-has-value', !!(inputValue && inputValue !== ''))
        }
      },

      /**
       * @private
       */
      updateText () {
        // create the text of the formatted data
        const template = this.displayFormat || this.pickerFormat || DEFAULT_FORMAT
        this.text = renderDateTime(template, this.theValue, this.locale)
      },

      /**
       * @private
       */
      onChange (val) {
        console.debug('datetime, onChange w/out formControlName', val)
        this.setValue(val)
        this.updateText()
        this.checkHasValue(val)
      },

      /**
       * @private
       */
      calcMinMax (now) {
        this.theMin = this.min
        this.theMax = this.max

        const todaysYear = (now || new Date()).getFullYear()
        if (isBlank(this.theMin)) {
          if (isPresent(this.yearValues)) {
            this.theMin = Math.min.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'))
          } else {
            this.theMin = (todaysYear - 100).toString()
          }
        }

        if (isBlank(this.theMax)) {
          if (isPresent(this.yearValues)) {
            this.theMax = Math.max.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'))
          } else {
            this.theMax = todaysYear.toString()
          }
        }

        const min = this.theMin = parseDate(this.theMin)
        const max = this.theMax = parseDate(this.theMax)

        if (min.year > max.year) {
          min.year = max.year - 100
        } else if (min.year === max.year) {
          if (min.month > max.month) {
            min.month = 1
          } else if (min.month === max.month && min.day > max.day) {
            min.day = 1
          }
        }

        min.month = min.month || 1
        min.day = min.day || 1
        min.hour = min.hour || 0
        min.minute = min.minute || 0
        min.second = min.second || 0

        max.month = max.month || 12
        max.day = max.day || 31
        max.hour = max.hour || 23
        max.minute = max.minute || 59
        max.second = max.second || 59
      }
    },
    created () {
      this.theValue = parseDate(this.value)
    },
    mounted () {
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
      }
      console.assert(this.itemComponent, 'The component of Datetime must in Item component.')
      setElementClass(this.itemComponent.$el, 'item-datetime', true)

      // first see if locale names were provided in the inputs
      // then check to see if they're in the config
      // if neither were provided then it will use default English names
      const NAMES = ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames']
      NAMES.forEach(type => {
        (this).locale[type] = convertToArrayOfStrings(isPresent((this)[type]) ? (this)[type] : this.$config && this.$config.get(type), type)
      })

      // update how the datetime value is displayed as formatted text
      this.updateText()
      this.checkHasValue(this.theValue)
    },
    components: {'vm-button': Button}
  }

  /**
   * Use to convert a string of comma separated numbers or
   * an array of numbers, and clean up any user input
   * @example
   * '1,2,4,5'      ->  [1,2,3,5]
   * '[1,2,3,4]'    ->  [1,2,3,4]
   * [1,2,3,a]      ->  [1,2,3]
   * @private
   */
  function convertToArrayOfNumbers (input, type) {
    var values = []

    if (isString(input)) {
      // convert the string to an array of strings
      // auto remove any whitespace and [] characters
      input = input.replace(/\[|\]|\s/g, '').split(',')
    }

    if (isArray(input)) {
      // ensure each value is an actual number in the returned array
      input.forEach((num) => {
        num = parseInt(num, 10)
        if (!isNaN(num)) {
          values.push(num)
        }
      })
    }

    if (!values.length) {
      console.warn(`Invalid "${type}Values". Must be an array of numbers, or a comma separated string of numbers.`)
    }

    return values
  }

  /**
   * Use to convert a string of comma separated strings or
   * an array of strings, and clean up any user input
   * @example
   * 'a,b,c,d'      ->  [a,b,c,d]
   * '[a,b,c,d]'    ->  [a,b,c,d]
   * @private
   */
  function convertToArrayOfStrings (input, type) {
    if (isPresent(input)) {
      var values = []

      if (isString(input)) {
        // convert the string to an array of strings
        // auto remove any [] characters
        input = input.replace(/\[|\]/g, '').split(',')
      }

      if (isArray(input)) {
        // trim up each string value
        input.forEach((val) => {
          val = val.trim()
          if (val) {
            values.push(val)
          }
        })
      }

      if (!values.length) {
        console.warn(`Invalid "${type}Names". Must be an array of strings, or a comma separated string.`)
      }

      return values
    }
  }
</script>
