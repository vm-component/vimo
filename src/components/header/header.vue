<template>
    <header class="ion-header" :class="[modeClass,{'hide-bar':isHide}]" :style="style">
        <div ref="rightButtonPlaceholder" id="rightButtonPlaceholder"></div>
        <slot></slot>
    </header>
</template>
<script type="text/javascript" src="./header.js"></script>
