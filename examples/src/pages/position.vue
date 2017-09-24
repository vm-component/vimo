<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Position</Title>
            </Navbar>
        </Header>
        <Content padding>
            <div v-for="bi in btn">
                <Button @click="getPosition(bi.name)" v-bind:color="bi.color">{{bi.name}}</Button>
            </div>
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
<style scoped lang="less">
    .buttons {
        text-align: center;

    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        btn: [
          {
            name: 'ali',
            color: 'primary'
          }, {
            name: 'qq',
            color: 'primary'
          }, {
            name: 'baidu',
            color: 'primary'
          }
        ],
        type: '',
        lat: '',
        lng: ''
      }
    },
    methods: {
      getPosition (type) {
        this.btn.forEach(function (e, i) {
          e.color = 'primary'
          if (e.name === type) e.color = 'secondary'
        })
        this.getFromGeo(type)
      },
      getFromGeo (type) {
        var _this = this
        this.$geolocation.getCurrentPosition(type).then((pos) => {
          _this.type = pos.maptype
          _this.lat = pos.lat
          _this.lng = pos.lng
        })
      }
    }
  }
</script>
