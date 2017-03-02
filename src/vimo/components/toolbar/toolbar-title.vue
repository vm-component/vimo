<template>
  <div class="ion-title title" :class="[titleClass]">
    <div class="toolbar-title" :class="[toolbarTitleClass]">
      {{titleInner}}
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { urlChange } from '../../util/dom'
  export default{
    name: 'Title',
    data(){
      return {
        titleInner: this.title,
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
       * 获取title, 兼容各种模式
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
        } else if (!!_this.$slots.default && !!_this.$slots.default[0] && !!_this.$slots.default[0].text) {
          // 如果是直接写在ion-title中的值
          //eg: <Title>Toolbar</Title>
          _title = _this.$slots.default[0].text.trim();
        } else if (!!_this.$slots.default && !!_this.$slots.default[0] && !!_this.$slots.default[0].tag && !!_this.$slots.default[0].children[0].text) {
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
      // TODO: 设置title需要有一个config配置: 是否同步设置document.title
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
            iframe.src = ' ';
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

      /**
       * 只在Navbar中的Title才会具有更新Title的特性!!!
       * 且, 一个Page只能拥有一个Navbar, 当在Navbar中设置Title, 则Title的方法
       * 将赋予页面Page, 故调用指纹为: this.$nav.setTitle
       * */
      refreshTitle(){
        this.titleInner = this.getTitle();
        //console.log('refreshTitle')
        //console.log('document.title: '+ document.title)
        //console.log('this.titleInner: '+ this.titleInner)

        if (!!this.$parent.$options._componentTag && this.$parent.$options._componentTag.toLowerCase() === 'navbar' && document.title != this.titleInner) {

          //console.log('this.$vnode.context')
          //console.log(this.$vnode.context)
          if (!this.$vnode.context.$nav) {
            this.$vnode.context.$nav = {}
          }
          Object.assign(this.$vnode.context.$nav, {
            setTitle: this.setTitle,
            getTitle: this.getTitle,
          })

          this.setTitle(this.titleInner);

          //console.info('refreshTitle: ' + this.titleInner)
        }
      },

      /**
       * 当开启了keep-alive时, 第二次进入的页面将不再触发mounted钩子,
       * 也就是说, 不会再更新title, 这里需要监听urlChange, 当前页面的title
       * 与document.title不同时, 进行设置.
       * */
      autoRefreshTitle(){
        const _this = this;
        urlChange(function (ev) {
          _this.refreshTitle();
        })
      },

    },
    mounted(){
      this.refreshTitle()
      // this.autoRefreshTitle();
    }
  }
</script>
