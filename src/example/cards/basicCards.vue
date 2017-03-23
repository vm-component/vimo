<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Basic Cards</Title>
      </Navbar>
    </Header>
    <Content>
      <Card>
        <CardHeader>
          Card Header
        </CardHeader>
        <CardContent>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet at blanditiis nam nostrum pariatur
            provident quas quod! Alias atque autem dolores et necessitatibus odit perspiciatis quis recusandae
            reprehenderit voluptas.
          </p>
        </CardContent>
      </Card>
    </Content>
  </Page>
</template>
<script type="text/ecmascript-6">
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