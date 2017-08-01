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
                        <Icon name="person" slot="item-left"></Icon>
                        Shopping
                    </Item>

                    <Item button>
                        <Icon name="calculator" slot="item-left"></Icon>
                        Hospital
                    </Item>

                    <Item button>
                        <Icon name="camera" slot="item-left"></Icon>
                        Cafe
                    </Item>

                    <Item button>
                        <Icon name="paw" slot="item-left"></Icon>
                        Dog Park
                    </Item>

                    <Item button>
                        <Icon name="beer" slot="item-left"></Icon>
                        Pub
                    </Item>

                    <Item button>
                        <Icon name="easel" slot="item-left"></Icon>
                        Space
                    </Item>

                </List>
            </Card>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  import { Card, CardContent, CardHeader, CardTitle } from 'vimo/components/card'
  import { Note } from 'vimo/components/note'
  import { Item } from 'vimo/components/item'
  import { Avatar } from 'vimo/components/avatar'
  import { Label } from 'vimo/components/label'
  export default{
    components: {
      Card, CardContent, CardHeader, CardTitle, Note, Item, Avatar, Label
    }
  }
</script>
