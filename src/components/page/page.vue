<template>
    <article class="ion-page" :box="isBox" :style="{zIndex:pageZIndex}" :class="{'ion-box':isBox}">
        <slot></slot>
    </article>
</template>
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
