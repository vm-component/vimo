<template>
  <div class="ion-spinner">
    <svg viewBox="0 0 64 64" v-for="i in _c" [ngStyle]="i.style">
      <circle [attr.r]="i.r" transform="translate(32,32)"></circle>
    </svg>
    <svg viewBox="0 0 64 64" *ngFor="let i of _l" [ngStyle]="i.style">
      <line [attr.y1]="i.y1" [attr.y2]="i.y2" transform="translate(32,32)"></line>
    </svg>
  </div>
</template>
<style scoped lang="scss">
  @import './spinner';
  @import './spinner.ios';
  @import './spinner.md';
  @import './spinner.wp';

</style>
<script type="text/ecmascript-6">
  export default{
    prop: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * mode 按钮平台 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: 'ios',
      },

      /**
       * name 按钮风格
       * */
      name: {
        type: String,
        default: 'ios',
      },

      /**
       * duration 持续时间
       * */
      duration: {
        type: String,
        default: '0',
      },

      /**
       * paused 是否暂停
       * */
      paused: {
        type: Boolean,
        default: false,
      },

    },
    data(){
      return {
        _init:false,
        _l:[],
        _c:[],


      }
    },
    watch: {},
    computed: {
      colorClass: function () {

      },

    },
    methods: {
      load:function () {
        if (this._init) {
          this._l = [];
          this._c = [];

          var name = this._name || this._config.get('spinner', 'ios');

          const spinner = SPINNERS[name];
          if (spinner) {
            if (spinner.lines) {
              for (var i = 0, l = spinner.lines; i < l; i++) {
                this._l.push(this._loadEle(spinner, i, l));
              }

            } else if (spinner.circles) {
              for (var i = 0, l = spinner.circles; i < l; i++) {
                this._c.push(this._loadEle(spinner, i, l));
              }
            }

            this.setElementClass(`spinner-${name}`, true);
            this.setElementClass(`spinner-${this._mode}-${name}`, true);
          }
        }
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>
