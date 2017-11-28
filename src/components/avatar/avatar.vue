<template>
    <div class="ion-avatar">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component Avatar
   * @description
   *
   * ## 列表组件 / Avatar圆形头像组件
   *
   * 在Item组件中放置圆形头像的组件
   *
   * @see component:List
   * @see component:Item
   * @see component:Thumbnail
   * @demo #/avatarList
   *
   * @usage
   *
   * import Avatar from 'vimo/lib/avatar'
   * Vue.component(Avatar.name, Avatar)
   *
   * <Avatar><img src=''></Avatar>
   *
   * */
  export default {
    name: 'Avatar'
  }
</script>
