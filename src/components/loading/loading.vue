<template>
    <div class="ion-loading" :class="[modeClass,cssClass]">
        <Backdrop :isActive="isActive && showBackdrop" :enableBackdropDismiss="false"></Backdrop>
        <transition name="alert"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave">
            <div class="loading-wrapper" v-show="isActive">
                <div v-if="showSpinner" class="loading-spinner">
                    <Spinner :name="spinner"></Spinner>
                </div>
                <div v-if="content" v-html="content" class="loading-content"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" src="./loading.scss"></style>
<script type="text/javascript" src="./loading.js"></script>
