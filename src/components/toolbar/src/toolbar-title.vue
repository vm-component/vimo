<template>
  <div class="ion-title title" :class="[titleClass]">
    <div class="toolbar-title" :class="[toolbarTitleClass]">
      {{titleInner}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-title',
    data(){
      return {
        titleInner: this.title
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: 'ios',
      },
      /**
       * 设置的title值
       * */
      title: {
        type: String,
        default: '',
      },
    },
    watch: {},
    computed: {
      titleClass: function () {
        return `title-${this.mode}`
      },
      toolbarTitleClass: function () {
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
        let _title;
        /**
         * 组件获取了传入的title值，之后通过全局注册的$setTitle方法
         * 设置document.title（此处做了兼容）
         * */
        if (!!_this.title) {
          // prop传入title值
          //eg: <ion-title slot="content" title="Toolbar"></ion-title>
          _title = _this.title.trim();
        } else if (!!_this.$slots.default[0] && !!_this.$slots.default[0].text) {
          // 如果是直接写在ion-title中的值
          //eg: <ion-title slot="content">Toolbar</ion-title>
          _title = _this.$slots.default[0].text.trim();
        } else if (!!_this.$slots.default[0] && !!_this.$slots.default[0].tag && !!_this.$slots.default[0].children[0].text) {
          // 如果是这届下载ion-title中的值，并且包含一层标签的情况
          //eg: <ion-title slot="content">
          //      <span>Toolbar</span>
          //    </ion-title>
          _title = _this.$slots.default[0].children[0].text.trim();
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
        if (!!val) {
          // 利用iframe的onload事件刷新页面
          document.title = val;
          iframe = document.createElement('iframe');
          iframe.src = ' '; // iframe.src = '/static/favicon.ico';
          iframe.style.visibility = 'hidden';
          iframe.style.width = '1px';
          iframe.style.height = '1px';
          iframe.onload = function () {
            _this.$nextTick(function () {
              document.body.removeChild(iframe);
            });
          };
          document.body.appendChild(iframe);

          // 修改ion-header的title
          _this.titleInner = val;
        }
      },
    },
    created(){
      // 将挂载点同步到根this上
      const _this = this;
      // 保证战歌ion-title不是包含在ion-menu中的。
      // ion-page -> ion-header -> ion-toolbar/ion-navbar -> ion-title
      if (_this.$parent.$parent.$parent.$options._componentTag === 'ion-page') {
        _this.$eventBus.$emit('$titleReady', _this);
      }
    },
    mounted(){
      const _this = this;
      if (_this.$parent.$parent.$parent.$options._componentTag === 'ion-page') {
        _this.titleInner = _this.getTitle();
        _this.setTitle(_this.titleInner)
      }
    }
  }
</script>
