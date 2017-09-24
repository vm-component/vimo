<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Reorder</Title>
                <Buttons end>
                    <Button clear @click="toggleEdit()">{{editButton}}</Button>
                </Buttons>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List class="chat-sliding-demo">
                <ListHeader>Playlist(正在开发)</ListHeader>
                <ItemGroup :reorder="editing" @onItemReorder="reorderData($event)">
                    <Item v-for="(song,index) in songs" :key="index">
                        <Label>
                            <h2>{{ song.title }}</h2>
                            <p>{{ song.band }} • {{ song.album }}</p>
                        </Label>
                    </Item>
                </ItemGroup>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
  export default{
    name: 'reorder',
    data () {
      return {
        songs: [
          {
            title: 'Everything Beta',
            band: 'Phoria',
            album: 'Volition'
          },
          {
            title: 'Hello',
            band: 'Adele',
            album: '25'
          },
          {
            title: 'Bohemian Rhapsody',
            band: 'Queen',
            album: 'A Night at the Opera'
          },
          {
            title: 'Don\'t Stop Believin\'',
            band: 'Journey',
            album: 'Escape'
          },
          {
            title: 'Smells Like Teen Spirit',
            band: 'Nirvana',
            album: 'Nevermind'
          },
          {
            title: 'All You Need Is Love',
            band: 'The Beatles',
            album: 'Magical Mystery Tour'
          },
          {
            title: 'Hotel California',
            band: 'The Eagles',
            album: 'Hotel California'
          },
          {
            title: 'The Hand That Feeds',
            band: 'Nine Inch Nails',
            album: 'With Teeth'
          },
          {
            title: 'Who Are You',
            band: 'The Who',
            album: 'Who Are You'
          }],
        editButton: 'Edit',
        editing: false
      }
    },
    methods: {
      toggleEdit () {
        this.editing = !this.editing
        if (this.editing) {
          this.editButton = 'Done'
        } else {
          this.editButton = 'Edit'
        }
      },
      reorderdata () {}
    }
  }
</script>
