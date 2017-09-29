<template>
    <Page>
        <Header>
            <Navbar>
                <Title>城市选择器</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>城市选择器组件</h5>
            <p>这个组件是一个弹出层组件, 数据使用的是本地数据, 不过正常来说应该是从后台获取的. </p>
            <p>结果: {{selectCity.city}} {{selectCity.adCode}}</p>
            <Button block @click="openCitySelector">打开城市选择器(本地数据)</Button>
            <Button block @click="openCitySelectorWithCustomerData">打开城市选择器(自定义数据)</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default{
    name: 'ChooseCity',
    data () {
      return {
        selectCity: {} // code text
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openCitySelector () {
        let _this = this
        this.$chooseCity.present({
          showLocatedCity: true,
          onDismiss (data) {
            console.log('response')
            console.log(data)
            if (data) {
              _this.selectCity = data
            }
          }
        })
      },
      openCitySelectorWithCustomerData () {
        let _this = this
        this.$chooseCity.present({
          cities: [
            {
              city: '朝阳区',
              adCode: '110105',
              spell: 'chaoyang'
            },
            {
              city: '海淀区',
              adCode: '110108',
              spell: 'haidian'
            },
            {
              city: '丰台区',
              adCode: '110106',
              spell: 'fengtai'
            },
            {
              city: '东城区',
              adCode: '110101',
              spell: 'dongcheng'
            },
            {
              city: '西城区',
              adCode: '110102',
              spell: 'xicheng'
            },
            {
              city: '房山区',
              adCode: '110111',
              spell: 'fangshan'
            }
          ],
          hotCities: [
            {
              city: '朝阳区',
              adCode: '110105'
            },
            {
              city: '海淀区',
              adCode: '110108'
            },
            {
              city: '丰台区',
              adCode: '110106'
            }
          ],
          onDismiss (data) {
            console.log('response')
            console.log(data)
            if (data) {
              _this.selectCity = data
            }
          }
        })
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }

</script>
<style scoped lang="less">

</style>
