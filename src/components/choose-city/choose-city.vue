<template>
    <transition
            name="fade-right"
            @before-enter="beforeEnter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @after-leave="afterLeave">
        <article class="vm-city-selector" v-show="isActive">
            <div class="city-shortcut" ref="cityShortcut"
                 @touchstart="onTouchShortcut"
                 @touchmove="onTouchShortcut">
                <div class="shortcut-item" :data-id="item.name" v-for="item in shortcutList">{{item.name}}</div>
            </div>
            <div class="city-selector-container" ref="content">
                <div class="city-selector">
                    <!--定位服务-->
                    <article class="city-selector__group" v-if="showLocatedCity">
                        <section sticky color="light" class="group-header">
                            <span>你所在的地区</span>
                        </section>
                        <section class="group-hotbox">
                            <div class="hotbox-wrap" @click="selectCity(currentCity)">
                                <div class="wrap-city">{{currentCity.city}}</div>
                            </div>
                        </section>
                    </article>
                    <!--热门城市-->
                    <article class="city-selector__group" v-if="showHotCities && hotCities.length>0">
                        <section sticky color="light" class="group-header" :id="'★' | getClassifyId">
                            <span>热门城市</span>
                        </section>
                        <section class="group-hotbox">
                            <div class="hotbox-wrap" @click="selectCity(item)" v-for="item in hotCities"
                                 :key="item.adCode">
                                <div class="wrap-city">{{item.city}}</div>
                            </div>
                        </section>
                    </article>
                    <!--城市列表-->
                    <article class="city-selector__group" v-for="(classify,index) in cityList" :key="index">
                        <!--sticky-->
                        <section class="group-header" :id="classify.letter | getClassifyId">{{classify.letter}}
                        </section>
                        <section class="group-item" v-for="item in classify.cities"
                                 :key="item.adCode"
                                 @click="selectCity(item)">
                            <div>{{item.city}}</div>
                        </section>
                    </article>
                </div>
            </div>
        </article>
    </transition>
</template>
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  import { pointerCoord, clamp } from '../../util/util'
  import popupExtend from '../../util/popup-extend'
  import loadScript from '../../util/load-script'

  export default {
    name: 'ChooseCity',
    extends: popupExtend,
    props: {
      showLocatedCity: Boolean,
      showHotCities: {
        type: Boolean,
        default: true
      },
      hotCities: {
        type: Array,
        default () {
          return require('./data/hot-cities.json')
        }
      },
      cities: {
        type: Array,
        default () {
          return require('./data/cities.json')
        }
      },
      ak: {
        type: String,
        default: '8d1ba642a3a3046d1ee087e0f8b490a2'
      },
      onDismiss: {
        type: Function,
        default: function () {}
      }
    },
    data () {
      return {
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
      },
      cityList () {
        return this.sortCityList(this.cities)
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
        this.contentComponent.scrollTo(0, this.shortcutList[index].top, 0)
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
          this.onDismiss(JSON.parse(JSON.stringify(result)))
          this.dismiss()
        }
      },

      /**
       * 获取当前位置
       * @private
       * */
      getCurrentLocation () {
        return new Promise((resolve, reject) => {
          if (!window.AMap) {
            loadScript(`https://webapi.amap.com/maps?v=1.3&key=${this.ak}`, () => {
              window.setTimeout(() => {
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
              }, 50)
            })
          } else {
            getCurrentPosition()
          }

          function getCurrentPosition () {
            new window.AMap.Geolocation({
              timeout: 1,    // 超过10秒后停止定位，
              maximumAge: 60000  // 定位结果缓存0毫秒，60s
            }).getCurrentPosition((status, result) => {
              if (status === 'complete') {
                resolve(result)
              } else {
                reject(status)
              }
            })
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
        let _cities = []
        cities.forEach((city) => {
          let letter = city.spell.charAt(0).toUpperCase()
          if (store[letter]) {
            store[letter].push(city)
          } else {
            store[letter] = [city]
          }
        })

        for (let key in store) {
          _cities.push({
            'letter': key,
            'cities': store[key]
          })
        }

        // 字母排序
        let _map = {}
        _cities.forEach((item, index) => {
          _map[item.letter] = index
        })

        let _keys = Object.keys(_map)
        _keys.sort()

        let _tmp = []
        _keys.forEach((item) => {
          _tmp.push(_cities[_map[item]])
        })

        return _tmp
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
      this.initLocatedCity()
      this.initShortCut()
    },
    mounted () {
      this.$on('popup:afterEnter', () => {
        let clientHeight = this.shortcutElement.offsetHeight || 0
        let docHieght = window.innerHeight || 0
        this.shortcutTop = (docHieght - clientHeight) / 2
        this.shortcutList.forEach((item) => {
          let el = document.getElementById('city-' + item.name)
          item.top = el.offsetTop + 1
        })
      })
    }
  }
</script>
