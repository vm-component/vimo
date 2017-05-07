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
                <Item detail-push>
                    <span>西红柿炒鸡蛋</span>
                    <Badge slot="item-right">new</Badge>
                </Item>
                <Item detail-push>
                    <span>牛肉面</span>
                    <Badge slot="item-right" color="danger">Top5</Badge>
                </Item>
                <Item detail-push>
                    <span>肉夹馍</span>
                    <Badge slot="item-right" color="secondary">陕西</Badge>
                </Item>
                <Item detail-push>
                    <span>松鼠桂鱼</span>
                    <Badge slot="item-right" color="dark">江南</Badge>
                </Item>
                <Item detail-push>
                    <span>酱骨</span>
                    <Note slot="item-right">我比较喜欢</Note>
                    <Badge slot="item-right" color="light">东北</Badge>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Badge } from 'vimo/components/badge'
  import { Note } from 'vimo/components/note'
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
    components: {
      List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Badge, Note
    }
  }
</script>
