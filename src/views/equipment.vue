<template>
  <Page>
    <Header>
      <Navbar>
        <Title>设备信息</Title>
      </Navbar>
    </Header>
    <Content padding>
      <h4>当前设备信息:</h4>
      <Grid>
        <Row>
          <Column col-4><strong>设备平台:</strong></Column>
          <Column col-8>{{$platform._bPlt}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>文字方向:</strong></Column>
          <Column col-8>{{$platform._dir}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>设备语言:</strong></Column>
          <Column col-8>{{$platform._lang}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>网路类型:</strong></Column>
          <Column col-8>{{$platform._nt || '未检测到'}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>屏幕方向:</strong></Column>
          <Column col-8>{{$platform._isPortrait === null ? '未检测到' : $platform._isPortrait === true ? '竖屏': '横屏'}}
          </Column>
        </Row>

        <Row>
          <Column col-4><strong>平台级别:</strong></Column>
          <Column col-8>
           <strong>{{$platform._platforms.join(' -> ')}}</strong>
          </Column>
        </Row>
        <Row>
          <Column col-4><strong>地址栏参数:</strong></Column>
          <Column col-8>{{$platform._qp}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>UserAgent:</strong></Column>
          <Column col-8>{{$platform._ua}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>平台版本:</strong></Column>
          <Column col-8>{{$platform._versions}}</Column>
        </Row>
        <Row>
          <Column col-4><strong>CSS属性:</strong></Column>
          <Column col-8>
            <div class="detailBox" v-for="(value,key) in $platform.Css">
              <Row><span class="detailBox__title">{{key}}:</span></Row>
              <Row><span class="detailBox__value">{{value}}</span></Row>
            </div>
          </Column>
        </Row>
        <Row>
          <Column col-4><strong>当前Config:</strong></Column>
          <Column col-8>
            <div class="detailBox" v-for="(value,key) in $config._c">
              <Row><span class="detailBox__title">{{key}}:</span></Row>
              <Row><span class="detailBox__value">{{value}}</span></Row>
            </div>
          </Column>
        </Row>
      </Grid>
    </Content>
  </Page>
</template>
<style scoped lang="scss">


  .detailBox {
    margin-bottom: 5px;

    .detailBox__title {
      color: #000;
      font-weight: bold;
    }
    .detailBox__value {
      color: #333;
    }
  }


</style>
<script type="text/ecmascript-6">
  export default{
    name: 'equipment',
    data(){
      return {
        currentConfig: this.$config._c
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>
