<template>
    <div class="ion-item-group" :class="{'reorder-enabled':enableReorder,'reorder-visible':visibleReorder}">
        <slot></slot>
    </div>
</template>
<script>
  import { isTrueProperty } from '../../util/util'
  export default{
    /**
     *
     * @fires onItemReorder {from: 0, to: 4}
     * */
    name: 'ItemGroup',
    props: {
      reorder: [Boolean]
    },
    data(){
      return {
        enableReorder: false,   //
        visibleReorder: false,  //

        lastToIndex: -1,
        element: null,
        reorderGesture: true,
      }
    },
    watch: {
      reorder(val){

        let enabled = isTrueProperty(val);

        if (!enabled) {
          this.visibleReorder = false;
          window.setTimeout(() => this.enableReorder = false, 400)

        } else if (enabled) {
          console.debug('enableReorderItems');

          this.enableReorder = true;

          window.setTimeout(() => {
            this.visibleReorder = true;
          }, 16)

        }

      }
    },
    mounted(){

    }

  }
</script>
