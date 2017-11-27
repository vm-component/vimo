<template>
    <div class="ion-datetime" @click="clickHandler($event)"
         :displayFormat="displayFormat"
         :pickerFormat="pickerFormat"
         :min="min"
         :max="max">
        <div v-if="!text" class="datetime-text datetime-placeholder">{{placeholder}}</div>
        <div v-if="text" class="datetime-text">{{text}}</div>
        <vm-button type="button"
                   :id="_uid"
                   role="item-cover"
                   class="item-cover">
        </vm-button>
    </div>
</template>
<style lang="scss" src="./datetime.scss"></style>
<script type="text/javascript" src="./datetime.js"></script>
