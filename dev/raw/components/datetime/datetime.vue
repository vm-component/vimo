<template>
    <div class="ion-datetime" @click="clickHandler($event)">
        <div v-if="!text" class="datetime-text datetime-placeholder">{{placeholder}}</div>
        <div v-if="text" class="datetime-text">{{text}}</div>
        <button
                type="button"
                :id="_uid"
                ion-button="item-cover"
                class="item-cover">
        </button>
    </div>
</template>
<style lang="scss">
    @import "datetime.scss";
    @import "datetime.ios.scss";
    @import "datetime.md.scss";
</style>
<script type="text/javascript">
  import { isBlank, isPresent, isTrueProperty, isArray, isString, setElementClass } from '../../util/util'
  import { Picker } from '../picker'
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

  export default{
    name: 'Datetime',
    data () {
      return {
        itemComponent: null, // 父组件Item实例
        _disabled: this.disabled,
        _labelId: '',
        text: '',
        _fn: function () {},
        _isOpen: false,
        theMin: this.min,
        theMax: this.max,
        _value: {},
        locale: {}
      }
    },
    props: {
      min: String,                      //  ISO 8601 datetime 的时间格式, 1996-12-19
      max: String,                      //  ISO 8601 datetime 的时间格式, 1996-12-19
      displayFormat: String,            // 外部 显示的格式
      pickerFormat: String,             // picker 显示的格式
      cancelText: {                     // 取消的显示文本
        type: String,
        default: 'Cancel'
      },
      doneText: {                       // 确定的显示文本
        type: String,
        default: 'Done'
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
        default(){ return {} }
      },
      placeholder: String,
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      },
      value: [String, Object, Date]
    },
    watch: {
      disabled (val) {
        this._disabled = isTrueProperty(val)
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-datetime-disabled', this._disabled)
      },
      value (val) {
        this._value = parseDate(val)
        this.onChange(val)
      }
    },
    computed: {},
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
        if (this._disabled) {
          return
        }

        console.debug('datetime, open picker')

        // the user may have assigned some options specifically for the alert
        const pickerOptions = JSON.parse(JSON.stringify(this.pickerOptions))

        pickerOptions.buttons = [
          {
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
              this.$emit('onCancel', null)
            }
          },
          {
            text: this.doneText,
            handler: (data) => {
              console.debug('datetime, done', data)
              this.onChange(data)

              let value = convertDataToISO(this._value)
              console.debug('------+------')
              console.log(this._value)
              console.log(value)

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
        pickerOptions.onDismiss = () => {
          this._isOpen = false
        }

        Picker.present(pickerOptions)

        this._isOpen = true
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
              if (this._value) {
                selected = column.options.find(opt => opt.value === getValueFromFormat(this._value, format))
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
        console.log('---- setValue ----')
        console.log(this._value)
        // debugger
        this._value = updateDate(this._value, newData)
        console.log(this._value)
      },

      /**
       * @private
       */
      getValue () {
        return this._value
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
        this.text = renderDateTime(template, this._value, this.locale)
      },

      /**
       * @private
       */
      writeValue (val) {
        console.debug('datetime, writeValue', val)
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
      },

      /**
       * @private
       */
      registerOnChange (fn) {
        this._fn = fn
        this.onChange = (val) => {
          console.debug('datetime, onChange', val)
          this.setValue(val)
          this.updateText()
          this.checkHasValue(val)

          // convert DateTimeData value to iso datetime format
          fn(convertDataToISO(this._value))

        }
      },

      /**
       * @private
       */
      onChange(val) {
        // onChange used when there is not an formControlName
        console.debug('datetime, onChange w/out formControlName', val)
        // // debugger
        this.setValue(val)
        this.updateText()
        this.checkHasValue(val)
//        this.onTouched()
      }

    },
    created(){

      this._value = parseDate(this.value)

    },
    mounted(){
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
      }
      console.assert(this.itemComponent, 'Datetime组件需要在Item组件内部使用')
      setElementClass(this.itemComponent.$el, 'item-datetime', true)

      // first see if locale names were provided in the inputs
      // then check to see if they're in the config
      // if neither were provided then it will use default English names
      const NAMES = ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames']
      NAMES.forEach(type => {
        (this).locale[type] = convertToArrayOfStrings(isPresent((this)[type]) ? (this)[type] : this.$config.get(type), type)
      })

      // update how the datetime value is displayed as formatted text
      this.updateText()
    },
    components: {}
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
   * @private
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
