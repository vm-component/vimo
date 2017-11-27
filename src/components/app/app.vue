<template>
    <article class="ion-app" :version="version" :id="mode"
             :style="styleObj"
             :class="[mode,modeClass,platformClass,{'disable-hover':disableHover},{'disable-scroll':disableScroll}]">
        <section class="app-root">
            <slot></slot>
        </section>
        <aside id="modalPortal"></aside>
        <aside id="sheetPortal"></aside>
        <aside id="alertPortal"></aside>
        <aside id="loadingPortal"></aside>
        <aside id="toastPortal"></aside>
        <aside class="click-block"
               :class="[{'click-block-enabled':isClickBlockEnabled,'click-block-active':isClickBlockActive}]"></aside>
        <slot name="outer"></slot>
    </article>
</template>
<style lang="scss" src="./app.scss"></style>
<script type="text/javascript" src="./app.js"></script>
