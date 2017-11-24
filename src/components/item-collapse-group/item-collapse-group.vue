<template>
    <div class="ion-item-collapse-group">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Item/ItemCollapseGroup
   * @description
   *
   * ## 列表组件 / ItemCollapseGroup元素组
   *
   * @props {Boolean} accordion - 定义是否为手风琴模式
   *
   * */
  export default {
    name: 'ItemCollapseGroup',
    props: {
      accordion: Boolean
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
