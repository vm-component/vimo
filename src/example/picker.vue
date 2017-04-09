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
                    <RegionPicker :selectedCity="['520000', '520100', '520103']" @onSelected="onSelectedHandler" style="width: 100%">
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
        this.province = data[0]
        this.city = data[1]
        this.region = data[2]
      }
    },
    created () {},
    mounted () {
      setTimeout(() => {
        this.dataAsync = ['110000', '110100', '110101']
      }, 3000)
    },
    activated () {},
    components: {RegionPicker}
  }
</script>
