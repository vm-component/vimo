/**
 * Created by Hsiang on 2017/6/23.
 */
import { isArray } from '../../util/util'
import { Picker } from '../picker'
const CityPicker = {
  present (options) {
    let startCode = options.startCode || '1'              // 全国  1
    let selectedCity = options.selectedCity
    // null number/string/any [] [''] ['',''] ['1','2','3','4']
    if (!selectedCity || !isArray(selectedCity) || isArray(selectedCity) && (selectedCity.length === 0 || selectedCity.length > 3)) {
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

    let provinceCode = selectedCity[0]  // 默认北京 110000, 也就是默认最少显示两级
    let cityCode = selectedCity[1]      // 北京 110100 这个自己填入
    let districtCode = selectedCity[2]
    let defaultFetchData = function () { return new Promise(resolve => resolve([])) }
    let fetchData = options.fetchData || defaultFetchData
    let columns = []
    fetchData(startCode).then((data) => {
      if (data.length > 0) {
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
        fetchData(provinceCode).then((data) => {
          // 获得 city 的数据
          columns.push({
            name: 'city',
            selectedIndex: getCodeIndex(cityCode, data),
            align: 'left',
            options: data
          })

          if (districtCode) {
            fetchData(cityCode).then((data) => {
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
        columns.forEach((column) => {
          column.optionsWidth = '80px'
        })
      }

      let data = {
        cssClass: 'small-text',
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
            handler: (data) => {
              options.onConfirm && options.onConfirm(data)
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
        fetchData(data.value).then((data) => {
          columns[1].options = data
          Picker.resetColumn(1)
          if (columns[1].options[0] && selectedCity.length > 2) {
            fetchData(columns[1].options[0].value).then((data) => {
              columns[2].options = data
              Picker.resetColumn(2)
            })
          }
        })
      }
      if (data.columnIndex === 1 && selectedCity.length > 2) {
        fetchData(data.value).then((data) => {
          columns[2].options = data
          Picker.resetColumn(2)
        })
      }
    }
  }
}
export { CityPicker }