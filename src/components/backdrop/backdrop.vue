<template>
    <transition
            name="fade"
            @before-enter="beforeEnter"
            @after-leave="afterLeave">
        <div class="ion-backdrop"
             @click="bdClick"
             @touchmove="onTouchMoveHandler($event)"
             :class="{'backdrop-no-tappable':!enableBackdropDismiss,'fixed':fixed}"
             :style="{'left':left+'px','top':top+'px'}"
             v-show="isActiveLocal"></div>
    </transition>
</template>
<style lang="scss" src="./backdrop.scss"></style>
<script type="text/javascript" src="./backdrop.js"></script>
