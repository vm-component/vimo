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
                    <span>Card Header</span>
                </CardHeader>
                <CardContent>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet at blanditiis nam nostrum pariatur
                        provident quas quod! Alias atque autem dolores et necessitatibus odit perspiciatis quis recusandae
                        reprehenderit voluptas.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>This is a long title, that I must make a long text to tap here</CardTitle>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis excepturi iste similique? Adipisci alias, amet deserunt ea est eum incidunt ipsum labore libero nobis officiis quas, repellendus temporibus, ut voluptas.</h3>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at blanditiis, cum cupiditate, debitis dignissimos doloribus dolorum, eveniet exercitationem officia praesentium qui rerum sint soluta velit voluptate voluptatibus. Quod, repellat!
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at blanditiis, cum cupiditate, debitis dignissimos doloribus dolorum, eveniet exercitationem officia praesentium qui rerum sint soluta velit voluptate voluptatibus. Quod, repellat!
                </CardContent>
            </Card>


            <Card>
                <CardContent>
                    <CardTitle>CardTitle</CardTitle>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid asperiores autem consequuntur cumque doloribus earum eligendi illum laboriosam molestiae nam natus nemo nisi obcaecati odio, officia praesentium, veniam voluptates.</p>
                </CardContent>
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
