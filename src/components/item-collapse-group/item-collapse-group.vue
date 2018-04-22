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
      accordion: Boolean,
      selected: [Array, String, Number]
    },
    data () {
      return {
        itemCollapseList: []
      }
    },
    watch: {
      selected: {
        handler(val){
          this.$_matchValueChange(val)
        } ,
        deep: true
      }
    },
    methods: {
      // ------ ItemCollapse ------
      recordItemCollapse (instance) {
        this.itemCollapseList.push(instance)
      },
      onItemCollapseChange (id) {
        this.itemCollapseList.forEach((itemCollapse) => {
          let state = (id === itemCollapse.itemKey)
          if (state) {
            itemCollapse.isActive = !itemCollapse.isActive
          } else if (this.accordion) {
            itemCollapse.isActive = false
          }
        })
      },
      $_matchValueChange (val) {
        if (this.accordion && Array.isArray(val)) {
          val = val[0]
        }
        if (Array.isArray(val)) {
          val.forEach(item => {
            this.onItemCollapseChange(item)
          })
        } else {
          this.onItemCollapseChange(val)
        }
      }
    },
    mounted () {
      this.$_matchValueChange(this.selected)
    }
  }
</script>
