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
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <ItemGroup>
                    <Item button :to="{name:'cards.basicCards'}">基础卡片</Item>
                    <Item button :to="{name:'cards.listsInCards'}">Card与List组合</Item>
                    <Item button :to="{name:'cards.advancedCards'}">更丰富的Card</Item>
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
    name: 'cards',
    components: {
      List, ListHeader, ItemGroup, Item, Card
    }
  }
</script>
