<template>
    <button class="ion-button"
            :active="active"
            :icon-only="iconOnly"
            :icon-left="iconLeft"
            :icon-right="iconRight"
            :class="[modeClass, styleClass, shapeClass, displayClass, sizeClass, decoratorClass, colorClass,
              {'disable-hover':disableHover},
              {'item-button':isInItemComponent}]"
            @click="$_clickHandler($event)">
        <span class="button-inner"><slot></slot></span>
    </button>
</template>
<style lang="scss" src="./button.scss"></style>
<script type="text/javascript" src="./button.js"></script>
