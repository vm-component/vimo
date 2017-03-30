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
            <h5 text-center>
                <span>选择结果: </span>
                <span>{{province}}</span>
                <span>{{city}}</span>
                <span>{{region}}</span>
            </h5>
            <Grid>
                <Row justify-content-center>
                    <RegionPicker :selectedCity="['520000', '520100', '520103']" @onSelected="onSelectedHandler">
                        <span>点击选择城市</span>
                    </RegionPicker>
                </Row>
            </Grid>
            <Grid>
                <Row justify-content-center>
                    <RegionPicker :selectedCity="dataAsync" @onSelected="onSelectedHandler">
                        <span>点击选择城市</span>
                    </RegionPicker>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import { RegionPicker } from 'vimo/components/region-picker'
  export default{
    name: 'name',
    data(){
      return {
        province: null,
        city: null,
        region: null,

        dataAsync: [],
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onSelectedHandler(data){
        console.debug('城市三级选择的结果:')
        console.debug(data)
        this.province = data[0].name
        this.city = data[1].name
        this.region = data[2].name
      }
    },
    created () {},
    mounted () {
      setTimeout(() => {
        this.dataAsync = ['520000', '520100', '520103']
      }, 3000)
    },
    activated () {},
    components: {RegionPicker}
  }
</script>
