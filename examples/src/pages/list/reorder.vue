<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Reorder</vm-title>
                <vm-buttons end>
                    <vm-button clear @click="toggleEdit()">{{editButton}}</vm-button>
                </vm-buttons>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list class="chat-sliding-demo">
                <vm-list-header>Playlist(正在开发)</vm-list-header>
                <vm-item-group :reorder="editing" @onItemReorder="reorderData($event)">
                    <vm-item v-for="(song,index) in songs" :key="index">
                        <vm-label>
                            <h2>{{ song.title }}</h2>
                            <p>{{ song.band }} • {{ song.album }}</p>
                        </vm-label>
                    </vm-item>
                </vm-item-group>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">
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
