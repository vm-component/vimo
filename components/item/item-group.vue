<template>
    <div class="ion-item-group">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Item/ItemGroup
   * @description
   *
   * ## 列表组件 / ItemGroup元素组
   *
   * 被ItemGroup包裹的Item的第一个元素没有上面框, 最后一个元素没下边框.
   *
   * @demo #/list
   * */
  export default {
    name: 'ItemGroup'
  }
</script>
