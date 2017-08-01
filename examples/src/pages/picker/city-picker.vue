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
            <p><strong>初始值: </strong>{{selectedCity}}</p>
            <p><strong>当前选择的值</strong>: {{province}}-{{city}}-{{district}}</p>
            <Button block @click="openCityPicker">城市选择</Button>

            <h5>Better-Picker组件</h5>
            <p><strong>初始值: </strong>{{bSelectedCity}}</p>
            <p><strong>当前选择的值</strong>: {{bProvince}}-{{bCity}}-{{bDistrict}}</p>
            <Button block @click="openCityBetterPicker">城市选择</Button>
        </Content>
    </Page>
</template>
<style scoped lang="scss"></style>
<script type="text/javascript">
  import axios from 'axios'
  export default{
    name: 'name',
    data () {
      return {
        selectedCity: ['140000', '140100', '140106'],
        province: '山西省',
        city: '太原市',
        district: '迎泽区',

        // -----
        bSelectedCity: ['220000', '220200', '220283'],
        bProvince: '吉林省',
        bCity: '吉林市',
        bDistrict: '舒兰市'
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
        const _this = this
        this.$cityPicker.present({
          onSelect (data) {
            let tmp = []
            data.province && (_this.province = data.province.text, tmp.push(data.province.value.toString()))
            data.city && (_this.city = data.city.text, tmp.push(data.city.value.toString()))
            data.district && (_this.district = data.district.text, tmp.push(data.district.value.toString()))
            _this.selectedCity = tmp
          },
          onCancel () {
            console.log('onCancel')
          },
          startCode: '1',
          selectedCity: this.selectedCity,
          fetchData (code) {
            return new Promise((resolve) => {
              if (code) {
                axios(`static/address-data/${code}.json`)
                .then((response) => {
                  response.data.forEach((item) => {
                    item.text = item.divisionName
                    item.value = item.divisionCode
                    item.disabled = false
                  })
                  resolve(response.data)
                })
                .catch(() => {
                  resolve([])
                  console.error('无法获取数据')
                })
              } else {
                resolve([])
                console.error('没有查询的code值')
              }
            })
          }
        })
      },

      // ----- better-picker -----
      openCityBetterPicker () {
//        const _this = this
//        RegionPicker.present({
//          selectedCity: _this.bSelectedCity,
//          title: '请选择',
//          onSelect (data) {
//            console.log(data)
//            _this.bProvince = `${data[0].name}`
//            _this.bCity = `${data[1].name}`
//            _this.bDistrict = `${data[2].name}`
//            _this.bSelectedCity = [data[0].value, data[1].value, data[2].value]
//          },
//          onCancel (data) {
//            console.log('onCancel:' + JSON.stringify(data))
//          }
//        })
      }
    },
    created () {

    },
    mounted () {

    },
    activated () {},
  }


</script>
