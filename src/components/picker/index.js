import PickerComponent from './picker.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'

/**
 * @function present
 * @param {object} options - 传入参数
 * @param {Object} options.buttons - 组件初始化的button数据
 * @param {Array} options.columns - 组件初始化的column数据
 * @param {String} options.column.name - 组件初始化的column数据
 * @param {String} options.columns.align - 组件初始化的column数据
 * @param {String} [options.mode='ios'] - 模式
 * @param {String} [options.cssClass] - 样式
 * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否能关闭
 * @param {Function} [options.onChange=noop] - picker数据变化时触发, 某一个col变化也触发, 返回最新值
 * @param {Function} [options.onSelect=noop] - 某一列发生变化时触发
 * @description
 * 开启
 * @private
 * */
/**
 * @function dismiss
 * @description
 * 关闭
 * @private
 * */
class PickerInstance extends GeneratePopUpInstance {
  isPresentHandled (options) {
    return !options.isH5 &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.picker &&
      window.VM.platform.picker(options)
  }

  /**
   * 刷新
   * @private
   * */
  refresh () {
    this._ins && this._ins.refresh()
  }

  /**
   * 列重置
   * @private
   * */
  resetColumn (index) {
    this._ins && this._ins.resetColumn(index)
  }
}

export default new PickerInstance(PickerComponent, 'sheetPortal')

/**
 * @component Picker
 * @description
 *
 * ## 弹出层组件 / 单多列选择器Picker
 *
 * ### 简介
 *
 * Picker组件适用于单多列数据的选择, 这个不同于Select组件, Select组件只能做单类型数据的选择, 比如选择水果的话不能类别和新鲜度同时选择. 因此, 如果期望能进行城市三级选择, Picker能够解决这个需求, 详情参考Demo.
 *
 * ### 传参说明
 *
 * 因为Picker组件为了满足大多数的需求, 且能根据业务定制化, 比如被Datetime组件/CitySelect业务定制等. 因此Picker传参有点点麻烦. 主要参数如下:
 *
 *
 * #### 1. buttons属性
 *
 名称 / Name | 类型 / Type | 描述 / Description
 ----------|-----------|--------------------------------
 text      | string    | 显示的文本
 role      | string    | 按钮的角色, 取消按钮的role为cancel, 其他的没有
 handler   | function  | 点击按钮的处理方法
 *
 * #### 2. columns属性
 *
 名称 / Name     | 类型 / Type          | 描述 / Description
 --------------|--------------------|---------------------------
 name          | string             | 这个column的名称
 align         | string             | column对齐方式
 selectedIndex | number             | 当前column的初始选的位置(index)
 prefix        | string             | 这一列显示的前缀
 prefixWidth   | string             | 前缀固定宽度, 例如'50px'
 suffix        | string             | 这一列显示的后缀
 suffixWidth   | string             | 后缀固定宽度, 例如'50px'
 cssClass      | string             | 当前column的自定义样式, 使用空格分割多个值
 columnWidth   | string             | 每个column的最大宽度, 默认宽度均分
 optionsWidth  | string             | 每个column中的选项最大宽度
 options       | PickerColumnOption | 当前column的每个选项列表
 *
 *
 * #### 3. columns属性中的options属性
 *
 名称 / Name | 类型 / Type | 描述 / Description
 ----------|-----------|------------------
 text      | string    | 显示的文本
 value     | *         | 对显示文本的值
 disabled  | boolean   | 是否禁用
 *
 *
 * #### 4. onChange钩子
 *
 * 当用户选定后触发钩子, 传递的数据包括三列的详细选择信息.
 *
 * #### 5. onSelect钩子
 *
 * 某一列选择之后触发, 包含单列的选择信息
 *
 * ### 组件自动支持切换alipay组件
 *
 * 如果强制使用H5模式需要在开启options中传入`isH5=true`, alipay组件只支持最多两级且不可联动.
 *
 * ### 如何使用
 *
 * 因为是弹出层组件, 故引入后, `Picker.present(...)`就可打开组件
 *
 * ```
 *  import { Picker } from 'vimo'
 * ```
 *
 * @demo #/picker
 * */
