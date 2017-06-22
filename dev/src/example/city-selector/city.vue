<template>
    <Page>
        <Header>
            <Navbar>
                <Title>城市选择</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" ref="content">
            <article class="citySelector">
                <article class="citySelector__group">
                    <section sticky color="light" class="citySelector__group--header" :id="'★' | getClassifyId">
                        <span>★ 热门城市</span>
                    </section>
                    <section class="citySelector__group--hotBox">
                        <div class="hotBox__wrap" @click="selectCity(city)" v-for="city in hotCityList"
                             :key="city.code">
                            <div class="hotBox__wrap--city">{{city.text}}</div>
                        </div>
                    </section>
                </article>
                <article class="citySelector__group" v-for="(classify,index) in cityList" :key="index">
                    <!--sticky-->
                    <section class="citySelector__group--header" :id="classify.letter | getClassifyId">{{classify.letter}}</section>
                    <section class="citySelector__group--item" v-for="city in classify.cities"
                             :key="city.code"
                             @click="selectCity(city)">
                        <div>{{city.text}}</div>
                    </section>
                </article>
            </article>
            <div slot="fixedTop" class="cityShortcut" ref="cityShortcut"
                 @touchstart="onTouchShortcut"
                 @touchmove="onTouchShortcut">
                <div class="shortcut__item" :data-id="item" v-for="item in shortcutList">{{item.name}}</div>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .citySelector {
        .citySelector__group--header {
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
        .citySelector__group--item {
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
        .citySelector__group--item:last-child {
            border-bottom: 1px solid #c8c7cc;
            & > div {
                border: none;
            }
        }
        .citySelector__group--item:active {
            background-color: #d9d9d9;
            transition-duration: 0ms;
        }
        .citySelector__group--hotBox {
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

    .cityShortcut {
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
        z-index: 999;
        .shortcut__item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 16px;
            width: 16px;
            font-size: 12px;
        }
    }
</style>
<script type="text/javascript">
  import cityWithCode from './cityWithCode.json'
  import { Modal } from 'vimo/components/modal'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { pointerCoord, clamp } from 'vimo/util/util'
  export default{
    name: 'cityList',
    data () {
      return {
        shortcutMatrix: null,   // shortcutElement的尺寸矩阵
        hotCityList: cityWithCode.hotcities,    // 数据源
        cityList: cityWithCode.areas,           // 数据源
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
       * */
      onTouchShortcut (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        let index = this.getSelectedIndex(ev)
        if (this.$platform.is('ios') && this.$platform.is('alipay')) {
          this.contentComponent.scrollTo(0, this.shortcutList[index].top, 16 * 9)
        } else {
          this.contentComponent.scrollTo(0, this.shortcutList[index].top, 0)
        }
      },

      /**
       * 由数据初始化 cityShortcut
       * */
      initShortCut () {
        this.shortcutList.push({
          name: '★',
          top: 0
        })
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
       * */
      getSelectedIndex (ev) {
        let point = pointerCoord(ev)
        let index = ((point.y - this.shortcutMatrix.top) / 16) >> 0
        index = clamp(0, index, this.shortcutList.length - 1)
        return index
      },

      /**
       * 点击选择城市
       * */
      selectCity (city) {
        Modal.dismiss(city)
      }
    },
    created () {
      this.initShortCut()
    },
    mounted () {
      this.shortcutMatrix = this.shortcutElement.getBoundingClientRect()
      this.shortcutList.forEach((item) => {
        let el = document.getElementById('city-' + item.name)
        item.top = el.offsetTop + 1
      })
    },
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    }
  }
</script>
