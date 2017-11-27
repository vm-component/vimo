<template>
    <div class="ion-input" :class="[modeClass,{'clearInput':clearInput}]" @click="$_clickToFocus($event)">
        <div class="input-innerWrap">
            <input ref="input"
                   :class="[textInputClass]"
                   :value="inputValue"
                   :type="typeValue"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   :max="max"
                   :min="min"
                   :step="step"
                   :autofocus="autofocus"
                   @keyup="$_inputKeyUp($event)"
                   @blur="$_inputBlurred($event)"
                   @focus="$_inputFocused($event)"
                   @input="$_inputChanged($event)"
                   @keydown="$_inputKeyDown($event)">
        </div>
        <vm-button v-if="clearInput && hasValue"
                   clear
                   class="text-input-clear-icon"
                   @click="$_clearTextInput()"></vm-button>
    </div>
</template>
<style lang="scss" src="./input.scss"></style>
<script type="text/javascript" src="./input.js"></script>
