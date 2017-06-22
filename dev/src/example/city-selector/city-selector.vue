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
            <p>结果: {{selectCity.text}} {{selectCity.code}}</p>
            <Button block @click="openCitySelector">打开城市选择器</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  import cityComponent from './city.vue'
  import { Modal } from 'vimo/components/modal'
  export default{
    name: 'name',
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
        Modal.present({
          component: cityComponent,
          mode: 'fade',
          showBackdrop: true,
          enableBackdropDismiss: false,
          onDismiss (data) {
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
<style scoped lang="scss">

</style>
