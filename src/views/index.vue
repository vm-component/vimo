<template>
  <div class="index">
    <ul>
      <li class="title">组件</li>
      <router-link class="item" :to="{ name: 'actionSheet'}" title="actionSheet" tag="li">
        <span>actionSheet</span>
      </router-link>
      <router-link class="item" :to="{ name: 'backdrop'}" title="backdrop" tag="li">
        <span>backdrop</span>
      </router-link>
      <router-link class="item" :to="{ name: 'button'}" title="button" tag="li">
        <span>button</span>
      </router-link>
      <router-link class="item" :to="{ name: 'icon'}" title="icon" tag="li">
        <span>icon</span>
      </router-link>
      <router-link class="item" :to="{ name: 'alert'}" title="alert" tag="li">
        <span>alert</span>
      </router-link>
      <router-link class="item" :to="{ name: 'toast'}" title="toast" tag="li">
        <span>toast</span>
      </router-link>
      <router-link class="item" :to="{ name: 'spinner'}" title="spinner" tag="li">
        <span>spinner</span>
      </router-link>
      <router-link class="item" :to="{ name: 'loading'}" title="loading" tag="li">
        <span>loading</span>
      </router-link>
      <router-link class="item" :to="{ name: 'toolbar'}" title="toolbar" tag="li">
        <span>toolbar</span>
      </router-link>
    </ul>
  </div>
</template>
<style lang="scss">
  @import "./app.scss";
  @import "./app.ios.scss";
  @import "./app.md.scss";
  @import "./app.wp.scss";
  .index {
    ul {
      li {
        padding-left: 10px;
        margin: 5px 0;
        &.title {
          background: #eee;
          font-size: 18px;
        }
        &.item {
          background: #fff;
          font-size: 20px;
        }

      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'index',
    data(){
      return {}
    },

  }
</script>
