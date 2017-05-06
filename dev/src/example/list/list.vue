<template>
    <Page>
        <Header>
            <Navbar>
                <Title>List</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <!--header-->
                <ListHeader>
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item detail-push to="list.listForAll">ListForAll</Item>
                    <Item detail-push :to="{name:'list.basicList'}">BasicList</Item>
                    <Item detail-push :to="{name:'list.noLine'}">NoLine</Item>
                    <Item detail-push :to="{name:'list.insetList'}">InsetList</Item>
                    <Item detail-push :to="{name:'list.listDividers'}">ListDividers</Item>
                    <Item detail-push :to="{name:'list.listHeaders'}">listHeaders</Item>
                    <Item detail-push :to="{name:'list.iconList'}">IconList</Item>
                    <Item detail-push :to="{name:'list.avatarList'}">AvatarList</Item>
                    <Item detail-push :to="{name:'list.multi-lineList'}">Multi-lineList</Item>
                    <Item detail-push :to="{name:'list.slidingList'}">SlidingList</Item>
                    <Item detail-push :to="{name:'list.reorder'}">Reorder</Item>
                    <Item detail-push :to="{name:'list.thumbnailList'}">ThumbnailList</Item>
                    <Item detail-push :to="{name:'list.collapse'}">折叠列表</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    data () {
      return {
        toggleValue: true,
        silencePhone: 'always'
      }
    },
    watch: {
      toggleValue () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    methods: {
      toggleChange (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    },
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    }
  }
</script>
