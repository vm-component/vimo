<template>
    <vm-content class="outer-content vm-city-selector" ref="content">
        <article class="city-selector">
            <!--定位服务-->
            <article class="city-selector__group" v-if="showLocatedCity">
                <section sticky color="light" class="city-selector__group--header">
                    <span>你所在的地区</span>
                </section>
                <section class="city-selector__group--hotBox">
                    <div class="hotBox__wrap" @click="selectCity(currentCity)">
                        <div class="hotBox__wrap--city">{{currentCity.city}}</div>
                    </div>
                </section>
            </article>
            <!--热门城市-->
            <article class="city-selector__group" v-if="showHotCities && hotCityList.length>0">
                <section sticky color="light" class="city-selector__group--header" :id="'★' | getClassifyId">
                    <span>热门城市</span>
                </section>
                <section class="city-selector__group--hotBox">
                    <div class="hotBox__wrap" @click="selectCity(item)" v-for="item in hotCityList"
                         :key="item.adCode">
                        <div class="hotBox__wrap--city">{{item.city}}</div>
                    </div>
                </section>
            </article>
            <!--城市列表-->
            <article class="city-selector__group" v-for="(classify,index) in cityList" :key="index">
                <!--sticky-->
                <section class="city-selector__group--header" :id="classify.letter | getClassifyId">{{classify.letter}}
                </section>
                <section class="city-selector__group--item" v-for="item in classify.cities"
                         :key="item.adCode"
                         @click="selectCity(item)">
                    <div>{{item.city}}</div>
                </section>
            </article>
        </article>
        <div slot="fixedTop" class="vm-city-shortcut city-shortcut" ref="cityShortcut"
             @touchstart="onTouchShortcut"
             @touchmove="onTouchShortcut">
            <div class="shortcut__item" :data-id="item.name" v-for="item in shortcutList">{{item.name}}</div>
        </div>
    </vm-content>
</template>
<script type="text/javascript">
  import Modal from '../modal/index'
  import Content from '../base/content/content.vue'
  import { pointerCoord, clamp } from '../util/util'

  export default {
    name: 'cityList',
    components: {
      'vm-content': Content
    },
    data () {
      return {
        showLocatedCity: false,
        showHotCities: true,
        hotCityList: [],        // 数据源(最终渲染的数据)
        cityList: [],           // 数据源(最终渲染的数据)

        currentCity: {city: '正在定位', adcode: null},         // 当前城市，如果开启开启了定位的话

        shortcutTop: 0,         // shortcutElement距离页面顶部的距离
        shortcutList: []        // cityShortcut 的数组 A->Z
      }
    },
    filters: {
      getClassifyId (name) {
        return 'city-' + name.substr(0, 1)
      }
    },
    computed: {
      shortcutElement () {
        return this.$refs.cityShortcut
      },
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      /**
       * 触摸开始和移动
       * @private
       * */
      onTouchShortcut (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        let index = this.getSelectedIndex(ev)
        let isIOS = window.navigator.userAgent.toLowerCase().indexOf('iphone') > -1
        let isAlipay = window.navigator.userAgent.toLowerCase().indexOf('alipay') > -1
        if (isIOS && isAlipay) {
          this.contentComponent.scrollTo(0, this.shortcutList[index].top, 16 * 9)
        } else {
          this.contentComponent.scrollTo(0, this.shortcutList[index].top, 0)
        }
      },

      /**
       * 由数据初始化 cityShortcut
       * */
      initShortCut () {
        if (this.showHotCities) {
          this.shortcutList.push({
            name: '★',
            top: 0
          })
        }
        this.cityList.forEach((group) => {
          var name = group.letter.substr(0, 1)
          this.shortcutList.push({
            name: name,
            top: 0
          })
        })
      },

      /**
       * 根据传入的ev值获取当前在Shortcut上点击的是第几个item
       * @private
       * */
      getSelectedIndex (ev) {
        let point = pointerCoord(ev)
        let index = ((point.y - this.shortcutTop) / 16) >> 0
        index = clamp(0, index, this.shortcutList.length - 1)
        return index
      },

      /**
       * 点击选择城市
       * @private
       * */
      selectCity (result) {
        if (result.city && result.adCode) {
          Modal.dismiss(result)
        }
      },

      /**
       * 获取当前位置
       * @private
       * */
      getCurrentLocation () {
        function getScript (mapJsUrl) {
          return new Promise((resolve, reject) => {
            let sc = document.createElement('script')
            sc.type = 'text/javascript'
            sc.src = mapJsUrl
            sc.onload = sc.onreadystatechange = function () {
              if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
                resolve()
                sc.onload = sc.onreadystatechange = null
              }
            }
            sc.onerror = function (err) {
              reject(err)
              sc.onerror = null
            }
            document.body.appendChild(sc)
          })
        }

        return new Promise((resolve, reject) => {
          let getCurrentPosition = () => {
            new window.AMap.Geolocation().getCurrentPosition((status, result) => {
              if (status === 'complete') {
                resolve(result)
              } else {
                reject(status)
              }
            })
          }

          if (typeof window.AMap === 'undefined') {
            getScript(`//webapi.amap.com/maps?v=1.3&key=${this.$options.$data.ak}`).then(() => {
              window.setTimeout(function () {
                if (!window.AMap || !window.AMap.Map) { return }
                let map = new window.AMap.Map('')
                map.plugin('AMap.Geolocation', () => {
                  /**
                   * @param {object} posOptions - 传入参数
                   * @param {boolean} [posOptions.enableHighAccuracy=true] - 是否使用高精度定位，默认:true
                   * @param {number} [posOptions.timeout=10000] - 超过10秒后停止定位，默认：无穷大
                   * @param {number} 9posOptions.maximumAge=00 - 定位结果缓存0毫秒，默认：0
                   * */
                  getCurrentPosition()
                })
              }, 100)
            }, (err) => {
              reject(err)
            })
          } else {
            getCurrentPosition()
          }
        })
      },

      /**
       * 将传入的一维数据按照首字母整理，用于显示
       * @private
       * */
      sortCityList (cities) {
        // hash object for filter
        let store = {}
        let cityList = []
        cities.forEach((city) => {
          let letter = city.spell.charAt(0).toUpperCase()
          if (store[letter]) {
            store[letter].push(city)
          } else {
            store[letter] = [city]
          }
        })

        for (let key in store) {
          cityList.push({
            'letter': key,
            'cities': store[key]
          })
        }
        return cityList
      },

      /**
       * 初始化获取当前城市
       * @private
       * */
      initLocatedCity () {
        if (this.showLocatedCity) {
          this.getCurrentLocation().then((data) => {
            if (data && data.addressComponent) {
              this.currentCity = {
                adCode: data.addressComponent.adcode,
                city: data.addressComponent.city
              }
            }
          }, () => {
            this.currentCity = {
              adCode: null,
              city: '定位失败'
            }
          })
        }
      }
    },
    created () {
      this.showLocatedCity = this.$options.$data.showLocatedCity
      this.showHotCities = this.$options.$data.showHotCities
      this.hotCityList = this.$options.$data.hotCities
      this.cityList = this.sortCityList(this.$options.$data.cities)
      this.initLocatedCity()
      this.initShortCut()
    },
    mounted () {
      let clientHeight = this.shortcutElement.clientHeight || 0
      let docHieght = window.document.documentElement.clientHeight || 0
      this.shortcutTop = (docHieght - clientHeight) / 2
      this.shortcutList.forEach((item) => {
        let el = document.getElementById('city-' + item.name)
        item.top = el.offsetTop + 1
      })
    }
  }
