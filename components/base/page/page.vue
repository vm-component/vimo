<template>
    <article class="ion-page" :box="isBox" :style="{zIndex:pageZIndex}" :class="{'ion-box':isBox}">
        <slot></slot>
    </article>
</template>
<style lang="less">

    /// @prop - Background color of the content when making transition
    @content-ios-transition-background: #000;

    // Page Container Structure
    // --------------------------------------------------
    .ion-page {
        position: relative;
        top: 0;
        left: 0;
        display: block;

        width: 100%;

        // do not show, but still render so we can get dimensions
        opacity: 1;
        z-index: 10;
    }

    .ion-box {
        // 将page中在页面布局absolute化
        &.ion-page {
            height: 100%;
            position: absolute;
            contain: strict;
            .ion-header {
                position: absolute;
            }
            .ion-footer {
                position: absolute;
            }
            .ion-content {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                .scroll-content {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 100%;
                    overflow: scroll;
                    -webkit-overflow-scrolling: touch;
                }
            }
        }

        .fixed-content [fixed], .fixed-content [fixed-top], .fixed-content [fixed-bottom] {
            position: absolute;
        }
    }
</style>
<script type="text/javascript">
  /**
   * @component Base/Page
   * @description
   *
   * ## 基础组件 / Page组件
   *
   * Page组件是业务的根组件, 用于包裹业务层, 仅此而已. 切记, template标签内有且只有一个标签, 且必须为Page, 例如这样:
   *
   * @props {Boolean} [box=false] - 是否为盒子模型(固定高度宽度布局)
   *
   * @usage
   * <template>
   *    <Page>
   *        <Header>
   *            <Navbar>
   *                <Title>Demo</Title>
   *            </Navbar>
   *        </Header>
   *        <Content>
   *            <h1>这里是内容</h1>
   *        </Content>
   *    </Page>
   * </template>
   *
   * */
  let initPageZIndex = 1000
  export default {
    name: 'Page',
    inject: {
      // Modal 组件可能包裹 Page 组件, 则使用Box布局
      modalComponent: {
        from: 'modalComponent',
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
      box: Boolean // 盒子模型(固定高度宽度布局)
    },
    computed: {
      isBox () {
        return !!this.box || !!this.modalComponent
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
      let direction = this.$history.getDirection()
      if (direction === 'forward') {
        this.pageZIndex = ++initPageZIndex
      } else if (direction === 'backward') {
        this.pageZIndex = --initPageZIndex
      } else {
        this.pageZIndex = initPageZIndex
      }
      this.$root.$emit('page:created')
    },
    mounted () {
      this.$root.$emit('page:mounted')
    }
  }
</script>
