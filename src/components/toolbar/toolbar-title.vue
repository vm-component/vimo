<template>
  <div class="ion-title title" :class="[titleClass]">
    <div class="toolbar-title" :class="[toolbarTitleClass]">
      {{titleInner}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'Title',
    data(){
      return {
        titleInner: this.title,
        isInPage: false, // 该组件只是在ion-page中，中间没有ion-menu
        isInPageHeader: false, // 该组件在ion-page -> ion-header中，这个条件满足才会更新document.title
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },
      /**
       * 设置的title值
       * */
      title: {
        type: String,
        default: '',
      },
    },
    computed: {
      titleClass () {
        return `title-${this.mode}`
      },
      toolbarTitleClass () {
        return `toolbar-title-${this.mode}`
      },
    },
    methods: {
      /**
       * 获取title
       * @return {String}
       * */
      getTitle(){
        const _this = this;
        let _title = '';
        /**
         * 组件获取了传入的title值，之后通过全局注册的$setTitle方法
         * 设置document.title（此处做了兼容）
         * */
        if (!!_this.title) {
          // prop传入title值
          //eg: <Title title="Toolbar"></Title>
          _title = _this.title.trim();
        } else if (!!_this.$slots.default[0] && !!_this.$slots.default[0].text) {
          // 如果是直接写在ion-title中的值
          //eg: <Title>Toolbar</Title>
          _title = _this.$slots.default[0].text.trim();
        } else if (!!_this.$slots.default[0] && !!_this.$slots.default[0].tag && !!_this.$slots.default[0].children[0].text) {
          // 如果是这届下载ion-title中的值，并且包含一层标签的情况
          //eg: <Title>
          //      <span>Toolbar</span>
          //      <span>-</span>
          //      <span>Test</span>
          //    </Title>
          // -> Toolbar-Test
          _this.$slots.default.forEach(function (item) {
            if (!!item.children && item.children.length > 0 && !!item.children[0] && !!item.children[0].text) {
              _title += item.children[0].text.trim()
            }
          })

        }
        return _title
      },
      /**
       * Sets the document title.
       * 这里会对微信/钉钉/支付宝内部的title设置做兼容性处理
       * @param {String} val - 设置的document.title值
       * */
      setTitle (val) {
        let iframe;
        const _this = this;
        if (!!val && val != document.title) {
          //以下代码可以解决以上问题，不依赖jq
          setTimeout(function () {
            //利用iframe的onload事件刷新页面
            document.title = val;
            let iframe = document.createElement('iframe');
            // iframe.src = '/static/favicon.ico';
            iframe.src = 'favicon.ico';
            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.onload = function () {
              setTimeout(function () {
                document.body.removeChild(iframe);
              }, 0);
            };
            document.body.appendChild(iframe);
          }, 0);

          // 修改ion-header的title
          _this.titleInner = val;
        }
      },
    },
    mounted(){
      // 只在Navbar中的Title才会具有更新Title的特性
      // 将挂载点同步到页面this上
      this.titleInner = this.getTitle();
      if(this.$parent.$options._componentTag === 'Navbar'){
        this.setTitle(this.titleInner)
      }

    }
  }
</script>
