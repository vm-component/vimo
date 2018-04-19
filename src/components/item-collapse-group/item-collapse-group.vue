<template>
    <div class="ion-item-collapse-group">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: 'ItemCollapseGroup',
    provide () {
      const _this = this
      return {
        itemCollapseGroupComponent: _this
      }
    },
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
