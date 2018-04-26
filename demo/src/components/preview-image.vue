<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <article>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, animi at dignissimos doloremque ducimus ea eaque earum excepturi fuga
                   nostrum odio provident quia sed sequi unde veniam, veritatis voluptatibus.</p>
            </article>
            <img src="https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg" @click="openAlbum1">
            <article>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, animi at dignissimos doloremque ducimus ea eaque earum excepturi fuga
                   nostrum odio provident quia sed sequi unde veniam, veritatis voluptatibus.</p>
            </article>
            <Button block @click="openAlbum1">{{$t('start1')}}</Button>
            <Button block @click="openAlbum2">{{$t('start2')}}</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam at autem, beatae commodi doloremque eligendi exercitationem
                    minima mollitia nobis numquam praesentium sapiente sint, sit veniam vero voluptate! Aliquam, quo?</p>
            </article>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoPreviewImage',
    i18n: {
      messages: {
        'zh-CN': {
          title: '图片预览',
          start1: '从第一个开始',
          start2: '从第二个开始'
        },
        'en-US': {
          title: 'PreviewImage',
          start1: 'Start from the first',
          start2: 'Starting from the second'
        }
      }
    },
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
    }
  }

</script>
