<template>
    <div class="ion-list" :class="[modeClass]">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
  /**
   * @component List
   * @description
   *
   * ## 列表组件 / List
   *
   * ### 概述
   * list有多重种风格的样式，有ios/android等等,对应ios/md模式.
   *
   *
   * ### 拓展
   * 此外, List组件也是`radioGroup`的管理域. 因为单选的确定需要一个父集. radio的使用需要开启`radioGroup`. 同时, v-model/事件等才能正常运行. 因为, List组件是radio-group的受体, 当点击radio时, radio向外寻找到这里, 传递v-model信息.
   *
   * ### 如何使用
   *
   * ```
   * // 引入
   * import List from 'vimo/lib/list'
   * import { ListHeader, ItemGroup, Item, ItemDivider } from 'vimo/lib/item'
   * // 安装
   * Vue.component(List.name, List)
   * Vue.component(ListHeader.name, ListHeader)
   * Vue.component(ItemGroup.name, ItemGroup)
   * Vue.component(Item.name, Item)
   * Vue.component(ItemDivider.name, ItemDivider)
   * // 或者
   * export default{
   *   components: {
   *    List, ListHeader, ItemGroup, Item, ItemDivider
   *  }
   * }
   * ```
   *
   * @props {string} [mode=ios]        - 样式模式
   * @props {Boolean} [radioGroup=false]  - 是否为radioGroup
   * @props {String} [value]  - 支持v-model
   * @props {Boolean} [disabled=false]  - 当前radio的禁用状态
   *
   * @usage
   * <!--普通使用-->
   * <template>
   *    <vm-page>
   *        <vm-header>
   *            <vm-navbar>
   *                <vm-title>List</vm-title>
   *            </vm-navbar>
   *         </vm-header>
   *        <vm-content class="outer-content">
   *            <vm-list>
   *                <!--header-->
   *                <vm-list-header>
   *                    <span>Contents</span>
   *                </vm-list-header>
   *                <!--group-->
   *                <vm-item-group>
   *                    <vm-item button to="list.listForAll">ListForAll</vm-item>
   *                    <vm-item button :to="{name:'list.basicList'}">BasicList</vm-item>
   *                    <vm-item button :to="{name:'list.noLine'}">NoLine</vm-item>
   *                    <vm-item button :to="{name:'list.insetList'}">InsetList</vm-item>
   *                    <vm-item button :to="{name:'list.listDividers'}">ListDividers</vm-item>
   *                    <vm-item button :to="{name:'list.listHeaders'}">listHeaders</vm-item>
   *                    <vm-item button :to="{name:'list.iconList'}">IconList</vm-item>
   *                    <vm-item button :to="{name:'list.avatarList'}">AvatarList</vm-item>
   *                    <vm-item button :to="{name:'list.multi-lineList'}">Multi-lineList</vm-item>
   *                    <vm-item button :to="{name:'list.slidingList'}">SlidingList</vm-item>
   *                    <vm-item button :to="{name:'list.reorder'}">Reorder</vm-item>
   *                    <vm-item button :to="{name:'list.thumbnailList'}">ThumbnailList</vm-item>
   *                </vm-item-group>
   *            </vm-list>
   *        </vm-content>
   *    </vm-page>
   * </template>
   *
   * <!--多列布局(两列三行)-->
   * <vm-list>
   *    <vm-list-header>
   *        <span>today</span>
   *    </vm-list-header>
   *    <vm-item>
   *        <vm-avatar slot="item-left">
   *            <img src="./img/avatar-ts-woody.png">
   *        </vm-avatar>
   *        <vm-label>
   *            <h2>Woody</h2>
   *            <h3>Hello world</h3>
   *            <h4>This is third line</h4>
   *            <p>This town ain't big enough for the two of us!</p>
   *        </vm-label>
   *    </vm-item>
   *    <vm-item>
   *        <vm-avatar slot="item-left">
   *            <img src="./img/avatar-ts-buzz.png">
   *        </vm-avatar>
   *        <vm-label>
   *            <h2>Buzz Lightyear</h2>
   *            <h3>Hello world</h3>
   *            <p>My eyeballs could have been sucked from their sockets!</p>
   *        </vm-label>
   *    </vm-item>
   * </vm-list>
   *
   * <!--Radio-->
   * <vm-list radio-group v-model="fruits" :disabled="isListDisabled" @onChange="onChangeHandler">
   *    <vm-list-header>Fruits</vm-list-header>
   *    <vm-item>
   *        <vm-label>Apple</vm-label>
   *        <vm-radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Banana</vm-label>
   *        <vm-radio value="banana" color="danger" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Cherry (secondary color)</vm-label>
   *        <vm-radio value="cherry" color="secondary" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Disabled</vm-label>
   *        <vm-radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   *    <vm-item>
   *        <vm-label>Default</vm-label>
   *        <vm-radio value="default" @onSelect="onSelectHandler"></vm-radio>
   *    </vm-item>
   * </vm-list>
   *
   * @fires component:List#onChange
   *
   * @see component:Item
   * @demo #/list
   */
  export default {
    name: 'vm-list',
    data () {
      return {
        // -------- Radio --------
        radioComponentList: [],
        isSendOut: false,
        timer: null
      }
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * shouldEnable whether the item-sliding should be enabled or not
       * */
      sliding: Boolean,

      // -------- Radio --------
      radioGroup: Boolean,
      value: String,
      disabled: Boolean
    },
    watch: {
      value (val) {
        if (this.isSendOut) {
          this.isSendOut = false
        } else {
          this.radioComponentList.forEach((radioComponent) => {
            if (!radioComponent.isDisabled) {
              radioComponent.setChecked(val)
            }
          })
        }
      },
      disabled (isDisabled) {
        if (this.radioGroup) {
          this.disableAllRadio(isDisabled)
          this.onRadioChange(null)
        }
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `list-${this.mode}`
      }
    },
    methods: {

      // -------- Radio --------
      /**
       * radio组件点击时执行这个命令
       * @private
       * */
      onRadioChange (value) {
        this.radioComponentList.forEach((radioComponent) => {
          if (!radioComponent.isDisabled) {
            radioComponent.setChecked(value)
          }
        })
        this.isSendOut = true
        /**
         * @event component:List#onChange
         * @description Radio组件数值变化时触发
         * @property {*} value - 变化值
         */
        this.$emit('input', value)
        this.$emit('onChange', value)
      },

      /**
       * 禁用全部radio
       * @private
       * */
      disableAllRadio (isDisable) {
        this.radioComponentList.forEach((radioComponent) => {
          radioComponent.setDisabled(isDisable)
        })
      },

      /**
       * 让radio组件记录自己
       * @private
       * */
      recordRadio (radioComponent) {
        this.radioComponentList.push(radioComponent)

        this.timer && window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          this.radioComponentList.forEach((radioComponent) => {
            if (!radioComponent.isDisabled) {
              radioComponent.setChecked(this.value)
            }
          })
        }, 0)
      }
    },
    mounted () {
      // -------- Radio --------
      // 内部定义了Radio组件
      if (this.radioGroup) {
        this.disableAllRadio(this.disabled)
      }
    }
  }
</script>
<style lang="less">
    @import "list";
    @import "list.ios.less";
    @import "list.md.less";
</style>