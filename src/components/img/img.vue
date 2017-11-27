<template>
    <div class="ion-img img" :class="{'img-loaded':isLoaded,'img-unloaded':!isLoaded}" :src="src"
         :style="{'width':w,'height':h}">
        <transition name="fade">
            <img v-show="isLoaded" ref="img" :alt="alt" :src="srcValue" :width="w" :height="h">
        </transition>
    </div>
</template>
<style lang="scss" src="./img.scss"></style>
<script type="text/javascript" src="./img.js"></script>
