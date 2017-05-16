<template>
    <Page>
        <Header>
            <Navbar>
                <Title>城市选择器</Title>
            </Navbar>
        </Header>
        <Content padding>

            <h5>简介</h5>
            <p>
                城市选择器使用的是本地数据库进行地址匹配, 这里使用了两套方案进行选择, 一种使用的是Picker组件, 另一种使用的是对better-picker插件的封装.
            </p>

            <p>另外, 两套组件使用的数据库已不一样: Picker组件使用的较为完整, 但是缺少cityCode字段; better-picker使用的是带有cityCode的数据库, 但是不是很全.</p>


            <h5>Picker组件</h5>

            <p><strong>当前选择的值</strong>: {{province}}-{{city}}-{{district}}</p>
            <Button block @click="openCityPicker">城市选择</Button>


            <h5>Better-Picker组件</h5>
            <p><strong>初始值: </strong>{{bSelectedCode}}</p>
            <p><strong>当前选择的值</strong>: {{bProvince}}-{{bCity}}-{{bDistrict}}</p>
            <Button block @click="openCityBetterPicker">城市选择</Button>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { RegionPicker } from 'vimo/components/region-picker'
  import { Picker } from 'vimo/components/picker'
  import citys from './citys.json'
  import { isArray } from 'vimo/util/util'
  let columns = [
    {
      name: 'province',
      align: 'right',
      selectedIndex: 0,
      optionsWidth: '80px',
      options: []
    },
    {
      name: 'city',
      align: '',
      selectedIndex: 0,
      optionsWidth: '80px',
      options: []
    },
    {
      name: 'district',
      align: 'left',
      selectedIndex: 0,
      optionsWidth: '80px',
      options: []
    }
  ]
  export default{
    name: 'name',
    data () {
      return {
        selectedProvince: null,
        selectedCity: null,
        province: '广东',
        city: '广州',
        district: '海珠区',

        // -----
        bSelectedCode: ['140000', '140100', '140106'],
        bProvince: '',
        bCity: '',
        bDistrict: ''
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      /**
       * 打开由Picker组件实现的城市选择器
       * */
      openCityPicker () {
        let buttons = [
          {
            role: 'cancel',
            text: '取消',
            handler: null
          },
          {
            text: '确定',
            handler: (data) => {
              console.log(data)
              this.province = data.province.value
              this.city = data.city.value
              this.district = data.district.value
            }
          }
        ]
        columns[0].options = this.getProvince()
        columns[0].selectedIndex = this.getItemIndex(this.province, columns[0].options)

        if (columns[0].options[0]) {
          columns[1].options = this.getCity(columns[0].options[columns[0].selectedIndex].value)
          columns[1].selectedIndex = this.getItemIndex(this.city, columns[1].options)
        } else {
          columns[1].options = []
          columns[1].selectedIndex = 0
        }
        if (columns[1].options[0]) {
          columns[2].options = this.getRegion(columns[1].options[columns[1].selectedIndex].value)
          columns[2].selectedIndex = this.getItemIndex(this.district, columns[2].options)
        } else {
          columns[2].options = []
          columns[2].selectedIndex = 0
        }
        Picker.present({
          buttons,
          columns,
          onSelect: this.onSelectHandler,
          onChange: this.onChangeHandler
        })
      },

      getItemIndex (name, list) {
        for (let i = 0, len = list.length; len > i; i++) {
          if (name === list[i].text) {
            return i
          }
        }
        return 0
      },

      /**
       * 当单列变化时的处理函数
       * */
      onSelectHandler (data) {
        if (data.columnIndex === 0) {
          columns[1].options = this.getCity(data.value)
          if (columns[1].options[0]) {
            columns[2].options = this.getRegion(columns[1].options[0].value)
          }
          Picker.resetColumn(1)
          Picker.resetColumn(2)
        }

        if (data.columnIndex === 1) {
          columns[2].options = this.getRegion(data.value)
          Picker.resetColumn(2)
        }
      },

      /**
       * 获取格式化好的 省份数据
       * */
      getProvince () {
        let tmp = []
        citys && citys.forEach((province) => {
          tmp.push({
            text: province.name,
            value: province.name,
            disabled: false
          })
        })
        return tmp
      },

      /**
       * 获取格式化好的 城市数据
       * */
      getCity (provinceName) {
        let tmp = []
        this.selectedProvince = null
        for (let i = 0, len = citys.length; len > i; i++) {
          if (citys[i].name === provinceName) {
            this.selectedProvince = citys[i] // 比如河北的全部城市源数据
            break
          }
        }

        if (this.selectedProvince && isArray(this.selectedProvince.sub)) {
          this.selectedProvince.sub.forEach((city) => {
            tmp.push({
              text: city.name,
              value: city.name,
              disabled: false
            })
          })
        }

        return tmp
      },

      /**
       * 获取格式化好的 地区数据
       * */
      getRegion (cityName) {
        let tmp = []
        if (this.selectedProvince && isArray(this.selectedProvince.sub)) {
          this.selectedCity = null
          this.selectedProvince.sub.forEach((city) => {
            if (city.name === cityName) {
              this.selectedCity = city
            }
          })

          if (this.selectedCity && isArray(this.selectedCity.sub)) {
            this.selectedCity.sub.forEach((district) => {
              tmp.push({
                text: district.name,
                value: district.name,
                disabled: false
              })
            })
          }
        }

        return tmp
      },

      // ----- better-picker -----
      openCityBetterPicker () {
        const _this = this
        RegionPicker.present({
          selectedCity: _this.bSelectedCode,
          title: '请选择',
          onSelect (data) {
            console.log(data)
            _this.bProvince = `${data[0].name}`
            _this.bCity = `${data[1].name}`
            _this.bDistrict = `${data[2].name}`
            _this.bSelectedCode = [data[0].value, data[1].value, data[2].value]
          },
          onCancel (data) {
            console.log('onCancel:' + JSON.stringify(data))
          }
        })
      }
    },
    created () {

    },
    mounted () {

    },
    activated () {},
    components: {RegionPicker, Picker}
  }
</script>
