<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Demo</Title>
      </Navbar>
      <Searchbar :animated="true"
                 :debounce="1000"
                 mode="ios"
                 color="danger"
                 :showCancelButton="true"
                 cancelButtonText="取消"></Searchbar>
    </Header>
    <Content padding>
      <Button type="block">Button</Button>

      <!--http://61.161.111.131:8010/Resources/Html/31125.html-->
      <iframe id="iframe" src="http://61.161.111.131:8010/SubmitInfoMonitor/WarningHandler.ashx?action=productdetail&code=bc7ddb9d-593e-4db0-b94f-e2d33e2d66bd&key=ADD2E41CC5FE4528B2F3EBDFBF2BC1D6"></iframe>
      <p>{{msg}}</p>
    </Content>
    <Footer>
      <Toolbar>
        <input class="inputDemo" placeholder="1234">
      </Toolbar>
    </Footer>

  </Page>
</template>
<style scoped lang="scss">
  .inputDemo {
    font-size: 16px;
    position: relative;
    bottom: 0;

  }
</style>
<script type="text/ecmascript-6">
  import jQuery from 'jquery';

  console.debug('jQuery')
  console.debug(jQuery)
  export default{
    data(){
      return {
        msg: '',
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {
      const _this = this;
      console.dir(document.getElementById('iframe'))
      jQuery.ajax({
        // url: "http://61.161.111.131:8010/Resources/Html/31125.html",
        url: "http://61.161.111.131:8010/SubmitInfoMonitor/WarningHandler.ashx?action=productdetail&code=bc7ddb9d-593e-4db0-b94f-e2d33e2d66bd&key=ADD2E41CC5FE4528B2F3EBDFBF2BC1D6",
      }).done(function (data) {
        console.debug('ajax')
        console.debug(data)
        _this.msg = jQuery(data).text().trim()
        // console.debug(data.match(/\<body\>(.+)\<\/body\>\B/ig))
      });

    },
    activated () {},
    components: {}
  }
</script>
