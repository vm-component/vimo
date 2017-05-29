<template>
    <div class="vm-slideBox">
        <div class="vm-slideBox-placeholder">{{placeholder}}</div>

        <!--绿色背景-->
        <div class="vm-slideBox-track">
            <div class="track-green">

            </div>
        </div>

        <!--按钮-->
        <div class="vm-slideBox-btn"
             @touchstart="onPointerStartHandler($event)"
             @touchend="onPointerEndHandler($event)"
             @touchmove="onPointerMoveHandler($event)"></div>

    </div>
</template>
<style lang="scss">
    .vm-slideBox {
        position: relative;
        height: 52px;
        box-shadow: 0 0 3px #999;
        background-color: #ddd;
        .vm-slideBox-placeholder {
            background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-animation: slidetounlock 3s infinite;
            -webkit-text-size-adjust: none;
            line-height: 52px;
            height: 52px;
            text-align: center;
            font-size: 16px;
            display: block;
            width: 100%;
            color: #aaa;
            @keyframes slidetounlock {
                0% {
                    background-position: -200px 0
                }
                100% {
                    background-position: 200px 0
                }
            }
        }

        .vm-slideBox-track {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0;
            overflow: hidden;
            .track-green {
                line-height: 52px;
                height: 52px;
                text-align: center;
                font-size: 16px;
                background-color: #78c430;
                color: #fff;
                width: 100%;
            }
        }
        .vm-slideBox-btn {
            position: absolute;
            left: 0;
            top: 0;
            width: 52px;
            height: 52px;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff url(./images/arrow.png) no-repeat center center/20px 20px;
        }
    }
</style>
<script type="text/javascript">
  /**
   *
   * */
  import { pointerCoord } from '../../util/util'
  export default{
    name: 'name',
    data(){
      return {
        rect: null
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '向右滑动验证'
      }
    },
    watch: {},
    computed: {},
    methods: {
      onPointerStartHandler ($event) {
        let coord = pointerCoord($event)
        this.pointerStart = coord.x
      },
      onPointerMoveHandler ($event) {

      },
      onPointerEndHandler ($event) {

      }
    },
    created () {},
    mounted () {
      this.rect = this.$el.getBoundingClientRect()

    },
    activated(){},
    components: {}
  }
</script>
