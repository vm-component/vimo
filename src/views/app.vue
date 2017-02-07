<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content" title="App"></ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>

      <h2>APP(ion-app)组件介绍：</h2>
      <p>
        该组件是业务页面的父组件，业务页面挂载、页面状态、弹出层挂载安插等，都是在此组件中完成。
        组件注册初始化时，会将公共下面的方法插入到Vue.prototype中，便于业务页面对ion-app组件的操控。
      </p>


      <h2>组件方法：</h2>

      <p>$getPortal: 获取弹出层挂载的位置</p>
      <p>$setEnabled: 设置整个页面可点击状态</p>
      <p>$disableScroll: 禁止页面滚动</p>


      <ion-button @click="$setEnabled(false,3000)">3秒内页面无法点击(可滚动)</ion-button>

      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>
      <p>这里是内容</p>

      <ion-button @click="disableScroll">3秒内页面无法滚动(无法点击+滚动)</ion-button>


    </ion-content>

  </ion-page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
    data(){
      return {
        isDisabled: false,
      }
    },
    watch: {},
    computed: {},
    methods: {
      disableScroll(){
        const _this = this;
        if (!_this.isDisabled) {
          _this.$disableScroll(true);
          _this.isDisabled = true;
          setTimeout(function () {
            _this.$disableScroll(false);
            _this.isDisabled = false;
          },3000)
        }
      }
    },
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
