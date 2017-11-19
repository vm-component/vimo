<template>
    <div class="ion-item-group" :class="[reorderEnabled?'reorder-enabled reorder-visible':'']">
        <slot></slot>
    </div>
</template>
<script>
  /**
   * @component Item/ItemGroup
   * @description
   *
   * ## 列表组件 / ItemGroup元素组
   *
   * 被ItemGroup包裹的Item的第一个元素没有上面框, 最后一个元素没下边框.
   *
   * @demo #/list
   **/
  import { isTrueProperty } from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'

export default {
    name: 'vm-item-group',
    mixins: [ThemeMixins],
    props: {
      reorder: {
        type: [String, Boolean],
        default: false
      },
      reorderEnabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        contentCmp: null,

        allowReorder: isTrueProperty(this.reorder),
        lastToIndex: -1
      }
    },
    created () {
      if (this.allowReorder) {
        let pageComponentChildrenList = this.$vnode.context.$children[0].$children || []
        pageComponentChildrenList.forEach((component) => {
          if (component.$options.name === 'vm-content') {
            this.contentCmp = component
          }
        })
      }
    },
    methods: {
      reorderPrepare () {
        let ele = this.$el
        let children = ele.children
        for (let i = 0, ilen = children.length; i < ilen; i++) {
          var child = children[i]
          child.dataset.order = i
        }
      },

      reorderStart () {
        setElementClass(this.$el, 'reorder-list-active', true)
      },

      reorderEmit (fromIndex, toIndex) {
        this.reorderReset()
        if (fromIndex !== toIndex) {
          const indexes = {from: fromIndex, to: toIndex}
          this.$emit('onItemReorder', indexes)
        }
      },

      scrollContent (scroll) {
        const scrollTop = this.contentCmp.scrollTop + scroll
        if (scroll !== 0) {
          this.contentCmp.scrollTo(0, scrollTop, 0)
        }
        return scrollTop
      },

      reorderReset () {
        let children = this.$el.children
        let len = children.length

        setElementClass(this.$el, 'reorder-list-active', false)
        let transform = 'transform'
        for (let i = 0; i < len; i++) {
          children[i].style[transform] = ''
        }
        this.lastToIndex = -1
      },

      reorderMove (fromIndex, toIndex, itemHeight) {
        if (this.lastToIndex === -1) {
          this.lastToIndex = fromIndex
        }
        let lastToIndex = this.lastToIndex
        this.lastToIndex = toIndex

      /** ******* DOM READ ********** */
        let children = this.$el.children

      /** ******* DOM WRITE ********* */
        let transform = 'transform'
        if (toIndex >= lastToIndex) {
          for (let i = lastToIndex; i <= toIndex; i++) {
            if (i !== fromIndex) {
              children[i].style[transform] = (i > fromIndex) ? `translateY(${-itemHeight}px)` : ''
            }
          }
        }

        if (toIndex <= lastToIndex) {
          for (let i = toIndex; i <= lastToIndex; i++) {
            if (i !== fromIndex) {
              children[i].style[transform] = (i < fromIndex) ? `translateY(${itemHeight}px)` : ''
            }
          }
        }
      }
    }
  }
</script>