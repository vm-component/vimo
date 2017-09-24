<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Storage</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h5>简要</h5>
            <p>vm-storage插件主要是简化操作本地存储, 并且在项目初始化的时候将需要的数据序列化到内存中存储, 方法有: get/set/remove/clear/supported等.</p>
            <p>前缀用于区分app作用于, 且Storage只能存储以下类型: String(能序列化的)/Object/Array这三类.</p>
            <h5>localStorage</h5>
            <Grid>
                <Row>
                    <Column col-4>前缀:</Column>
                    <Column col-8>{{$localStorage._p}}</Column>
                </Row>
                <Row>
                    <Column col-4>Storage中:</Column>
                    <Column col-8>
                        <div class="detailBox"
                             v-for="(value,key) in $localStorage.get()"
                             v-if="key.indexOf('_') !== 0">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>

                <Row>
                    <Column col-4>localStorage中:</Column>
                    <Column col-8>
                        <div class="detailBox" v-for="(value,key) in localStorageList">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>
            </Grid>
            <h5>SessionStorage</h5>
            <Grid>
                <Row>
                    <Column col-4>前缀:</Column>
                    <Column col-8>{{$sessionStorage._p}}</Column>
                </Row>

                <Row>
                    <Column col-4>Storage中:</Column>
                    <Column col-8>
                        <div class="detailBox"
                             v-for="(value,key) in $sessionStorage.get()"
                             v-if="key.indexOf('_') !== 0">
                            <Row><span class="detailBox__title">{{key}}:</span></Row>
                            <Row><span class="detailBox__value">{{value}}</span></Row>
                        </div>
                    </Column>
                </Row>

                <Row>
                    <Column col-4>sessionStorage中:</Column>
                    <Column col-8>
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
<style scoped lang="less">
    .detailBox {
        margin-bottom: 5px;

        .detailBox__title {
            color: #000;
            font-weight: bold;
        }
        .detailBox__value {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3; //显示的行数
            -webkit-box-orient: vertical;
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
      this.$sessionStorage.set('innerUse', ['a', 'b'])
    },
    mounted () {
    },
    activated () {},
    components: {}
  }
</script>
