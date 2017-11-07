<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>PreviewImage</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">
            <h5>图片预览组件</h5>
            <p>如果实在支付宝环境，则使用支付宝的组件</p>
            <vm-button block @click="openAlbum1">从第一个开始</vm-button>
            <vm-button block @click="openAlbum2">从第二个开始</vm-button>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
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
<style scoped lang="less">

</style>
