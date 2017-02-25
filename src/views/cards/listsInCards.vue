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
            <Icon name="fa-user" slot="left"></Icon>
            Shopping
          </Item>

          <Item button>
            <Icon name="fa-hospital-o" slot="left"></Icon>
            Hospital
          </Item>

          <Item button>
            <Icon name="fa-glass" slot="left"></Icon>
            Cafe
          </Item>

          <Item button>
            <Icon name="fa-paw" slot="left"></Icon>
            Dog Park
          </Item>

          <Item button>
            <Icon name="fa-beer" slot="left"></Icon>
            Pub
          </Item>

          <Item button>
            <Icon name="fa-rocket" slot="left"></Icon>
            Space
          </Item>

        </List>
      </Card>
    </Content>
  </Page>
</template>
