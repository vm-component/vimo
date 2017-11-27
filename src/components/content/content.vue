<template>
    <article class="ion-content" :class="[refreshClass,modeClass]">
        <slot name="refresher"></slot>
        <div class="fixed-content fixed-top" :style="{'top':`${headerBarHeight}px`}">
            <slot name="fixed"></slot>
            <slot name="fixed-top"></slot>
        </div>
        <div class="fixed-content fixed-bottom" :style="{'bottom':`${footerBarHeight}px`}">
            <slot name="fixed-bottom"></slot>
        </div>
        <section ref="scrollElement" class="scroll-content" :style="scrollElementStyle" :class="{'disable-scroll':isScrollDisabled}">
            <slot></slot>
        </section>
    </article>
</template>
<style lang="scss" src="./content.scss"></style>
<script type="text/javascript" src="./content.js"></script>
