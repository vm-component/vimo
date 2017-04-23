<template>
    <Page>
        <Header>
            <Toolbar>
                <Title>
                    Tab1
                  </Title>
            </Toolbar>
        </Header>
        <Content padding>
            <h3>这个是Tab1的内容</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque deleniti dicta dolores
        exercitationem fugiat, libero magni nam. Aperiam aspernatur cum illum maiores maxime natus perspiciatis quae,
        quam ullam veniam.</p>
            <img src="../cards/img/card-saopaolo.png">
        </Content>
    </Page>
</template>
<style lang="scss">
    .main {

    }
</style>
<script type="text/ecmascript-6">
  import { Tabs, Tab } from 'vimo/components/tabs'
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {
    },
    mounted () {
    },
    activated () {
    },
    components: {Tabs, Tab}
  }
</script>
