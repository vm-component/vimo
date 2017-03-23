<template>
    <article class="ion-page">
        <slot></slot>
    </article>
</template>
<style lang="scss">
    // Page Container Structure
    // --------------------------------------------------
    .ion-page {
        position: absolute;
        top: 0;
        left: 0;
        display: block;

        width: 100%;
        height: 100%;

        // do not show, but still render so we can get dimensions
        opacity: 1;
        z-index: 10;
    }

    .ion-page.show-page {
        // show the page now that it's ready
        opacity: 1;
    }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Page',
  }
</script>