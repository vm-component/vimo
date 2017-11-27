<template>
    <div class="ion-alert" :class="[modeClass,cssClass && cssClass.trim(),{'alert-top':isAlertTop}]">
        <vm-backdrop @click.native="bdClick()" :enableBackdropDismiss="enableBackdropDismiss"
                     :isActive="isActive"></vm-backdrop>
        <transition name="alert"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave">
            <div class="alert-wrapper" v-show="isActive">
                <div class="alert-image-box" v-if="image">
                    <img class="alert-image" :src="image">
                </div>
                <div class="alert-head">
                    <h2 class="alert-title" v-if="title">{{title}}</h2>
                    <h3 class="alert-sub-title" v-if="subTitle" v-html="subTitle"></h3>
                </div>
                <div class="alert-message" v-html="message"></div>
                <div v-if="inputs && inputs.length>0">
                    <div v-if="inputType==='radio'" class="alert-radio-group" role="radiogroup">
                        <vm-button role="alert-radio-button" v-for="(i,index) in inputsForDispaly" @click="rbClick(i)"
                                   :key="index"
                                   :aria-checked="i.checked" :disabled="i.disabled" :id="i.id"
                                   class="alert-tappable alert-radio">
                            <div class="alert-radio-icon">
                                <div class="alert-radio-inner"></div>
                            </div>
                            <div class="alert-radio-label">
                                <span>{{i.label}}</span>
                            </div>
                        </vm-button>
                    </div>
                    <div class="alert-checkbox-group" v-if="inputType==='checkbox'">
                        <vm-button :id="i.id" role="alert-checkbox-button" :aria-checked="i.checked"
                                   v-for="(i,index) in inputsForDispaly" @click="cbClick(i)" :key="index"
                                   :checked="i.checked" :disabled="i.disabled" class="alert-tappable alert-checkbox">
                            <div class="alert-checkbox-icon">
                                <div class="alert-checkbox-inner"></div>
                            </div>
                            <div class="alert-checkbox-label">
                                <span>{{i.label}}</span>
                            </div>
                        </vm-button>
                    </div>
                    <div v-if="inputType!='radio' && inputType!='checkbox'" class="alert-input-group">
                        <div v-for="i in inputsForDispaly" class="alert-input-wrapper">
                            <input :ref="i.id" :id="i.id" :value="i.value" :placeholder="i.placeholder" :type="i.type"
                                   class="alert-input">
                        </div>
                    </div>
                </div>
                <div class="alert-button-group" :class="{'alert-button-group-vertical':buttonsForDisplay.length>2}">
                    <vm-button role="alert-button" v-for="(b,index) in buttonsForDisplay" :key="index"
                               @click="btnClick(b)"
                               :class="[b.cssClass]">
                        <span>{{b.text}}</span>
                    </vm-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" src="./alert.scss"></style>
<script type="text/javascript" src="./alert.js"></script>
