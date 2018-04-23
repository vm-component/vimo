<template>
    <Page>
        <Header>
            <Navbar>
                <Title>PreviewImage</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>图片预览组件</h5>
            <p>如果实在支付宝环境，则使用支付宝的组件</p>
            <Button block @click="openAlbum1">从第一个开始</Button>
            <Button block @click="openAlbum2">从第二个开始</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
            </article>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openAlbum1 () {
        this.$previewImage.present({
          current: 0,
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ]
        })
      },
      openAlbum2 () {
        this.$previewImage.present({
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
