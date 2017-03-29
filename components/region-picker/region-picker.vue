<template>
    <div @click="compClickHandler()">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  /**
   * @module Components/RegionPicker
   * @description
   * 地址三级列表选择
   *
   * @property {Array} selectedCity - 当前选择的城市array, 传入的是code值
   * @property {String} title - picker的title
   *
   * */
  import Picker from 'better-picker'
  import regions from './regions.json'
  export default{
    name: 'RegionPicker',
    data(){
      return {
        provinceCol: [],    // 省份显示的数据列表
        cityCol: [],        // 城市显示的数据列表
        regionCol: [],      // 地区显示的数据列表
        selectedIndex: [],  // 当前选择的列表
      }
    },
    props: {
      selectedCity: {
        value: Array,
        default(){
          return ['110000', '110100', '110101']
        }
      },
      title: {
        value: String,
        default(){
          return ''
        }
      }
    },
    methods: {
      // 获取省份列表 520000
      getProvinceCol () {
        let province = []
        regions.forEach((item) => {
          if (item.item_code && item.item_code.substr(3) === '000') {
            province.push(this.formatData(item))
          }
        })
        return province
      },
      // 获取城市列表 520D00
      getCityCol (provinceCode) {
        let city = []
        regions.forEach((item) => {
          let _org = item.item_code.substring(0, 3) + item.item_code.substring(4)
          let _dis = provinceCode.substring(0, 3) + provinceCode.substring(4)
          if (_dis === _org && parseInt(item.item_code[3]) !== 0) {
            city.push(this.formatData(item))
          }
        })
        // city
        return city
      },
      // 获取地区县市列表 520Dxx
      getRegionCol (cityCode) {
        let region = []
        regions.forEach((item) => {
          if (item.item_code && item.item_code.substr(0, 4) === cityCode.substr(0, 4) && item.item_code.substr(4) !== '00') {
            region.push(this.formatData(item))
          }
        })
        return region
      },
      // 格式化数据
      formatData(item){
        return {
          code: item.item_code,
          value: item.item_code,
          text: item.item_name,
          name: item.item_name,
        }
      },
      // 传入城市的code返回他在arr中的index
      getIndexByCode(code, arr){
        for (var i = 0, len = arr.length; len > i; i++) {
          if (arr[i].code === code) {
            return i
            break
          }
        }
      },

      // 当组件被点击时, 开启picker
      compClickHandler(){
        this.picker && this.picker.show();
      }
    },
    created () {
      this.provinceCol = this.getProvinceCol()
      this.cityCol = this.getCityCol(this.selectedCity[0])
      this.regionCol = this.getRegionCol(this.selectedCity[1])
      this.selectedIndex[0] = this.getIndexByCode(this.selectedCity[0], this.provinceCol)
      this.selectedIndex[1] = this.getIndexByCode(this.selectedCity[1], this.cityCol)
      this.selectedIndex[2] = this.getIndexByCode(this.selectedCity[2], this.regionCol)

      this.picker = new Picker({
        data: [this.provinceCol, this.cityCol, this.regionCol],
        selectedIndex: this.selectedIndex,
        title: this.title
      })

      this.picker.on('picker.select', (selectedVal, selectedIndex) => {
        let dataArr = []
        let _p = this.provinceCol[selectedIndex[0]]
        let _c = this.cityCol[selectedIndex[1]]
        let _d = this.regionCol[selectedIndex[2]]
        dataArr.push(_p)
        dataArr.push(_c)
        dataArr.push(_d)
        this.$emit('onSelected', JSON.parse(JSON.stringify(dataArr)))
      })

      this.picker.on('picker.change', (selectedVal, selectedIndex) => {
        if (selectedVal === 0) {
          // 第一列选中, 省份选择
          this.cityCol = this.getCityCol(this.provinceCol[selectedIndex].code)
          this.regionCol = this.getRegionCol(this.cityCol[0].code)
          this.picker.refillColumn(1, this.cityCol)
          this.picker.refillColumn(2, this.regionCol)
        } else if (selectedVal === 1) {
          // 第一列选中, 城市选择
          this.regionCol = this.getRegionCol(this.cityCol[selectedIndex].code)
          this.picker.refillColumn(2, this.regionCol)
        }
      })

    },
  }
</script>
