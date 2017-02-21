<template>
  <div class="">
    <input [(ngModel)]="_value" [type]="type" (blur)="inputBlurred($event)" (focus)="inputFocused($event)"
           [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input"
           [ngClass]="\text-input-\ + _mode" *ngIf="_type!==\textarea\" #input> +
    <textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)"
              [placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" class="text-input"
              [ngClass]="\text-input-\ + _mode" *ngIf="_type===\textarea\" #textarea></textarea> +
    <input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist"> +
    <button ion-button clear [hidden]="!clearInput" type="button" class="text-input-clear-icon"
            (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>
    +
    <div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)"
         (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>
  </div>
</template>
<style lang="scss">
  @import "./input.scss";
  @import "./input.ios.scss";

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Input',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>
