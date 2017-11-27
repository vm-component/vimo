<template>
    <div class="ion-infinite-scroll" :threshold="threshold" :state="state">
        <slot></slot>
    </div>
</template>
<style lang="scss" src="./infinite-scroll.scss"></style>
<script type="text/javascript" src="./infinite-scroll.js"></script>
