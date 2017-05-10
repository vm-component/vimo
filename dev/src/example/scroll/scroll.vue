<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Scroll</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <Test></Test>

            <List>
                <ListHeader>示例</ListHeader>
                <Item detail-push :to="{name:'normalScroll'}">简单示例</Item>
                <Item>1</Item>
                <Item>1</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">

  var myMixin = {
    created: function () {
      this.hello()
    },
    methods: {
      hello: function () {
        console.info('hello from mixin!')
        console.info('hello from mixin!')
        console.info('hello from mixin!')
      }
    }
  }

  import Test from './test.vue'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    name: 'name',
    mixins: [myMixin],
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
    components: {Test, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
  }
</script>
