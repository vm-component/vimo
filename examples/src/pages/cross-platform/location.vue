<template>
    <Page>
        <Header>
            <Navbar>
                <Title>位置组件</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>位置组件</h4>
            <section>
                <!--当前城市-->
                <strong>当前城市</strong>
                <Button block @click="selectLocalCity()">SelectLocalCity</Button>
                <strong>结果</strong>
                <p class="result">{{selectLocalCityResult}}</p>
            </section>
            <section>
                <!--城市选择器-->
                <strong>城市选择器</strong>
                <Button block @click="selectCity()">SelectCity</Button>
                <strong>结果</strong>
                <p class="result">{{selectCityResult}}</p>
            </section>
            <section>
                <!--位置-->
                <strong>获取位置信息</strong>
                <Button block @click="getLocation()">GetLocation</Button>
                <strong>结果</strong>
                <p class="result">{{getLocationResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'Location',
    data () {
      return {
        // result
        selectLocalCityResult: '',
        selectCityResult: '',
        getLocationResult: '',

        test: ''
      }
    },
    props: {},
    watch: {},
    computed: {
      titleComponent () {
        return this.$refs.title
      },
      navbarComponent () {
        return this.$refs.navbar
      }
    },
    methods: {
      selectLocalCity () {
        const _this = this
        window.dd && window.dd.biz.util.selectLocalCity({
          onSuccess (data) {
            // data=>{cityId : 419900, cityName : 省本级}
            _this.selectLocalCityResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.selectLocalCityResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      selectCity () {
        const _this = this
        window.dd && window.dd.biz.util.selectCity({
          onSuccess (data) {
            // data=>{“webid”:”1”,”cityId”:339900,”cityName”:”省本级”}
            _this.selectCityResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.selectCityResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      getLocation () {
        const _this = this
        window.dd && window.dd.device.location.get({
          onSuccess (data) {
            // data=> {
            //   "latitude": "120.0032",
            //   "longitude": "30.3238",
            //   "detailAddress": "转塘街道云栖小镇中大银座9号楼",
            //   "cityName":"杭州市",
            //   "region": "西湖区"
            //   }
            _this.getLocationResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.getLocationResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      }
    }
  }
</script>
