<template>
    <Page>
        <Header>
            <Navbar>
                <Title>本地存储</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h4>LocalStorage</h4>
            <Grid>
                <Row>
                    <Column col-6>前缀:</Column>
                    <Column col-6>{{$localStorage._prefix}}</Column>
                </Row>
                <Row>
                    <Column col-6>Storage中:</Column>
                    <Column col-6>
                        <div class="detailBox"
                             v-for="(value,key) in $localStorage"
                             v-if="key.indexOf('_') !== 0">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>

                <Row>
                    <Column col-6>localStorage中:</Column>
                    <Column col-6>
                        <div class="detailBox" v-for="(value,key) in localStorageList">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>


            </Grid>


            <h4>SessionStorage</h4>
            <Grid>
                <Row>
                    <Column col-6>前缀:</Column>
                    <Column col-6>{{$sessionStorage._prefix}}</Column>
                </Row>

                <Row>
                    <Column col-6>Storage中:</Column>
                    <Column col-6>
                        <div class="detailBox"
                             v-for="(value,key) in $sessionStorage"
                             v-if="key.indexOf('_') !== 0">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>

                <Row>
                    <Column col-6>sessionStorage中:</Column>
                    <Column col-6>
                        <div class="detailBox" v-for="(value,key) in sessionStorageList">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>
            </Grid>

        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .detailBox {
        margin-bottom: 5px;

        .detailBox__title {
            color: #000;
            font-weight: bold;
        }
        .detailBox__value {
            color: #333;
        }
    }
</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {
        localStorageList: {},
        sessionStorageList: {}
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {
      if (window.localStorage) {
        for (let i = 0, l = window.localStorage.length, k; i < l; i++) {
          k = window.localStorage.key(i)
          this.localStorageList[k] = window.localStorage.getItem(k)
        }
      }
      if (window.sessionStorage) {
        for (let i = 0, l = window.sessionStorage.length, k; i < l; i++) {
          k = window.sessionStorage.key(i)
          this.sessionStorageList[k] = window.sessionStorage.getItem(k)
        }
      }
    },
    mounted () {
      this.$localStorage.setItem('innerUse', ['a', 'b'])
      // window.localStorage.setItem('outerUse', 'NotInStorage')
    },
    activated () {},
    components: {}
  }
</script>
