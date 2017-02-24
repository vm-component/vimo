<template>
  <Page>
    <Header>
      <Navbar>
        <Title>List</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <!--header-->
        <ListHeader>
          Contents
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name:'list.listForAll'}">ListForAll</Item>
          <Item button :to="{name:'list.basicList'}">BasicList</Item>
          <Item button :to="{name:'list.noLine'}">NoLine</Item>
          <Item button :to="{name:'list.insetList'}">InsetList</Item>
          <Item button :to="{name:'list.listDividers'}">ListDividers</Item>
          <Item button :to="{name:'list.listHeaders'}">listHeaders</Item>
          <Item button :to="{name:'list.iconList'}">IconList</Item>
          <Item button :to="{name:'list.avatarList'}">AvatarList</Item>
          <Item button :to="{name:'list.multi-lineList'}">Multi-lineList</Item>
          <Item button :to="{name:'list.slidingList'}">SlidingList</Item>
          <Item button :to="{name:'list.thumbnailList'}">ThumbnailList</Item>

        </ItemGroup>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        toggleValue: true,
        silencePhone: 'always',
      }
    },
    watch: {
      toggleValue () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    computed: {},
    methods: {
      toggleChange (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    components: {}
  }
</script>
