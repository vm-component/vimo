<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('card')}}</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>Demo</span>
                </ListHeader>
                <Item detail-push :to="{name:'cardBasic'}">{{$t('cardsBasic')}}</Item>
                <Item detail-push :to="{name:'cardList'}">{{$t('cardsList')}}</Item>
                <Item detail-push :to="{name:'cardAdvanced'}">{{$t('cardsAdvanced')}}</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/javascript">
  export default {
    name: 'DemoCards',
    i18n: {
      messages: {
        'zh-CN': {
          card: '卡片',
          cardsBasic: '基础使用',
          cardsList: 'Card与List组合',
          cardsAdvanced: '更丰富的Card'
        },
        'en-US': {
          card: 'Cards',
          cardsBasic: 'Basic Usage',
          cardsList: 'Card With List',
          cardsAdvanced: 'Advanced Card'
        }
      }
    }
  }
</script>
