<template>
    <Page>
        <Header>
            <Navbar>
                <Title>日期范围选择</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>选择范围</ListHeader>
                <Item>
                    <Label>
                        2017/07/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-07-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>

                <Item>
                    <Label>
                        2017/01/01 ~ 2017/12/01
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-01"
                              max="2017-12-01"
                    ></Datetime>
                </Item>

                <Item>
                    <Label>
                        2017/01/15 ~ 2017/01/30
                    </Label>
                    <Datetime slot="item-right"
                              min="2017-01-15"
                              max="2017-01-30"
                    ></Datetime>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Datetime } from 'vimo/components/datetime'
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
    deactivate () {},
    components: {Datetime, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider},
    destroyed () {}
  }
</script>
