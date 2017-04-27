<template>
    <div class="ion-title title" :class="[titleClass]">
        <div class="toolbar-title" :class="[toolbarTitleClass]">
            <span>{{titleInner}}</span>
        </div>
    </div>
</template>
<script>
  /**
   * @component Component/Title
   * @description
   * 设置顶部的title及document.title, 请使用ref获取Title组件的setTitle方法, 使用该方法会同步设置document.title(默认)
   *
   *
   * @property {String} mode - 模式
   * @property {String} title - 标题
   *
   * */
  export default{
    name: 'Title',
    data(){
      return {
        titleInner: this.title,
        isInit: false
      }
    },
    props: {
      /**
       * mode 按钮风格
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
      /**
       * 设置的title值
       * */
      title: {
        type: String,
        default: ''
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
       * @function getTitle
       * @description
       * 获取Title组件中的title, 兼容各种模式
       * @return {String}
       * */
      getTitle(){
        if (this.isInit) {
          return this.titleInner
        } else {
          let _title = '';
          /**
           * 组件获取了传入的title值，之后通过全局注册的$setTitle方法
           * 设置document.title（此处做了兼容）
           * */
          if (!!this.title) {
            // prop传入title值
            // eg: <Title title="Toolbar"></Title>
            _title = this.title.trim();
          } else if (!!this.$slots.default && !!this.$slots.default[0] && !!this.$slots.default[0].text) {
            // 如果是直接写在ion-title中的值
            // eg: <Title>Toolbar</Title>
            _title = this.$slots.default[0].text.trim();
          } else if (!!this.$slots.default && !!this.$slots.default[0] && !!this.$slots.default[0].tag && !!this.$slots.default[0].children[0].text) {
            // 如果是这届下载ion-title中的值，并且包含一层标签的情况
            // eg: <Title>
            //      <span>Toolbar</span>
            //      <span>-</span>
            //      <span>Test</span>
            //    </Title>
            // -> Toolbar-Test
            this.$slots.default.forEach((item) => {
              if (!!item.children && item.children.length > 0 && !!item.children[0] && !!item.children[0].text) {
                _title += item.children[0].text.trim()
              }
            })
          }
          return _title
        }
      },

      /**
       * @function setTitle
       * @description
       * 修改Header的title
       * @param {String} title - title
       * @param {boolean} [setDocTitle=true] - 是否设置doc的title, 默认是同步设置的
       * */
      setTitle (title, changeDocTitle = true) {
        this.titleInner = title;
        if (changeDocTitle) {
          // 设置document的title, 这部分由$app处理
          this.$app && this.$app.setDocTitle(title);
        }
      },

//      /**
//       * @private
//       * 将当前页面的title发送给app管理
//       * */
//      sendTitleToApp(title){
//        // 设置document的title, 这部分由$app处理
//        this.$app && this.$app.setTitle(title);
//      },

      /**
       * @private
       * 初始化
       * 只在Navbar中的Title才会具有更新Title的特性!!!
       * 且, 一个Page只能拥有一个Navbar, 当在Navbar中设置Title, 则Title的方法
       * 将赋予页面Page(docTitle),
       * */
      init(){
        this.titleInner = this.getTitle()
        if (!!this.$parent.$options._componentTag && this.$parent.$options._componentTag.toLowerCase() === 'navbar' && document.title !== this.titleInner) {
          this.setTitle(this.titleInner)
        }
        this.isInit = true
      }
    },
    mounted(){
      this.init()
    }
  }
</script>
