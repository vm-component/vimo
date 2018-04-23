<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" ref="content">
            <Scroll :click="true" :probeType="3" ref="scroll" class="scrollBox">
                <List>
                    <ItemGroup v-for="(classify,index) in cityList" :key="index">
                        <ItemDivider sticky color="light" class="itemGroup" :id="classify.name | getClassifyId">
                            {{classify.name}}
                        </ItemDivider>
                        <Item @click.native="getResult(city)" v-for="city in classify.cities" :key="city.cityid">{{city.name}}</Item>
                    </ItemGroup>
                </List>
            </Scroll>
            <div class="shortcut" ref="shortcut">
                <div class="shortcut__item" v-for="item in shortcutList">{{item.name}}</div>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .scrollBox {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .itemGroup {
        font-size: 14px;
    }

    .shortcut {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        top: 50%;
        right: 0;
        flex-direction: column;
        width: 46px;
        padding-right: 2px;
        transform: translateY(-50%);
        z-index: 1;

        touch-action: none;
        .shortcut__item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 16px;
            width: 16px;
            font-size: 12px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-active {
        transition-delay: 200ms;
        opacity: 0
    }
</style>
<script type="text/javascript">
  import PointerEvents from 'tp-pointer-events'
  import CITY_LIST from '../assets/cityList'
  import { clamp, pointerCoord } from '../../../src/util/util'

  export default {
    name: 'DemoScrollCity',
    i18n: {
      messages: {
        'zh-CN': {
          title: '城市列表',
        },
        'en-US': {
          title: 'City Scroll',
        }
      }
    },
    data () {
      return {
        pointerEvents: null,
        shortcutMatrix: null,   // shortcutElement的尺寸矩阵
        cityList: CITY_LIST,    // 数据源
        shortcutList: []        // shortcut 的数组 A->Z
      }
    },
    filters: {
      getClassifyId (name) {
        return 'city-' + name.substr(0, 1)
      }
    },
    computed: {
      scrollComponent () {
        return this.$refs.scroll
      },
      shortcutElement () {
        return this.$refs.shortcut
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

        const index = this.getSelectedIndex(ev)

        if (this.shortcutList[index]) {
          this.scrollComponent.jsScrollInstance.scrollTo(0, this.shortcutList[index].top * -1, 0)
          return true
        }
        return false
      },

      /**
       * 由数据初始化 shortcut
       * */
      initShortCut () {
        this.cityList.forEach((group) => {
          var name = group.name.substr(0, 1)
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
        let index = parseInt((point.y - this.shortcutMatrix.top) / 16)
        index = clamp(0, index, this.shortcutList.length)
        return index
      },

      getResult (res) {
        console.log('res:', JSON.parse(JSON.stringify(res)))
      }
    },
    created () {
      this.initShortCut()
    },
    mounted () {
      this.pointerEvents = new PointerEvents(this.shortcutElement, this.onTouchShortcut, this.onTouchShortcut, null, {})

      this.shortcutMatrix = this.shortcutElement.getBoundingClientRect()
      this.shortcutList.forEach((item) => {
        let el = document.getElementById('city-' + item.name)
        item.top = el.offsetTop + 1
      })
    },
    destroyed () {
      this.pointerEvents && this.pointerEvents.destroy()
    }
  }
</script>
