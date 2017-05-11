<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Scroll</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <p>Scroll组件是对better-scroll的包装, 因此使用参考它的API即可</p>
            </div>
            <List>
                <ListHeader>示例</ListHeader>
                <Item detail-push :to="{name:'normalScroll'}">简单示例</Item>
                <Item detail-push :to="{name:'cityScroll'}">城市列表</Item>
                <!--<Item>1</Item>-->
                <!--<Item>1</Item>-->
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">

  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      console.log('scroll.vue 页面文件, 这个肯定是keepalive的')
      console.log(this)

    },
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
  }
</script>
