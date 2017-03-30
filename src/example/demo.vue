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
      <Button block>Button</Button>

      <!--http://61.161.111.131:8010/Resources/Html/31125.html-->
      <iframe height="auto" id="iframe" src="http://61.161.111.131:8010/SubmitInfoMonitor/WarningHandler.ashx?action=productdetail&code=bc7ddb9d-593e-4db0-b94f-e2d33e2d66bd&key=ADD2E41CC5FE4528B2F3EBDFBF2BC1D6"></iframe>
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
//  import jQuery from 'jquery';

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
//      jQuery.ajax({
//        // url: "http://61.161.111.131:8010/Resources/Html/31125.html",
//        url: "http://61.161.111.131:8010/SubmitInfoMonitor/WarningHandler.ashx?action=productdetail&code=bc7ddb9d-593e-4db0-b94f-e2d33e2d66bd&key=ADD2E41CC5FE4528B2F3EBDFBF2BC1D6",
//      }).done(function (data) {
//        _this.msg = jQuery(data).text().trim()
//        // console.debug(data.match(/\<body\>(.+)\<\/body\>\B/ig))
//      });



      var browserVersion = window.navigator.userAgent.toUpperCase();
      var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
      var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
      var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
      var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
      var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
      var isIE9More = (! -[1, ] == false);
      function reinitIframe(iframeId, minHeight) {
        try {
          var iframe = document.getElementById(iframeId);
          var bHeight = 0;
          if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

          var dHeight = 0;
          if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
          else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          else if (isIE == true && isIE9More) {//ie9+
            var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
            if (heightDeviation == 0) {
              bHeight += 3;
            } else if (heightDeviation != 3) {
              eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
              bHeight += 3;
            }
          }
          else//ie[6-8]、OPERA
            bHeight += 3;

          var height = Math.max(bHeight, dHeight);
          if (height < minHeight) height = minHeight;
          iframe.style.height = height + "px";
        } catch (ex) { }
      }
      function startInit(iframeId, minHeight) {
        eval("window.IE9MoreRealHeight" + iframeId + "=0");
        window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 100);
      }

    },
    activated () {},
    components: {}
  }
</script>
