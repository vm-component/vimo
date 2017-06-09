<template>
    <Page>
        <Header>
            <Navbar>
                <Title>PreviewImage</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>图片预览组件</h5>
            <Button block @click="openAlbum1">从第一个开始</Button>
            <Button block @click="openAlbum2">从第二个开始</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  import { PreviewImage } from 'vimo/components/preview-image'
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openAlbum1 () {
        PreviewImage({
          current: 0,
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ]
        })
      },
      openAlbum2 () {
        PreviewImage({
          current: 1,
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ]
        })
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="scss">

</style>
