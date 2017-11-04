<template>
    <i class="ion-icon"
       :class="[colorClass,nameClass,itemClass,{'hide':hidden}]"></i>
</template>
<style lang="less">
    @import "icon";
    @import "icon.ios.less";
    @import "icon.md.less";
</style>
<script type="text/javascript">
  export default {
    name: 'Icon',
    props: {
      /**
       * 指定图标使用模式
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('iconMode') || 'ios' }
      },
      /**
       * 按钮color：
       * primary:    #007aff,
       * secondary:  #32db64,
       * danger:     #d91e18,
       * light:      #f4f4f4,
       * dark:       #222,
       * */
      color: String,
      /**
       * icon的名字, 默认的名字
       * */
      name: [String, Boolean],

      /**
       * 激活状态的图标样式,
       * 如果未定义,则为:
       * ion -> `${this.name}-outline`
       * */
      activeName: String,

      /**
       * 表示当前的图标的状态
       *
       * 特殊情况:
       * 当定义了activeIcon时, 则使用这个字段的值作为激活状态的图标
       *
       * 在name中设置normal状态的图标
       * 在activeName中设置激活状态的图标样式
       *
       * */
      isActive: {
        type: Boolean,
        default: true
      },

      ios: String,
      md: String
    },
    data () {
      return {
        nameClass: '', // 最终显示的nameClass
        itemClass: '',
        nameValue: null,
        hidden: false // 是否隐藏图标
      }
    },
    watch: {
      isActive () {
        this.update()
      },
      name () {
        this.update()
      },
      activeName () {
        this.update()
      },
      ios () {
        this.update()
      },
      md () {
        this.update()
      }
    },
    computed: {
      // 颜色
      colorClass () {
        return this.color ? (`icon-${this.mode}-${this.color}`) : ''
      }
    },
    methods: {
      getNameValue (val) {
        if (!(/^md-|^ios-|^logo-|^icon-/.test(val))) {
          // this does not have one of the defaults
          // so lets auto add in the mode prefix for them
          return this.mode + '-' + val
        } else {
          return val
        }
      },
      update () {
        let iconName
        this.hidden = !this.name && !this.ios && !this.md
        if (this.hidden) return

        if (this.isActive && this.activeName) {
          this.nameValue = this.getNameValue(this.activeName)
        } else {
          this.nameValue = this.getNameValue(this.name)
        }

        if (this.ios && this.mode === 'ios') {
          // ios-star ios
          iconName = this.ios
        } else if (this.md && this.mode === 'md') {
          // md-star md
          iconName = this.md
        } else {
          // ios-star md-star icon-star
          iconName = this.nameValue
        }

        let iconMode = iconName.split('-', 2)[0]
        if (iconMode === 'ios' && !this.isActive &&
          iconName.indexOf('logo-') < 0 &&
          iconName.indexOf('-outline') < 0) {
          // ios-star -> ios-star-outline
          iconName += '-outline'
        }
        // ios-star-outline -> ion-ios-star-outline
        // ios-star -> ion-ios-star-outline
        // icon-star -> icon-star
        if (iconMode === 'icon') {
          this.nameClass = iconName
        } else {
          this.nameClass = 'ion-' + iconName
        }
      }
    },
    created () {
      this.update()
    },
    mounted () {
      if (this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
        // button in items should add class of 'item-button'
        this.itemClass = 'item-icon'
      }
    }
  }
</script>
