<script type="text/javascript">
  import ItemMixin from '../../mixins/item-mixin/index';
  import { isPresent, isString } from '../../util/type';

  export default {
    mixins: [ItemMixin],
    name: 'Item',
    data() {
      return {
        isInMenu: this.wait // 判断是否在menu组件中, 如果在menu中, 则
      };
    },
    props: {
      /**
       * 指向跳转
       * 当被点击后，内部会立刻把 to 的值传到 router.push()
       * 所以这个值可以是一个字符串或者是描述目标位置的对象
       * */
      to: [String, Object],

      append: Boolean,

      /**
       * 设置 replace 属性的话，当点击时，会调用 router.replace()
       * 而不是 router.push()，于是导航后不会留下 history 记录。
       * */
      replace: Boolean,

      /**
       * 如果是在menus中, 可以设置这个值, 当menus完全关闭时再出发跳转动作
       * */
      wait: Boolean
    },
    methods: {
      /**
       * 类似于a标签跳转
       * */
      $_clickHandler($event) {
        const _this = this;
        const router = this.$router;
        const current = this.$route;
        let _to = this.to;
        if (isPresent(router) && isPresent(current) && isPresent(_to)) {
          if (isString(_to)) {
            _to = {
              name: _to
            };
          }

          // 返回数据: {location, route, href}
          const { location } = router.resolve(_to, current, this.append);

          // 如果在menu跳转, 则需要等待menu关闭后再跳转
          if (this.isInMenu) {
            this.$menu.close();
            this.$root && this.$root.$on('onMenuClosed', directToHandler);
          } else {
            // 正常情况
            doRedirect();
          }

          // 事件处理函数
          // eslint-disable-next-line no-inner-declarations
          function directToHandler() {
            _this.$root && _this.$root.$off('onMenuClosed', directToHandler);
            doRedirect();
          }

          // 跳转
          // eslint-disable-next-line no-inner-declarations
          function doRedirect() {
            if (_this.replace) {
              router.replace(location);
            } else {
              router.push(location);
            }
          }
        } else {
          this.$emit('click', $event);
        }
      },
      /**
       * 获取组件类Label的文本
       * */
      getLabelText() {
        let list = [];
        if (this.$slots['default'] && this.$slots['default'].length > 0) {
          list = this.$slots['default'];
        }
        for (let i = 0, len = list.length; len > i; i++) {
          let item = list[i];
          let hasValue = !!item.tag || (!!item.text && !!item.text.trim());
          if (hasValue && item.elm && item.elm.textContent) {
            return item.elm.textContent.toString().trim();
          }
        }
        return '';
      }
    }
  };
</script>

