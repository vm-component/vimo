<template>
    <Page>
        <Header>
            <Navbar>
                <Title>City</Title>
            </Navbar>
        </Header>
        <Content class="outer-content" ref="content"
                 :enableJsScroll="$route.query.enableJsScroll">
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
                 @touchmove="onTouchShortcut">
                <div class="shortcut__item" :data-id="item" v-for="item in shortcutList">{{item}}</div>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .itemGroup {
        font-size: 14px;
    }

    .shortcut {
        display: flex;
        position: absolute;
        top: 50%;
        right: 2px;
        flex-direction: column;
        width: 16px;
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
  import CITY_LIST from './cityList'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { pointerCoord, clamp } from 'vimo/util/util'
  export default{
    name: 'cityList',
    data () {
      return {
        shortcutMatrix: null,
        cityList: CITY_LIST,
        shortcutList: []
      }
    },
    filters: {
      getClassifyId (name) {
        return 'city-' + name.substr(0, 1)
      }
    },
    computed: {
      enableJsScroll(){
        return this.$route.query.enableJsScroll === 'true'
      },
      shortcutElement () {
        return this.$refs.shortcut
      },
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      onTouchShortcut (ev) {
        let index = this.getSelectedIndex(ev)
        let id = this.shortcutList[index]
        let el = document.getElementById('city-' + id)
        this.contentComponent.scrollToElement(el, 0, null, 0)
      },
      initShortCut () {
        this.cityList.forEach((group) => {
          var name = group.name.substr(0, 1)
          this.shortcutList.push(name)
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
      this.initShortCut()
    },
    mounted () {
      this.shortcutMatrix = this.shortcutElement.getBoundingClientRect()
    },
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    }
  }
</script>
