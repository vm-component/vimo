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
                城市选择器使用的是本地数据库进行地址匹配, 使用的是Picker组件.
            </p>
            <h5>Picker组件</h5>
            <p><strong>初始值: </strong>{{selectedCity}}</p>
            <p><strong>当前选择的值</strong>: {{province}}-{{city}}-{{district}}</p>
            <Button block @click="openCityPicker">城市选择</Button>
        </Content>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  import axios from 'axios'

  export default {
    name: 'name',
    data () {
      return {
        selectedCity: ['140000', '140100', '140106'],
        province: '山西省',
        city: '太原市',
        district: '迎泽区'
      }
    },
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
            _this.$indicator.present()
            return new Promise((resolve) => {
              if (code) {
                axios(`https://raw.githubusercontent.com/vm-component/vm-address-json/master/data/${code}.json`)
                .then((response) => {
                  response.data.forEach((item) => {
                    item.text = item.divisionName
                    item.value = item.divisionCode
                    item.disabled = false
                  })
                  resolve(response.data)
                  _this.$indicator.dismiss()
                })
                .catch(() => {
                  resolve([])
                  console.error('无法获取数据')
                  _this.$indicator.dismiss()
                })
              } else {
                resolve([])
                console.error('没有查询的code值')
                _this.$indicator.dismiss()
              }
            })
          }
        })
      }
    }
  }
</script>
