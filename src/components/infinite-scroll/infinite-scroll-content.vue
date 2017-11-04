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
  /**
   * @component InfiniteScroll/InfiniteScrollContent
   * @description
   *
   * ## 数据加载 / InfiniteScrollContent无限滚动组件的指示器
   *
   * 这个组件是与InfiniteScroll组件配合使用的.
   *
   * @props {String} [loadingSpinner='ios'] - loading的旋转图标
   * @props {String} [loadingText='Loading more data...'] - loading的文字
   *
   * @see component:InfiniteScroll
   * @demo #/infinite-scroll
   * */
  import Spinner from '../spinner/index'

  export default {
    name: 'InfiniteScrollContent',
    props: {
      // loading的旋转图标
      loadingSpinner: {
        type: String,
        default () { return this.$config && this.$config.get('infiniteLoadingSpinner', this.$config.get('spinner', 'ios')) || 'ios' }
      },
      // loading的文字
      loadingText: {
        type: String,
        default: 'Loading more data...'
      }
    },
    data () {
      return {
        state: 'loading'
      }
    },
    components: {Spinner}
  }
</script>
