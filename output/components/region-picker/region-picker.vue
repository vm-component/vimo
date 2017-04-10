<template>
    <div @click="compClickHandler()">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    .picker .picker-panel .wheel-wrapper .wheel .wheel-scroll {
        padding: 0;
        margin: 0;
        font-size: 16px;
    }

    .picker .picker-panel .picker-choose .picker-title {
        margin: 0;
    }

    .picker .picker-panel .picker-choose .cancel, .picker .picker-panel .picker-choose .confirm {
        padding: 10px 20px !important;
    }

    .wheel-item {
        display: block; //如果是块儿级元素可以不用加
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<script>
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
  import { registerListener } from '../../util/util'
  export default{
    name: 'RegionPicker',
    data(){
      return {
        provinceCol: [],            // 省份显示的数据列表
        cityCol: [],                // 城市显示的数据列表
        regionCol: [],              // 地区显示的数据列表
        selectedIndex: [],          // 当前选择的列表
        lastSelectCityArrs: [],     // 上一次城市选择的值 ['110000', '110100', '110101']

        isInit: false,
        unreg: null,
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
    watch: {
      selectedCity(val){
        if (this.isInit) {
          this.reset(val)
        } else {
          this.init(val)
        }
      }
    },
    methods: {
      // 获取省份列表 520000
      getProvinceCol () {
        let province = []
        regions.forEach((item) => {
          if (item.item_code && item.item_code.substr(2) === '0000') {
            province.push(this.formatData(item))
          }
        })
        return province
      },
      // 获取城市列表 520D00
      getCityCol (provinceCode) {
        if (!provinceCode)return
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
        if (!cityCode)return
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
        if (!item)return
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
      },

      // isLegal
      isLegal(dataArr){
        let provinceCode = dataArr[0].code
        let cityCode = dataArr[1].code
        let regionCode = dataArr[2].code
        let pc = provinceCode.substr(0, 2)
        if (pc === cityCode.substr(0, 2) && pc === regionCode.substr(0, 2)) {
          let cc = cityCode.substr(0, 4)
          if (cc === regionCode.substr(0, 4)) {
            this.lastSelectCityArrs = [provinceCode, cityCode, regionCode]
            return true
          }
        }

        // 重新初始化
        this.reset()
        return false
      },

      // 初始化
      init(cityArrs){
        if (this.isInit) return
        this.isInit = true
        if (!cityArrs || !cityArrs[0] || !cityArrs[1] || !cityArrs[2]) {
          cityArrs = ['110000', '110100', '110101']
        }
        this.lastSelectCityArrs = JSON.parse(JSON.stringify(cityArrs))

        this.provinceCol = this.getProvinceCol()
        this.cityCol = this.getCityCol(cityArrs[0])
        this.regionCol = this.getRegionCol(cityArrs[1])
        this.selectedIndex[0] = this.getIndexByCode(cityArrs[0], this.provinceCol)
        this.selectedIndex[1] = this.getIndexByCode(cityArrs[1], this.cityCol)
        this.selectedIndex[2] = this.getIndexByCode(cityArrs[2], this.regionCol)
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
          if (this.isLegal(dataArr)) {
            this.$emit('onSelected', JSON.parse(JSON.stringify(dataArr)))
          }
        })

        this.picker.on('picker.change', (selectedVal, selectedIndex) => {
          if (selectedVal === 0) {
            // 第一列选中, 省份选择
            let province = this.provinceCol[selectedIndex]
            this.cityCol = this.getCityCol(province.code)
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

      // 重置
      reset(){
        // 设置index
        let i0 = this.getIndexByCode(this.lastSelectCityArrs[0], this.provinceCol)
        let i1 = this.getIndexByCode(this.lastSelectCityArrs[1], this.cityCol)
        let i2 = this.getIndexByCode(this.lastSelectCityArrs[2], this.regionCol)
        this.picker.selectedIndex = [i0, i1, i2]
        this.picker.selectedVal = JSON.parse(JSON.stringify(this.lastSelectCityArrs))
      },

      // 检查初始化传入的值是否合法
      checkValue(arrs){
        return !!arrs && Array.isArray(arrs) && arrs.length === 3
      },

      // 页面切换关闭picker
      dismissOnPageChangeHandler(){
        this.picker && this.picker.hide()
//        this.unreg && this.unreg()
      }
    },
    created () {
      if (this.checkValue(this.selectedCity)) {
        this.init(this.selectedCity)
      }

      // 监听页面变化
      this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false});
    }
  }
</script>
