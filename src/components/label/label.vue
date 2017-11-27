<template>
    <label class="ion-label label" :class="[modeClass,colorClass]"
           :fixed="fixed"
           :floating="floating"
           :stacked="stacked">
        <slot></slot>
    </label>
</template>
<style lang="scss" src="./label.scss"></style>
<script type="text/javascript" src="./label.js"></script>
