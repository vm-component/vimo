<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Geo</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <div padding>
                <h5>简介</h5>
                <p>this.$geo支持四种方式获取当前地理位置信息: H5原生方式/腾讯地图/高德地图/百度地图. 默认情况下, IOS平台在HTTP模式下不能使用原生获取地理位置.</p>
            </div>


            <h5 class="name">当前参数:</h5>

            <div padding class="name__content">
                <strong>Keys:</strong>
                <vm-grid>
                    <vm-row>
                        <vm-col col-4>aMap Key:</vm-col>
                        <vm-col clo-8 no-break>{{$geo._setting.aMap.key}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>bMap Key:</vm-col>
                        <vm-col clo-8 no-break>{{$geo._setting.bMap.key}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>qMap Key:</vm-col>
                        <vm-col clo-8 no-break>{{$geo._setting.qMap.key}}</vm-col>
                    </vm-row>
                </vm-grid>
                <strong>Options:</strong>
                <vm-grid>
                    <vm-row>
                        <vm-col>enableHighAccuracy:</vm-col>
                        <vm-col>{{$geo._setting.enableHighAccuracy}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>maximumAge:</vm-col>
                        <vm-col>{{$geo._setting.maximumAge}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>timeout:</vm-col>
                        <vm-col>{{$geo._setting.timeout}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col>fallBack:</vm-col>
                        <vm-col>{{$geo._setting.fallBack}}</vm-col>
                    </vm-row>
                </vm-grid>
            </div>


            <h5 class="name">
                <span>默认方式:</span>
                <vm-button small outline @click="getGeolocationByH5" :disabled="!h5Geo">
                    重新获取
                </vm-button>
            </h5>
            <div padding class="name__content">
                <vm-grid>
                    <vm-row>
                        <vm-col col-4>lat:</vm-col>
                        <vm-col v-if="h5Geo">{{h5Geo.lat}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>lng:</vm-col>
                        <vm-col v-if="h5Geo">{{h5Geo.lng}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>mapType:</vm-col>
                        <vm-col v-if="h5Geo">{{h5Geo.mapType}}</vm-col>
                    </vm-row>
                    <vm-row v-if="h5Geo && h5Geo.full">
                        <vm-col col-4>address:</vm-col>
                        <vm-col>
                            {{h5Geo.full.province}} {{h5Geo.full.city}}
                        </vm-col>
                    </vm-row>
                    <vm-row v-if="h5Err">
                        <vm-col col-4>err:</vm-col>
                        <vm-col>{{h5Err}}</vm-col>
                    </vm-row>
                </vm-grid>
            </div>


            <h5 class="name">
                <span>腾讯地图:</span>
                <vm-button small outline @click="getGeolocationByqMap" :disabled="!qMapGeo">
                    重新获取
                </vm-button>
            </h5>
            <div padding class="name__content">
                <vm-grid>
                    <vm-row>
                        <vm-col col-4>lat:</vm-col>
                        <vm-col v-if="qMapGeo">{{qMapGeo.lat}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>lng:</vm-col>
                        <vm-col v-if="qMapGeo">{{qMapGeo.lng}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>mapType:</vm-col>
                        <vm-col v-if="qMapGeo">{{qMapGeo.mapType}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>address:</vm-col>
                        <vm-col v-if="qMapGeo">
                            {{qMapGeo.full.province}}{{qMapGeo.full.city}}{{qMapGeo.full.addr}}
                        </vm-col>
                    </vm-row>
                    <vm-row v-if="qMapErr">
                        <vm-col col-4>err:</vm-col>
                        <vm-col>{{qMapErr}}</vm-col>
                    </vm-row>
                </vm-grid>
            </div>

            <h5 class="name">
                <span>高德地图(阿里):</span>
                <vm-button small outline @click="getGeolocationByaMap" :disabled="!aMapGeo">
                    重新获取
                </vm-button>
            </h5>
            <div padding class="name__content">
                <vm-grid>
                    <vm-row>
                        <vm-col col-4>lat:</vm-col>
                        <vm-col v-if="aMapGeo">{{aMapGeo.lat}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>lng:</vm-col>
                        <vm-col v-if="aMapGeo">{{aMapGeo.lng}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>mapType:</vm-col>
                        <vm-col v-if="aMapGeo">{{aMapGeo.mapType}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>address:</vm-col>
                        <vm-col v-if="aMapGeo">
                            {{aMapGeo.full.formattedAddress}}
                        </vm-col>
                    </vm-row>
                    <vm-row v-if="aMapErr">
                        <vm-col col-4>err:</vm-col>
                        <vm-col>{{aMapErr}}</vm-col>
                    </vm-row>
                </vm-grid>
            </div>


            <h5 class="name">
                <span>百度地图:</span>
                <vm-button small outline @click="getGeolocationBybMap" :disabled="!bMapGeo">
                    重新获取
                </vm-button>
            </h5>
            <div padding class="name__content">
                <vm-grid>
                    <vm-row>
                        <vm-col col-4>lat:</vm-col>
                        <vm-col v-if="bMapGeo">{{bMapGeo.lat}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>lng:</vm-col>
                        <vm-col v-if="bMapGeo">{{bMapGeo.lng}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>mapType:</vm-col>
                        <vm-col v-if="bMapGeo">{{bMapGeo.mapType}}</vm-col>
                    </vm-row>
                    <vm-row>
                        <vm-col col-4>address:</vm-col>
                        <vm-col v-if="bMapGeo">
                            {{bMapGeo.full.address.province}}{{bMapGeo.full.address.city}}{{bMapGeo.full.address.district}}{{bMapGeo.full.address.street}}
                        </vm-col>
                    </vm-row>
                    <vm-row v-if="bMapErr">
                        <vm-col col-4>err:</vm-col>
                        <vm-col>{{bMapErr}}</vm-col>
                    </vm-row>
                </vm-grid>
            </div>

        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">
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
