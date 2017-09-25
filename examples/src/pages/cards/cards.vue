<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Cards</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <!--header-->
                <ListHeader>
                    <span>Contents</span>
                </ListHeader>
                <!--group-->
                <Item button :to="{name:'cards.basicCards'}">基础卡片</Item>
                <Item button :to="{name:'cards.listsInCards'}">Card与List组合</Item>
                <Item button :to="{name:'cards.advancedCards'}">更丰富的Card</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  export default {
    name: 'cards'
  }
</script>
