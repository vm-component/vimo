<template>
    <Page>
        <Header>
            <Navbar>
                <Title>City</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" ref="content" :enableJsScroll="enableJsScroll">
            <List>
                <ItemGroup v-for="(classify,index) in cityList" :key="index">
                    <ItemDivider color="light" class="itemGroup" :id="classify.name | getClassifyId">
                        {{classify.name}}
                    </ItemDivider>
                    <Item v-for="city in classify.cities" :key="city.cityid">{{city.name}}</Item>
                </ItemGroup>
            </List>
            <div slot="fixedTop" class="shortcut" ref="shortcut"
                 @touchstart="onTouchShortcut"
                 @touchend="onTouchEndShortcut"
                 @touchmove="onTouchShortcut">
                <div class="shortcut__item" :data-id="item" v-for="item in shortcutList">{{item.name}}</div>
            </div>

            <div slot="fixedTop" class="centered" :class="{'show':(isTouching && selectedId)}">
                <div class="centered__inner">
                    <span>{{selectedId}}</span>
                </div>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .itemGroup {
        font-size: 14px;
    }

    .centered {
        top: 50%;
        left: 50%;
        background: red;
        height: 0;
        width: 0;
        .centered__inner {
            width: 60px;
            height: 60px;
            margin-left: -30px;
            margin-top: -60px;
            font-weight: bold;
            border-radius: 5px;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
            opacity: 0;
            visibility: hidden;
        }
    }

    .centered.show {
        .centered__inner {
            opacity: 1;
            visibility: visible;
        }
    }

    .shortcut {
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-active {
        transition-delay: 200ms;
        opacity: 0
    }
</style>
<script type="text/javascript">
  import CITY_LIST from './cityList'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { pointerCoord, clamp } from 'vimo/util/util'
  export default{
    name: 'cityList',
    data () {
      return {
        isTouching: false,      // 正在touching shortcut
        selectedId: null,       // 当前选择的id
        enableJsScroll: false,  // scroll引擎
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

        this.isTouching = true
        let index = this.getSelectedIndex(ev)
        this.selectedId = this.shortcutList[index].name
        this.contentComponent.scrollTo(0, this.shortcutList[index].top, 0)
      },

      /**
       * 触摸停止
       * */
      onTouchEndShortcut (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        this.isTouching = false
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
      }
    },
    created () {
      this.enableJsScroll = this.$route.query.enableJsScroll
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
