/**
 * @component CityPicker
 * @description
 *
 * ## 城市联动选择组件 / CityPicker组件
 *
 * ### 简述
 *
 * 这是一个二级/三级联动进行城市选择的组件, 数据获取可修改fetchData函数进行, 可以是本地数据也可以是网络数据.
 *
 * ### fetchData函数
 *
 * fetchData函数用于根据code获取picker单列的数据, 这部分由业务确定, 有些情况需要使用本地数据, 有时是网络数据. 函数参考下面的用法, 需要在返回的数组中包含的对象格式是:
 *
 * 名称 / Name | 类型 / Type | 描述 / Description
 * ----------|-----------|------------------
 * text      | string    | 显示的文本
 * value     | *         | 对显示文本的值
 * disabled  | boolean   | 是否禁用
 *
 * ### 如何引入
 * ```
 * import CityPicker from 'vimo/lib/city-picker'
 * ```
 *
 * @props {Array} selectedCity - 默认选中的值, 这个也对应组件是两级还是三级的标志, 可以是数据: ['',''] ['','',''], 默认显示北京
 * @props {String/Number} [startCode='1'] - 获取省份数据的code值, 默认是 中国 1
 * @props {Function} [onCancel] - 点击取消的操作
 * @props {Function} [onSelect] - 点击确认的操作
 * @props {Function} fetchData - 获取城市数据的来源, 这个funtion传入code返回promise格式的数据, 其中需要返回的数据格式如下
 *
 * @demo #/city-picker
 * @usage
 * function openCityPicker () {
 *    CityPicker.present({
 *      onSelect (data) {
 *        console.log('onSelect')
 *        console.log(data)
 *      },
 *      onCancel () {
 *        console.log('onCancel')
 *      },
 *      startCode: '1',
 *      selectedCity: ['', ''],
 *      fetchData (code) {
 *        return new Promise((resolve, reject) => {
 *          if (code) {
 *            axios(`static/address-data/${code}.json`)
 *            .then((response) => {
 *              response.data.forEach((item) => {
 *                item.text = item.divisionName
 *                item.value = item.divisionCode
 *                item.disabled = false
 *              })
 *              resolve(response.data)
 *            })
 *            .catch(() => {
 *              resolve([])
 *              console.error('无法获取数据')
 *            })
 *          } else {
 *            resolve([])
 *            console.error('没有查询的code值')
 *          }
 *        })
 *      }
 *    })
 *  }
 *
 */
import { isArray } from '../util/util'
import Picker from '../picker/index'

const CityPicker = {
  present (options) {
    let startCode = options.startCode || '1' // 全国  1
    let selectedCity = options.selectedCity
    // null number/string/any [] [''] ['',''] ['1','2','3','4']
    if (
      !selectedCity ||
      !isArray(selectedCity) ||
      (isArray(selectedCity) &&
        (selectedCity.length === 0 || selectedCity.length > 3))
    ) {
      // 非法的情况, 默认是双列 北京 北京
      selectedCity = ['110000', '110100']
    }

    if (isArray(selectedCity)) {
      if (selectedCity.length === 2 && !selectedCity[0]) {
        selectedCity = ['110000', '110100']
      }
      if (selectedCity.length === 3 && (!selectedCity[0] || !selectedCity[1])) {
        selectedCity = ['110000', '110100', '110101']
      }
    }

    let provinceCode = selectedCity[0] // 默认北京 110000, 也就是默认最少显示两级
    let cityCode = selectedCity[1] // 北京 110100 这个自己填入
    let districtCode = selectedCity[2]
    let defaultFetchData = function () {
      return new Promise(resolve => resolve([]))
    }
    let fetchData = options.fetchData || defaultFetchData
    let columns = []
    fetchData(startCode).then(data => {
      if (data && isArray(data) && data.length > 0) {
        // 获得 province 的数据
        columns = [
          {
            name: 'province',
            selectedIndex: getCodeIndex(provinceCode, data),
            align: 'right',
            options: data
          }
        ]
        console.assert(provinceCode, 'provinceCode数据为空, 请检查代码!')
        fetchData(provinceCode).then(data => {
          // 获得 city 的数据
          columns.push({
            name: 'city',
            selectedIndex: getCodeIndex(cityCode, data),
            align: 'left',
            options: data
          })

          if (districtCode) {
            fetchData(cityCode).then(data => {
              // 获得 district 的数据
              columns.push({
                name: 'district',
                selectedIndex: getCodeIndex(districtCode, data),
                align: 'left',
                options: data
              })

              initPicker(columns)
            })
          } else {
            initPicker(columns)
          }
        })
      } else {
        console.error('CityPicker无法获取省份数据, 请检查代码')
      }
    })

    /**
     * 根据code从data中找他的位置
     * @private
     * */
    function getCodeIndex (code = '', data) {
      code = code.toString()
      if (code) {
        for (let i = 0, len = data.length; len > i; i++) {
          let item = data[i]
          if (item.value && item.value.toString() === code) {
            return i
          }
        }
      }
      return 0
    }

    /**
     * 初始化Picker
     * @private
     * */
    function initPicker (columns) {
      if (columns.length > 2) {
        columns.forEach(column => {
          column.optionsWidth = '80px'
        })
      }

      let data = {
        cssClass: 'small-text',
        isH5: true,
        buttons: [
          {
            role: 'cancel',
            text: '取消',
            handler () {
              'use strict'
              options.onCancel && options.onCancel()
            }
          },
          {
            text: '确定',
            handler: data => {
              options.onSelect && options.onSelect(data)
            }
          }
        ],
        columns,
        onSelect: onSelectHandler
      }

      Picker.present(data)
    }

    /**
     * Picker选择时触发
     * @private
     * */
    function onSelectHandler (data) {
      if (data.columnIndex === 0) {
        fetchData(data.value).then(data => {
          columns[1].options = data
          Picker.resetColumn(1)
          if (columns[1].options[0] && selectedCity.length > 2) {
            fetchData(columns[1].options[0].value).then(data => {
              columns[2].options = data
              Picker.resetColumn(2)
            })
          }
        })
      }
      if (data.columnIndex === 1 && selectedCity.length > 2) {
        fetchData(data.value).then(data => {
          columns[2].options = data
          Picker.resetColumn(2)
        })
      }
    }
  }
}
export default CityPicker
