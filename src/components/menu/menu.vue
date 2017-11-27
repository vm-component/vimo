<template>
    <div class="ion-menu"
         :id="id"
         :type="type"
         :side="side"
         :class="{'show-menu':showMenu}">
        <!--组件自己维护backdrop-->
        <Backdrop
                @click.native="$menu.close()"
                :isActive="showBackdrop"
                :class="{'show-backdrop':showBackdrop}"></Backdrop>
        <transition
                :name="animationName"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="menu-inner" v-show="isActive">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" src="./menu.scss"></style>
<script type="text/javascript" src="./menu.js"></script>
