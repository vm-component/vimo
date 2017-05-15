<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Picker</Title>
            </Navbar>
        </Header>
        <Content padding>

            <h4>自定义</h4>
            <h5 text-center>
                <span>选择结果: </span>
            </h5>
            <Button block>点击选择</Button>

            <h4>城市三级联动</h4>
            <p text-center>
                <span>选择结果: </span>
            <p text-center>
                <span v-if="province">城市名:</span>
                <span v-if="province">{{province.name}}</span>
                <span v-if="city">{{city.name}}</span>
                <span v-if="region">{{region.name}}</span>
            </p>
            <p text-center>
                <span v-if="province">城市code:</span>
                <span v-if="province">{{province.code}}</span>
                <span v-if="city">{{city.code}}</span>
                <span v-if="region">{{region.code}}</span>
            </p>
            <Grid>
                <Row justify-content-center>
                    <RegionPicker :selectedCity="['520000', '520100', '520103']" @onSelected="onSelectedHandler"
                                  style="width: 100%">
                        <Button block><span>点击选择城市(同步)</span></Button>
                    </RegionPicker>
                </Row>
            </Grid>
            <Grid>
                <Row justify-content-center>
                    <RegionPicker :selectedCity="dataAsync" @onSelected="onSelectedHandler" style="width: 100%">
                        <Button block :disabled="dataAsync.length!=3"><span>点击选择城市(异步3s)</span></Button>
                    </RegionPicker>
                </Row>
            </Grid>

            <Button @click="openCityPicker">城市选择(Picker组件)</Button>

        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { RegionPicker } from 'vimo/components/region-picker'

  import { Picker } from 'vimo/components/picker'

  import citys from './citys.json'

  let columns = [
    {
      name: 'province',
      align: 'left',
      selectedIndex: 0,
      options: []
    },
    {
      name: 'city',
      align: '',
      selectedIndex: 0,
      options: []
    },
    {
      name: 'region',
      align: 'right',
      selectedIndex: 0,
      options: []
    }
  ]

  export default{
    name: 'name',
    data () {
      return {
        province: null,
        city: null,
        region: null,
        dataAsync: [],

        pickerData: null,

        pickerComponent: null
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openCityPicker () {
        let buttons = [
          {
            role: 'cancel',
            text: '取消',
            cssClass: 'cancel-cssClass',
            handler: null
          },
          {
            role: '',
            text: '确定',
            cssClass: 'success-cssClass',
            handler: (data) => {
              console.log(data)
            }
          }
        ]
        columns[0].options = this.getProvince()
        columns[1].options = this.getCity(columns[0].options[0].value)
        columns[2].options = this.getRegion(columns[1].options[0].value)
        let data = {
          buttons, columns
        }
        Picker.present({
          data: data,
          onSelect: this.onSelectHandler,
          onChange: this.onChangeHandler
        })
      },
      onSelectedHandler (data) {
//        console.debug('城市三级选择的结果:')
//        console.debug(data)
        this.province = data[0]
        this.city = data[1]
        this.region = data[2]
      },

      onChangeHandler (data) {
        console.debug('onChangeHandler')
        console.debug(data)
      },

      /**
       * 当单列变化时的处理函数
       * */
      onSelectHandler (data) {
        console.debug('onSelectHandler')
        console.debug(data)

        if (data.columnIndex === 0) {
          columns[1].options = this.getCity(data.value)
          columns[2].options = this.getRegion(columns[1].options[0].value)
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
        citys.forEach((province) => {
          tmp.push({
            text: province.name,
            value: province.code,
            disabled: false
          })
        })
        return tmp
      },

      /**
       * 获取格式化好的 城市数据
       * */
      getCity (provinceCode) {
        let tmp = []
        citys.forEach((province) => {
          if (province.code === provinceCode) {
            province.sub.forEach((city) => {
              tmp.push({
                text: city.name,
                value: city.code,
                disabled: false
              })
            })
          }
        })
        return tmp
      },

      /**
       * 获取格式化好的 地区数据
       * */
      getRegion (cityCode) {
        let tmp = []
        let provinceCode = cityCode.substr(0, 3) + '000'
        citys.forEach((province) => {
          if (province.code === provinceCode) {
            province.sub.forEach((city) => {
              if (city.code === cityCode) {
                city.sub.forEach((region) => {
                  tmp.push({
                    text: region.name,
                    value: region.code,
                    disabled: false
                  })
                })
              }
            })
          }
        })
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
