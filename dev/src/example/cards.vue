<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Cards</Title>
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
                    <Item button :to="{name:'cards.basicCards'}">Basic Cards</Item>
                    <Item button :to="{name:'cards.listsInCards'}">Lists In Cards</Item>
                    <Item button :to="{name:'cards.advancedCards'}">Advanced Cards</Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/ecmascript-6">
  import { Card } from 'vimo/components/card'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item } from 'vimo/components/item'
  export default{
    name: 'name',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {
      List, ListHeader, ItemGroup, Item, Card
    }
  }
</script>
