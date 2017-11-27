<template>
    <div class="ion-action-sheet" :class="[modeClass, customerClass]">
        <vm-backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                     :isActive="isActive"></vm-backdrop>
        <transition
                name="action-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="action-sheet-wrapper" v-show="isActive">
                <div class="action-sheet-container">
                    <!--group normal-->
                    <div class="action-sheet-group">
                        <div class="action-sheet-title" v-if="title">
                            <span>{{title}}</span>
                            <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
                        </div>
                        <div class="action-sheet-buttons">
                            <vm-button role="action-sheet-button" @click="click(b)" v-for="(b,index) in normalButtons"
                                       icon-left
                                       :key="index"
                                       :class="[b.cssClass,{'icon-left':b.icon}]">
                                <vm-icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></vm-icon>
                                <span>{{b.text}}</span>
                            </vm-button>
                        </div>
                    </div>
                    <!--group cancel-->
                    <div class="action-sheet-group" v-if="cancelButton">
                        <vm-button role="action-sheet-button" @click="click(cancelButton)" icon-left
                                   class="action-sheet-cancel" :class="cancelButton.cssClass">
                            <vm-icon :name="cancelButton.icon" v-if="cancelButton.icon"
                                     class="action-sheet-icon"></vm-icon>
                            <span>{{cancelButton.text || 'Cancel'}}</span>
                        </vm-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" src="./action-sheet.scss"></style>
<script type="text/javascript" src="./action-sheet.js"></script>
