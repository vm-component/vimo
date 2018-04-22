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
<script type="text/javascript">
  import Icon from '../icon'
  import Spinner from '../spinner'

  export default {
    name: 'RefresherContent',
    props: {
      pullingIcon: {
        type: String,
        default () { return this.$config && this.$config.get('onPullIcon', 'arrow-down') || 'arrow-down' }
      },
      pullingText: {
        type: String,
        default () {
          return (this.$i18n && this.$i18n.te('vimo.pullingText')) ? this.$i18n.t('vimo.pullingText') : 'Pull to refresh'
        }
      },
      refreshingSpinner: {
        type: String,
        default () { return this.$config && this.$config.get('onRefreshingSpinner', this.$config.get('spinner', 'ios')) || 'ios' }
      },
      refreshingText: {
        type: String,
        default () {
          return (this.$i18n && this.$i18n.te('vimo.refreshingText')) ? this.$i18n.t('vimo.refreshingText') : 'Refreshing'
        }
      }
    },
    components: {
      Icon, Spinner
    }
  }
</script>
