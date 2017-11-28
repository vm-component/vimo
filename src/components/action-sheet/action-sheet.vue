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
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  import Backdrop from '../backdrop'
  import Button from '../button'
  import Icon from '../icon'
  import popupExtend from '../../util/popup-extend'
  import modeMixins from '../../util/mode-mixins.js'

  export default {
    name: 'ActionSheet',
    mixins: [modeMixins, popupExtend],
    props: {
      title: String,
      subTitle: String,
      cssClass: String,
      buttons: {
        type: Array,
        default: []
      },
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        normalButtons: [],  // 普通按钮组
        cancelButton: null // 取消按钮(组)，一般放在下面
      }
    },
    computed: {
      customerClass () {
        return this.cssClass && this.cssClass.trim()
      }
    },
    methods: {
      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭ActionSheet
       * 如存在cancel按钮的handler，则点击backdrop执行此handler
       * @private
       */
      bdClick () {
          /* istanbul ignore if */
        if (this.enabled && this.enableBackdropDismiss) {
          if (this.cancelButton) {
            this.click(this.cancelButton)
          } else {
            this.dismiss()
          }
        }
      },

      /**
       * @function click
       * @description
       * 点击下方按钮
       * @param {object} button Button Click Handler
       * @private
       */
      click (button) {
          /* istanbul ignore if  */
        if (!this.enabled) {
          return
        }
        let shouldDismiss = true
        if (button.handler) {
          // a handler has been provided, execute it
          if (button.handler() === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        // 当前不是在过渡动画中(dismissing中)，
        // 如果是在dismissing中，则意味着正在关闭，
        // 这里不必进行
        if (this.enabled && shouldDismiss) {
          this.dismiss()
        }
      },

      /**
       * 初始化buttons
       * @private
       * */
      init () {
        let arr = this.buttons
        let _buttons = []
          /* istanbul ignore if  */
        if (!Array.isArray(arr)) {
          return
        }
        arr.forEach((button) => {
          if (typeof button === 'string') {
            button = {text: button}
          }

          if (!button.cssClass) {
            button.cssClass = ''
          } else {
            // 去除收尾空格
            button.cssClass = button.cssClass.trim()
          }

          if (button.role === 'cancel') {
            this.cancelButton = button
          } else {
            if (button.role === 'destructive') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive'
            } else if (button.role === 'selected') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected'
            }
            _buttons.push(button)
          }
        })
        this.normalButtons = _buttons
      }
    },
    created () {
      this.init()
    },
    components: {
      'vm-backdrop': Backdrop,
      'vm-button': Button,
      'vm-icon': Icon
    }
  }
</script>
