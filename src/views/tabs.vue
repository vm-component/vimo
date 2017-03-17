<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Tabs</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <ListHeader>Demo列表</ListHeader>
        <Item button :to="{name:'tabs.tabsBottom'}">Tab Bottom</Item>
        <Item button :to="{name:'tabs.tabsTop'}">Tab Top</Item>
        <Item button :to="{name:'tabs.iconOnly'}">Icon Only</Item>
        <Item button :to="{name:'tabs.iconLeft'}">Icon Left</Item>
        <Item button :to="{name:'tabs.iconBottom'}">Icon Bottom</Item>
        <Item button :to="{name:'tabs.titleOnly'}">Title Only</Item>



        <Item button :to="{name:'tabs.tabHighLight'}">Tab HighLight</Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">

  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
