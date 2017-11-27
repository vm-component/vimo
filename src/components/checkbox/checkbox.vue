<template>
    <div class="ion-checkbox" :class="[modeClass,colorClass,{'checkbox-disabled':disabledValue}]">
        <div class="checkbox-icon" :class="{'checkbox-checked':checkedValue}">
            <div class="checkbox-inner"></div>
        </div>
        <vm-button role="item-cover"
                   :mode="mode"
                   @click="onPointerDownHandler()"
                   type="button"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<style lang="scss" src="./checkbox.scss"></style>
<script type="text/javascript" src="./checkbox.js"></script>
