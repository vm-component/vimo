<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Geo</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h5>简介</h5>
                <p>this.$geo支持四种方式获取当前地理位置信息: H5原生方式/腾讯地图/高德地图/百度地图. 默认情况下, IOS平台在HTTP模式下不能使用原生获取地理位置.</p>
            </div>


            <h5 class="name">当前参数:</h5>

            <div padding class="name__content">
                <strong>Keys:</strong>
                <Grid>
                    <Row>
                        <Column col-4>aMap Key:</Column>
                        <Column clo-8 no-break>{{$geo._setting.aMap.key}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>bMap Key:</Column>
                        <Column clo-8 no-break>{{$geo._setting.bMap.key}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>qMap Key:</Column>
                        <Column clo-8 no-break>{{$geo._setting.qMap.key}}</Column>
                    </Row>
                </Grid>
                <strong>Options:</strong>
                <Grid>
                    <Row>
                        <Column>enableHighAccuracy:</Column>
                        <Column>{{$geo._setting.enableHighAccuracy}}</Column>
                    </Row>
                    <Row>
                        <Column>maximumAge:</Column>
                        <Column>{{$geo._setting.maximumAge}}</Column>
                    </Row>
                    <Row>
                        <Column>timeout:</Column>
                        <Column>{{$geo._setting.timeout}}</Column>
                    </Row>
                    <Row>
                        <Column>fallBack:</Column>
                        <Column>{{$geo._setting.fallBack}}</Column>
                    </Row>
                </Grid>
            </div>


            <h5 class="name">
                <span>默认方式:</span>
                <Button small outline @click="getGeolocationByH5" :disabled="!h5Geo">
                    重新获取
                </Button>
            </h5>
            <div padding class="name__content">
                <Grid>
                    <Row>
                        <Column col-4>lat:</Column>
                        <Column v-if="h5Geo">{{h5Geo.lat}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>lng:</Column>
                        <Column v-if="h5Geo">{{h5Geo.lng}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>mapType:</Column>
                        <Column v-if="h5Geo">{{h5Geo.mapType}}</Column>
                    </Row>
                    <Row v-if="h5Geo && h5Geo.full">
                        <Column col-4>address:</Column>
                        <Column>
                            {{h5Geo.full.province}} {{h5Geo.full.city}}
                        </Column>
                    </Row>
                    <Row v-if="h5Err">
                        <Column col-4>err:</Column>
                        <Column>{{h5Err}}</Column>
                    </Row>
                </Grid>
            </div>


            <h5 class="name">
                <span>腾讯地图:</span>
                <Button small outline @click="getGeolocationByqMap" :disabled="!qMapGeo">
                    重新获取
                </Button>
            </h5>
            <div padding class="name__content">
                <Grid>
                    <Row>
                        <Column col-4>lat:</Column>
                        <Column v-if="qMapGeo">{{qMapGeo.lat}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>lng:</Column>
                        <Column v-if="qMapGeo">{{qMapGeo.lng}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>mapType:</Column>
                        <Column v-if="qMapGeo">{{qMapGeo.mapType}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>address:</Column>
                        <Column v-if="qMapGeo">
                            {{qMapGeo.full.province}}{{qMapGeo.full.city}}{{qMapGeo.full.addr}}
                        </Column>
                    </Row>
                    <Row v-if="qMapErr">
                        <Column col-4>err:</Column>
                        <Column>{{qMapErr}}</Column>
                    </Row>
                </Grid>
            </div>

            <h5 class="name">
                <span>高德地图(阿里):</span>
                <Button small outline @click="getGeolocationByaMap" :disabled="!aMapGeo">
                    重新获取
                </Button>
            </h5>
            <div padding class="name__content">
                <Grid>
                    <Row>
                        <Column col-4>lat:</Column>
                        <Column v-if="aMapGeo">{{aMapGeo.lat}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>lng:</Column>
                        <Column v-if="aMapGeo">{{aMapGeo.lng}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>mapType:</Column>
                        <Column v-if="aMapGeo">{{aMapGeo.mapType}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>address:</Column>
                        <Column v-if="aMapGeo">
                            {{aMapGeo.full.formattedAddress}}
                        </Column>
                    </Row>
                    <Row v-if="aMapErr">
                        <Column col-4>err:</Column>
                        <Column>{{aMapErr}}</Column>
                    </Row>
                </Grid>
            </div>


            <h5 class="name">
                <span>百度地图:</span>
                <Button small outline @click="getGeolocationBybMap" :disabled="!bMapGeo">
                    重新获取
                </Button>
            </h5>
            <div padding class="name__content">
                <Grid>
                    <Row>
                        <Column col-4>lat:</Column>
                        <Column v-if="bMapGeo">{{bMapGeo.lat}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>lng:</Column>
                        <Column v-if="bMapGeo">{{bMapGeo.lng}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>mapType:</Column>
                        <Column v-if="bMapGeo">{{bMapGeo.mapType}}</Column>
                    </Row>
                    <Row>
                        <Column col-4>address:</Column>
                        <Column v-if="bMapGeo">
                            {{bMapGeo.full.address.province}}{{bMapGeo.full.address.city}}{{bMapGeo.full.address.district}}{{bMapGeo.full.address.street}}
                        </Column>
                    </Row>
                    <Row v-if="bMapErr">
                        <Column col-4>err:</Column>
                        <Column>{{bMapErr}}</Column>
                    </Row>
                </Grid>
            </div>

        </Content>
    </Page>
</template>
<style scoped lang="less">
    .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        background: #e0e0e0;
        height: 35px;
        margin: 0;
    }

    .name__content {
        background: #fff;
    }

    [no-break] {
        display: block; //如果是块儿级元素可以不用加
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'Geo',
    data () {
      return {
        h5Geo: null,
        h5Err: null,
        h5Timer: null,

        qMapGeo: null,
        qMapErr: null,
        qMapTimer: null,

        aMapGeo: null,
        aMapErr: null,
        aMapTimer: null,

        bMapGeo: null,
        bMapErr: null,
        bMapTimer: null
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      getGeolocationByH5 () {
        this.h5Geo = null
        this.h5Err = null
        return this.$geo.getCurrentPosition().then((position) => {
          this.h5Geo = position
        }, (error) => {
          this.h5Err = error
        })
      },
      getGeolocationByqMap () {
        this.qMapGeo = null
        this.qMapErr = null
        return this.$geo.getCurrentPosition('qMap').then((position) => {
          this.qMapGeo = position
        }, (error) => {
          this.qMapErr = error
        })
      },
      getGeolocationByaMap () {
        this.aMapGeo = null
        this.aMapErr = null
        return this.$geo.getCurrentPosition('aMap').then((position) => {
          this.aMapGeo = position
        }, (error) => {
          this.aMapErr = error
        })
      },
      getGeolocationBybMap () {
        this.bMapGeo = null
        this.bMapErr = null
        return this.$geo.getCurrentPosition('bMap').then((position) => {
          this.bMapGeo = position
        }, (error) => {
          this.bMapErr = error
        })
      }
    },
    mounted () {
      console.log('this.$geo')
      console.log(this.$geo)
      this.$platform.ready().then(() => {
        this.getGeolocationByH5().then(() => {})
        this.getGeolocationByqMap().then(() => {
          this.qMapTimer = this.$geo.watchPosition('qMap', (position) => {
            this.qMapGeo = position
          })
        })
        this.getGeolocationByaMap().then(() => {
          this.aMapTimer = this.$geo.watchPosition('aMap', (position) => {
            this.aMapGeo = position
          })
        })
        this.getGeolocationBybMap().then(() => {})
      }, () => {})
    },
    destroyed () {
      this.$geo.clearWatch(this.qMapTimer)
      this.$geo.clearWatch(this.aMapTimer)
    },
    activated () {},
    components: {}
  }
</script>
