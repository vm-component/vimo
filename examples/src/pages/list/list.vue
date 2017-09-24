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
                    <Item button to="list.listForAll">全特性</Item>
                    <Item button :to="{name:'list.basicList'}">基础List</Item>
                    <Item button :to="{name:'list.noLine'}">没有Border</Item>
                    <Item button :to="{name:'list.insetList'}">嵌入模式</Item>
                    <Item button :to="{name:'list.listDividers'}">List分隔符</Item>
                    <Item button :to="{name:'list.listHeaders'}">ListHeader</Item>
                    <Item button :to="{name:'list.iconList'}">带Icon的List</Item>
                    <Item button :to="{name:'list.avatarList'}">圆形头像List</Item>
                    <Item button :to="{name:'list.thumbnailList'}">方形头像List</Item>
                    <Item button :to="{name:'list.multi-lineList'}">多行元素</Item>
                    <Item button :to="{name:'list.slidingList'}">滑动列表</Item>
                    <!--<Item button :to="{name:'list.reorder'}">Reorder</Item>-->
                    <Item button :to="{name:'list.collapse'}">折叠列表</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
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
    }
  }
</script>
