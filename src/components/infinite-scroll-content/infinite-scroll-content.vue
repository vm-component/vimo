<template>
  <div class="ion-infinite-scroll-content">
    <div class="infinite-loading">
      <div class="infinite-loading-spinner" v-if="loadingSpinner">
        <Spinner :name="loadingSpinner"></Spinner>
      </div>
      <div class="infinite-loading-text" v-html="loadingText" v-if="loadingText"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Spinner from '../spinner';

  export default {
    name: 'InfiniteScrollContent',
    props: {
      // loading的旋转图标
      loadingSpinner: {
        type: String,
        default() {
          return this.$config && this.$config.get('infiniteLoadingSpinner', this.$config.get('spinner', 'ios')) || 'ios';
        }
      },
      // loading的文字
      loadingText: {
        type: String,
        default: 'Loading more data...'
      }
    },
    data() {
      return {
        state: 'loading'
      };
    },
    components: { Spinner }
  };
</script>
