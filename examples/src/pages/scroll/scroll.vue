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
                <Item button :to="{name:'normalScroll'}">简单示例</Item>
                <Item button :to="{name:'cityScroll'}">城市列表</Item>
                <Item button :to="{name:'userCenterScroll'}">用户中心</Item>
                <!--<Item>1</Item>-->
                <!--<Item>1</Item>-->
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
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
    },
    activated () {}
  }
</script>
