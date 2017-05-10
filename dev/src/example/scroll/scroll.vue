<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Scroll</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
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
    mounted () {},
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
  }
</script>
