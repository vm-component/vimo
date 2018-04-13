<template>
    <article class="ion-page" :box="isBox" :style="{zIndex:pageZIndex}" :class="{'ion-box':isBox}">
        <slot></slot>
    </article>
</template>
<script type="text/javascript">
  let initPageZIndex = 1000
  export default {
    name: 'Page',
    inject: {
      // Modal 组件可能包裹 Page 组件, 则使用Box布局
      modalComponent: {
        from: 'modalComponent',
        default: null
      },
      navComponent: {
        from: 'navComponent',
        default: null
      }
    },
    provide () {
      let _this = this
      return {
        pageComponent: _this
      }
    },
    data () {
      return {
        pageZIndex: 0,
        headerComponent: null,
        footerComponent: null
      }
    },
    props: {
      box: {
        type: Boolean,
        default () { return this.$config && this.$config.getBoolean('box') || false } // 盒子模型(固定高度宽度布局)
      }
    },
    computed: {
      isBox () {
        // TODO
        return true
        // return !!this.box || !!this.modalComponent
      }
    },
    methods: {
      $_getHeaderComponent () {
        return this.headerComponent
      },
      $_getFooterComponent () {
        return this.footerComponent
      }
    },
    created () {
      if (this.navComponent && this.navComponent.direction) {
        let direction = this.navComponent.direction
        if (direction === 'forward') {
          this.pageZIndex = ++initPageZIndex
        } else if (direction === 'backward') {
          this.pageZIndex = --initPageZIndex
        } else {
          this.pageZIndex = initPageZIndex
        }
      }
      this.$root.$emit('page:created')
    },
    mounted () {
      this.$root.$emit('page:mounted')
    }
  }
</script>
