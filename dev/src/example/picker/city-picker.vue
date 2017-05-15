<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Picker</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button block @click="openCityPicker">城市选择(Picker组件)</Button>
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
      name: 'prov',
      align: 'right',
      selectedIndex: 5,
      optionsWidth: '80px',
      options: []
    },
    {
      name: 'city',
      align: '',
      selectedIndex: 1,
      optionsWidth: '80px',
      options: []
    },
    {
      name: 'district',
      align: 'left',
      selectedIndex: 1,
      optionsWidth: '80px',
      options: []
    }
  ]

  export default{
    name: 'name',
    data () {
      return {
        selectedData: null,
        province: null,
        city: null,
        district: null
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
            }
          }
        ]
        columns[0].options = this.getProvince()
        if (columns[0].options[0]) {
          columns[1].options = this.getCity(columns[0].options[columns[0].selectedIndex].value)
        } else {
          columns[1].options = []
        }

        if (columns[1].options[0]) {
          columns[2].options = this.getRegion(columns[1].options[columns[1].selectedIndex].value)
        } else {
          columns[2].options = []
        }

        Picker.present({
          buttons,
          columns,
          onSelect: this.onSelectHandler,
          onChange: this.onChangeHandler
        })
      },

      /**
       * 当单列变化时的处理函数
       * */
      onSelectHandler (data) {
        console.debug('onSelectHandler')
        console.debug(data)

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
