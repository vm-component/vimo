<template>
    <div class="ion-list list" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "../item/item.scss";
    @import "../item/item.ios.scss";
    @import "../item/item.md.scss";
    @import "../item/item-media.scss";
    @import "../item/item-sliding.scss";
    @import "../item/item-reorder.scss";
    @import "./list.scss";
    @import "./list.ios.scss";
    @import "./list.md.scss";
</style>
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
   * radio对外事件: onChange
   *
   * ### item-sliding功能
   * 支持item-sliding（**此功能已开发完毕，但还需修改, 暂时不建议使用**）
   *

   *
   * ### 如何使用
   *
   * ```
   * // 引入
   * import { List } from 'vimo/components/list'
   * import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
   * // 安装
   * Vue.component(List.name, List)
   * Vue.component(ListHeader.name, ListHeader)
   * Vue.component(ItemGroup.name, ItemGroup)
   * Vue.component(Item.name, Item)
   * Vue.component(ItemSliding.name, ItemSliding)
   * Vue.component(ItemOptions.name, ItemOptions)
   * Vue.component(ItemDivider.name, ItemDivider)
   * // 或者
   * export default{
   *   components: {
   *    List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
   *  }
   * }
   * ```
   *
   * @props {string} [mode=ios]        - 样式模式
   * @props {Boolean} [sliding=false]  - 是否需要item-silding(开在开发)
   * @props {Boolean} [radioGroup]  - 是否为radioGroup
   * @props {String} [value]  - 支持v-model
   * @props {Boolean} [disabled=false]  - 当前radio的禁用状态
   *
   * @demo http://xiangsongtao.com/vimo/#/list
   * @see component:Item
   *
   * @usage
   * // 普通使用
   * <template>
   *    <Page>
   *        <Header>
   *            <Navbar>
   *                <Title>List</Title>
   *            </Navbar>
   *         </Header>
   *        <Content class="outer-content">
   *            <List>
   *                <!--header-->
   *                <ListHeader>
   *                    <span>Contents</span>
   *                </ListHeader>
   *                <!--group-->
   *                <ItemGroup>
   *                    <Item button to="list.listForAll">ListForAll</Item>
   *                    <Item button :to="{name:'list.basicList'}">BasicList</Item>
   *                    <Item button :to="{name:'list.noLine'}">NoLine</Item>
   *                    <Item button :to="{name:'list.insetList'}">InsetList</Item>
   *                    <Item button :to="{name:'list.listDividers'}">ListDividers</Item>
   *                    <Item button :to="{name:'list.listHeaders'}">listHeaders</Item>
   *                    <Item button :to="{name:'list.iconList'}">IconList</Item>
   *                    <Item button :to="{name:'list.avatarList'}">AvatarList</Item>
   *                    <Item button :to="{name:'list.multi-lineList'}">Multi-lineList</Item>
   *                    <Item button :to="{name:'list.slidingList'}">SlidingList</Item>
   *                    <Item button :to="{name:'list.reorder'}">Reorder</Item>
   *                    <Item button :to="{name:'list.thumbnailList'}">ThumbnailList</Item>
   *                </ItemGroup>
   *            </List>
   *        </Content>
   *    </Page>
   * </template>
   *
   * // 多列布局(两列三行)
   * <List>
   *    <ListHeader>
   *        <span>today</span>
   *    </ListHeader>
   *    <Item>
   *        <Avatar slot="item-left">
   *            <img src="./img/avatar-ts-woody.png">
   *        </Avatar>
   *        <Label>
   *            <h2>Woody</h2>
   *            <h3>Hello world</h3>
   *            <h4>This is third line</h4>
   *            <p>This town ain't big enough for the two of us!</p>
   *        </Label>
   *    </Item>
   *    <Item>
   *        <Avatar slot="item-left">
   *            <img src="./img/avatar-ts-buzz.png">
   *        </Avatar>
   *        <Label>
   *            <h2>Buzz Lightyear</h2>
   *            <h3>Hello world</h3>
   *            <p>My eyeballs could have been sucked from their sockets!</p>
   *        </Label>
   *    </Item>
   * </List>
   *
   *
   *
   */
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'List',
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
        default () { return this.$config.get('mode') || 'ios' }
      },
      /**
       * shouldEnable whether the item-sliding should be enabled or not
       * */
      sliding: [Boolean],

      // -------- Radio --------
      radioGroup: [Boolean],
      value: [String],
      disabled: [Boolean]
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
        if (isTrueProperty(this.radioGroup)) {
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
//      /**
//       * @method closeSlidingItems (暂时不可用)
//       * @description
//       * Close any sliding items that are open.关闭所有滑开的items
//       * */
//      // TODO: 关闭所有滑开的items
//      closeSlidingItems () {
//
//      },

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
      if (isTrueProperty(this.radioGroup)) {
        this.disableAllRadio(this.disabled)
      }
    }
  }
</script>
