<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Lists In Cards</Title>
      </Navbar>
    </Header>
    <Content>
      <Card>
        <CardHeader>
          Explore Nearby
        </CardHeader>

        <List>
          <Item button>
            <Icon name="fa-user" slot="item-left"></Icon>
            Shopping
          </Item>

          <Item button>
            <Icon name="fa-hospital-o" slot="item-left"></Icon>
            Hospital
          </Item>

          <Item button>
            <Icon name="fa-glass" slot="item-left"></Icon>
            Cafe
          </Item>

          <Item button>
            <Icon name="fa-paw" slot="item-left"></Icon>
            Dog Park
          </Item>

          <Item button>
            <Icon name="fa-beer" slot="item-left"></Icon>
            Pub
          </Item>

          <Item button>
            <Icon name="fa-rocket" slot="item-left"></Icon>
            Space
          </Item>

        </List>
      </Card>
    </Content>
  </Page>
</template>
