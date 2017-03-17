<template>
  <div class="ion-refresher-content">
    <div class="refresher-pulling">
      <div class="refresher-pulling-icon" v-if="pullingIcon">
        <Icon :name="pullingIcon"></Icon>
      </div>
      <div class="refresher-pulling-text" v-html="pullingText" v-if="pullingText"></div>
    </div>
    <div class="refresher-refreshing">
      <div class="refresher-refreshing-icon">
        <Spinner :name="refreshingSpinner"></Spinner>
      </div>
      <div class="refresher-refreshing-text" v-html="refreshingText" v-if="refreshingText"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'RefresherContent',
    props: {
      pullingIcon: {
        type: String,
        default: VM && VM.config && VM.config.get('ionPullIcon', 'arrow-down') || 'arrow-down'
      },
      pullingText: {
        type: String,
        default: '下拉刷新'
      },
      refreshingSpinner: {
        type: String,
        default: VM && VM.config && VM.config.get('ionRefreshingSpinner', VM && VM.config.get('spinner', 'ios')) || 'ios'
      },
      refreshingText: {
        type: String,
        default: '正在刷新'
      },
    }
  }
</script>
