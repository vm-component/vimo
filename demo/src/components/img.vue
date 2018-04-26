<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius expedita officia quam reiciendis similique suscipit vel. Assumenda, cum error
                eum, fuga nobis pariatur placeat praesentium qui, repellendus repudiandae similique veritatis.</p>
            <Img width="100%" height="200" :src="'https://raw.githubusercontent.com/vm-component/vimo/master/examples/static/background/'+i+'.jpg'"
                 v-for="i in totalCount"
                 :key="i"/>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
</style>
<script type="text/javascript">
  export default {
    name: 'DemoImg',
    data () {
      return {
        totalCount: 24
      }
    },
    i18n: {
      messages: {
        'zh-CN': {
          title: '图片'
        },
        'en-US': {
          title: 'Img'
        }
      }
    }
  }
</script>