</script>
<style lang="less">
    .vm-city-selector {
        .city-selector {
            .city-selector__group--header {
                font-size: 14px;
                color: #000;
                background-color: #f4f4f4;
                padding-left: 16px;
                position: relative;
                transition: background-color 200ms linear;
                z-index: 100;
                display: flex;
                overflow: hidden;
                align-items: center;
                justify-content: space-between;
                margin: 0;
                width: 100%;
                min-height: 30px;
            }
            .city-selector__group--item {
                position: relative;
                padding-left: 16px;
                border-radius: 0;
                font-size: 16px;
                color: #000;
                background-color: #fff;
                transition: background-color 200ms linear;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                overflow: hidden;
                align-items: center;
                justify-content: space-between;
                & > div {
                    display: block;
                    margin: 0;
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    border: 0;
                    text-decoration: none;
                    border-bottom: 1px solid #c8c7cc;
                    padding-right: 8px;
                    flex: 1;
                    flex-direction: inherit;
                }
            }
            .city-selector__group--item:last-child {
                border-bottom: 1px solid #c8c7cc;
                & > div {
                    border: none;
                }
            }
            .city-selector__group--item:active {
                background-color: #d9d9d9;
                transition-duration: 0ms;
            }
            .city-selector__group--hotBox {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
                padding: 0 14px;
                margin: 0 auto;
                background-color: #f4f4f4;
                .hotBox__wrap {
                    box-sizing: border-box;
                    width: 25%;
                    .hotBox__wrap--city {
                        margin: 4px;
                        border-radius: 6px;
                        background-color: #fff;
                        background-clip: padding-box;
                        text-align: center;
                        padding: 12px 0;
                        transition: background-color 200ms linear;
                        &:active {
                            background: #d9d9d9;
                        }
                    }
                }
            }
        }

        .city-shortcut {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: absolute;
            top: 50%;
            right: 0;
            flex-direction: column;
            width: 46px;
            padding-right: 2px;
            transform: translateY(-50%);
            .shortcut__item {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 16px;
                width: 16px;
                font-size: 12px;
            }
        }
    }
</style>
