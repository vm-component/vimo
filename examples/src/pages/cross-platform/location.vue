<template>
    <Page>
        <Header>
            <Navbar>
                <Title>位置</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>位置</h4>
            <section>
                <strong>获取当前地理位置(需要权限)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">精度半径(m): </Label>
                    <Input placeholder="期望定位精度半径" type="number" v-model="targetAccuracy" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">坐标类型: </Label>
                    <Input placeholder="1获取高德坐标, 0获取标准坐标" type="number" v-model="coordinate" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">逆地理编码信息</Label>
                    <Toggle slot="item-right" v-model="withReGeocode"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">缓存</Label>
                    <Toggle slot="item-right" v-model="useCache"></Toggle>
                </Item>

                <Button block @click="getGeolocation()">getGeolocation</Button>
                <strong>结果</strong>
                <p class="result">{{getGeolocationResult}}</p>
            </section>
            <section>
                <strong>地图定位(需要权限)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">纬度: </Label>
                    <Input placeholder="纬度" type="number" v-model="latitude" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">经度: </Label>
                    <Input placeholder="经度" type="number" v-model="longitude" clearInput></Input>
                </Item>
                <Button block @click="mapLocate()">mapLocate</Button>
                <strong>结果</strong>
                <p class="result">{{mapLocateResult}}</p>
            </section>
            <section>
                <strong>POI搜索(需要权限)</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">纬度: </Label>
                    <Input placeholder="纬度" type="number" v-model="latitude" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">经度: </Label>
                    <Input placeholder="经度" type="number" v-model="longitude" clearInput></Input>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">搜索半径: </Label>
                    <Input placeholder="经度" type="number" v-model="scope" clearInput></Input>
                </Item>

                <Button block @click="mapSearch()">mapSearch</Button>
                <strong>结果</strong>
                <p class="result">{{mapSearchResult}}</p>
            </section>

            <!--dtdream特有-->
            <h4>DtDream</h4>
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

<script type="text/javascript">
  export default {
    name: 'Location',
    data () {
      return {
        // result
        getGeolocationResult: '',
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: false,
        useCache: true,

        latitude: 39.903578,
        longitude: 116.473565,
        mapLocateResult: '',

        scope: 500,
        mapSearchResult: '',

        selectLocalCityResult: '',
        selectCityResult: '',
        getLocationResult: '',

        last: ''
      }
    },
    methods: {
      getGeolocation () {
        const _this = this
        window.dd && window.dd.device.geolocation.get({
          targetAccuracy: _this.targetAccuracy,
          coordinate: _this.coordinate,
          withReGeocode: _this.withReGeocode,
          useCache: _this.useCache, //默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess (data) {
            /* 高德坐标 result 结构
            {
                longitude : Number,
                latitude : Number,
                accuracy : Number,
                address : String,
                province : String,
                city : String,
                district : String,
                road : String,
                netType : String,
                operatorType : String,
                errorMessage : String,
                errorCode : Number,
                isWifiEnabled : Boolean,
                isGpsEnabled : Boolean,
                isFromMock : Boolean,
                provider : wifi|lbs|gps,
                accuracy : Number,
                isMobileEnabled : Boolean
            }
            */
            _this.getGeolocationResult = `onSuccess ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.getGeolocationResult = `onFail ${JSON.stringify(err)}`
          }
        })
      },
      mapLocate () {
        const _this = this
        window.dd && window.dd.biz.map.locate({
          latitude: _this.latitude, // 纬度
          longitude: _this.longitude, // 经度
          onSuccess (data) {
            /* 高德坐标 result 结构
            {
                longitude : Number,
                latitude : Number,
                accuracy : Number,
                address : String,
                province : String,
                city : String,
                district : String,
                road : String,
                netType : String,
                operatorType : String,
                errorMessage : String,
                errorCode : Number,
                isWifiEnabled : Boolean,
                isGpsEnabled : Boolean,
                isFromMock : Boolean,
                provider : wifi|lbs|gps,
                accuracy : Number,
                isMobileEnabled : Boolean
            }
            */
            _this.mapLocateResult = `onSuccess ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.mapLocateResult = `onFail ${JSON.stringify(err)}`
          }
        })
      },
      mapSearch () {
        const _this = this
        window.dd && window.dd.biz.map.search({
          latitude: _this.latitude, // 纬度
          longitude: _this.longitude, // 经度
          scope: _this.scope, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
          onSuccess (data) {
            _this.mapSearchResult = `onSuccess ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.mapSearchResult = `onFail ${JSON.stringify(err)}`
          }
        })
      },

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
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .item {
        margin: 5px 0;
    }
</style>
