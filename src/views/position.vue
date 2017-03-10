<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Position</Title>
      </Navbar>
    </Header>
    <Content padding>
      <Button @click="getByAli()" color="primary">ali</Button>
      <Button @click="getByQQ()" color="primary">QQ</Button>
      <Button @click="getByBaidu()" color="primary">baidu</Button>
      <Grid>
        <Row>
          <Column col-4>type</Column>
          <Column>
            {{type}}
          </Column>
        </Row>
        <Row>
          <Column>lat</Column>
          <Column>
            {{lat}}
          </Column>
        </Row>
        <Row>
          <Column col-4>lng</Column>
          <Column>
            {{lng}}
          </Column>
        </Row>
      </Grid>
    </Content>
  </Page>


</template>
<style scoped lang="scss">
  .buttons {
    text-align: center;

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        type:'',
        lat:'',
        lng:''
      }
    },
    methods: {
      getByAli: function () {
        let _this = this;

        this.$geolocation.getCurrentPosition("ali").then(function(pos){
          console.log(pos);
          _this.type = pos.maptype;
          _this.lat = pos.lat;
          _this.lng = pos.lng
        });
      },
      getByQQ: function () {
        let _this = this;
        this.$geolocation.getCurrentPosition("qq").then(function(pos){
          console.log(pos);
          _this.type = pos.maptype;
          _this.lat = pos.lat;
          _this.lng = pos.lng
        });
      },
      getByBaidu: function () {
        let _this = this;
        console.log(this.type)
        this.$geolocation.getCurrentPosition("baidu").then(function(pos){
          console.log(pos);
          _this.type = pos.maptype;
          _this.lat = pos.lat;
          _this.lng = pos.lng
        });
      }
    },
  }
</script>
