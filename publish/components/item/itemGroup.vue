<template>
    <div class="ion-item-group">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component ItemGroup
   * @description
   *
   * ## 列表组件 / ItemGroup元素组
   *
   * @props {Boolean} accordion - 定义是否为手风琴模式
   *
   *
   * */
  export default{
    name: 'ItemGroup',
    props: {
      accordion: [Boolean]
    },
    data () {
      return {
        itemCollapseList: []
      }
    },
    methods: {
      // ------ ItemCollapse ------
      recordItemCollapse (instance) {
        this.itemCollapseList.push(instance)
      },
      onItemCollapseChange (id) {
        this.itemCollapseList.forEach((itemCollapse) => {
          let state = (parseInt(id) === parseInt(itemCollapse._uid))
          if (state) {
            itemCollapse.isActive = !itemCollapse.isActive
          } else if (this.accordion) {
            itemCollapse.isActive = false
          }
        })
      }
    }
  }
</script>
