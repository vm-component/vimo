<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Badage</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <h5>
                    <Badge>组件</Badge>&ensp;简介
                </h5>
            </div>

            <List>
                <ListHeader>菜单</ListHeader>
                <Item button>
                    <span>西红柿炒鸡蛋</span>
                    <Badge slot="item-right">new</Badge>
                </Item>
                <Item button>
                    <span>牛肉面</span>
                    <Badge slot="item-right" color="danger">Top5</Badge>
                </Item>
                <Item button>
                    <span>肉夹馍</span>
                    <Badge slot="item-right" color="secondary">陕西</Badge>
                </Item>
                <Item button>
                    <span>松鼠桂鱼</span>
                    <Badge slot="item-right" color="dark">江南</Badge>
                </Item>
                <Item button>
                    <span>酱骨</span>
                    <Note slot="item-right">我比较喜欢</Note>
                    <Badge slot="item-right" color="light">东北</Badge>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
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
    activated () {}
  }
</script>
