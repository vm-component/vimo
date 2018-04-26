<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item button>
                    <span>Apple</span>
                    <Badge slot="item-right">new</Badge>
                </Item>
                <Item button>
                    <span>Pear</span>
                    <Badge slot="item-right" color="danger">Top5</Badge>
                </Item>
                <Item button>
                    <span>Tomato</span>
                    <Badge slot="item-right" color="secondary">Hot</Badge>
                </Item>
                <Item button>
                    <span>Orange</span>
                    <Note slot="item-right">I Like It</Note>
                    <Badge slot="item-right" color="dark">3</Badge>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoBadge',
    i18n: {
      messages: {
        'zh-CN': {
          title: '徽章'
        },
        'en-US': {
          title: 'Badge'
        }
      }
    }
  }
</script>
