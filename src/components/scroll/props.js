const hasTouch = 'ontouchstart' in window
const DEFAULT = {
  startX: 0,
  startY: 0,
  scrollX: false,
  scrollY: true,
  freeScroll: false,
  directionLockThreshold: 5,
  eventPassthrough: '',
  click: false,
  tap: false,
  bounce: true,
  bounceTime: 700,
  momentum: true,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  swipeTime: 2500,
  swipeBounceTime: 500,
  deceleration: 0.001,
  flickLimitTime: 200,
  flickLimitDistance: 100,
  resizePolling: 60,
  probeType: 0,
  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: true,
  useTransition: true,
  useTransform: true,
  bindToWrapper: false,
  disableMouse: hasTouch,
  disableTouch: !hasTouch,
  /**
   * for picker
   * wheel: {
   *   selectedIndex: 0,
   *   rotate: 25,
   *   adjustTime: 400
   * }
   */
  wheel: false,
  /**
   * for slide
   * snap: {
   *   loop: false,
   *   el: domEl,
   *   threshold: 0.1,
   *   stepX: 100,
   *   stepY: 100,
   *   listenFlick: true
   * }
   */
  snap: false,
  /**
   * for scrollbar
   * scrollbar: {
   *   fade: true
   * }
   */
  scrollbar: false,
  /**
   * for pull down and refresh
   * pullDownRefresh: {
   *   threshold: 50,
   *   stop: 20
   * }
   */
  pullDownRefresh: false,
  /**
   * for pull up and load
   * pullUpLoad: {
   *   threshold: 50
   * }
   */
  pullUpLoad: false
}

function defaultDataToProps (defaults) {
  let props = {}
  for (let key in defaults) {
    let value = defaults[key]
    let valueType = typeof value
    let tmp = null
    switch (valueType) {
      case 'number':
        tmp = {
          type: [Number, String],
          default: value
        }
        break
      case 'string':
        tmp = {
          type: String,
          default: value
        }
        break
      case 'boolean':
        tmp = {
          type: [Boolean, Number],
          default: value
        }
        break
      case 'object':
        if (value) {
          tmp = {
            type: Object,
            default () {
              return JSON.parse(JSON.stringify(value))
            }
          }
        } else {
          // Number String Function
          tmp = {
            type: [Object, Number, String, Function, Array],
            default () {
              return null
            }
          }
        }
        break
      case 'function':
        tmp = {
          type: Function,
          default () {
            return value
          }
        }
        break
      case 'undefined':
        tmp = [Object]
        break
      default:
        tmp = [Object]
        console.debug('这个属性未找到::props.js::defaultDataToProps()')
        console.debug('key: ' + key)
        console.debug('value: ' + value)
        console.debug('valueType: ' + valueType)
        break
    }
    props[key] = tmp
  }
  return props
}

export default defaultDataToProps(DEFAULT)
