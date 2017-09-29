/**
 * 获取组件的props对象,
 * 这里根据swiper提供的defaults对象生成props格式的数据
 * @return {Object}
 * @private
 * */
export function getProps () {
  const defaults = {
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    // autoplay
    autoplay: false,
    autoplayDisableOnInteraction: true,
    autoplayStopOnLast: false,
    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    iOSEdgeSwipeDetection: false,
    iOSEdgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    coverflow: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    flip: {
      slideShadows: true,
      limitRotation: true
    },
    cube: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    fade: {
      crossFade: false
    },
    // Parallax
    parallax: false,
    // Zoom
    zoom: false,
    zoomMax: 3,
    zoomMin: 1,
    zoomToggle: true,
    // Scrollbar
    scrollbar: null,
    scrollbarHide: true,
    scrollbarDraggable: false,
    scrollbarSnapOnRelease: false,
    // Keyboard Mousewheel
    keyboardControl: false,
    mousewheelControl: false,
    mousewheelReleaseOnEdges: false,
    mousewheelInvert: false,
    mousewheelForceToAxis: false,
    mousewheelSensitivity: 1,
    mousewheelEventsTarged: 'container',
    // Hash Navigation
    hashnav: false,
    hashnavWatchState: false,
    // History
    history: false,
    // Commong Nav State
    replaceState: false,
    // Breakpoints
    breakpoints: undefined,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    onlyExternal: false,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Pagination
    pagination: null,
    paginationElement: 'span',
    paginationClickable: false,
    paginationHide: false,
    paginationBulletRender: null,
    paginationProgressRender: null,
    paginationFractionRender: null,
    paginationCustomRender: null,
    paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Next/prev buttons
    nextButton: null,
    prevButton: null,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Lazy Loading
    lazyLoading: false,
    lazyLoadingInPrevNext: false,
    lazyLoadingInPrevNextAmount: 1,
    lazyLoadingOnTransitionStart: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    // Control
    control: undefined,
    controlInverse: false,
    controlBy: 'slide', // or 'container'
    normalizeSlideIndex: true,
    // Swiping/no swiping
    allowSwipeToPrev: true,
    allowSwipeToNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    bulletClass: 'swiper-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active',
    buttonDisabledClass: 'swiper-button-disabled',
    paginationCurrentClass: 'swiper-pagination-current',
    paginationTotalClass: 'swiper-pagination-total',
    paginationHiddenClass: 'swiper-pagination-hidden',
    paginationProgressbarClass: 'swiper-pagination-progressbar',
    paginationClickableClass: 'swiper-pagination-clickable', // NEW
    paginationModifierClass: 'swiper-pagination-', // NEW
    lazyLoadingClass: 'swiper-lazy',
    lazyStatusLoadingClass: 'swiper-lazy-loading',
    lazyStatusLoadedClass: 'swiper-lazy-loaded',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    notificationClass: 'swiper-notification',
    preloaderClass: 'preloader',
    zoomContainerClass: 'swiper-zoom-container',

    // Observer
    observer: false,
    observeParents: false,
    // Accessibility
    a11y: false,
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
    firstSlideMessage: 'This is the first slide',
    lastSlideMessage: 'This is the last slide',
    paginationBulletMessage: 'Go to slide {{index}}',
    // Callbacks
    runCallbacksOnInit: true
  }
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
        console.debug('这个属性未找到::interface.js::getProps()')
        console.debug('key: ' + key)
        console.debug('value: ' + value)
        console.debug('valueType: ' + valueType)
        break
    }
    props[key] = tmp
  }
  return props
}

/**
 * 根据事件钩子获取, 将swiper的默认参数和时间
 * @param {Object} slideComponent - slide的组件实例 -> this
 * @private
 * */
export function getEvents (slideComponent) {
  console.assert(
    slideComponent,
    'The method of getEvents() need params of slideComponent!'
  )
  return {
    onInit (swiper) {
      slideComponent.$emit('onInit', swiper)
    },
    onDestroy (swiper) {
      slideComponent.$emit('onDestroy', swiper)
    },
    onBeforeResize (swiper) {
      slideComponent.$emit('onBeforeResize', swiper)
    },
    onAfterResize (swiper) {
      slideComponent.$emit('onAfterResize', swiper)
    },
    onClick (swiper, e) {
      slideComponent.$emit('onClick', swiper, e)
    },
    onTap (swiper, e) {
      slideComponent.$emit('onTap', swiper, e)
    },
    onDoubleTap (swiper, e) {
      slideComponent.$emit('onDoubleTap', swiper, e)
    },
    onSliderMove (swiper, e) {
      slideComponent.$emit('onSliderMove', swiper, e)
    },
    onSlideChangeStart (swiper) {
      slideComponent.$emit('onSlideChangeStart', swiper)
    },
    onSlideChangeEnd (swiper) {
      slideComponent.$emit('onSlideChangeEnd', swiper)
    },
    onTransitionStart (swiper) {
      slideComponent.$emit('onTransitionStart', swiper)
    },
    onTransitionEnd (swiper) {
      slideComponent.$emit('onTransitionEnd', swiper)
    },
    onImagesReady (swiper) {
      slideComponent.$emit('onImagesReady', swiper)
    },
    onProgress (swiper, progress) {
      slideComponent.$emit('onProgress', swiper, progress)
    },
    onTouchStart (swiper, e) {
      slideComponent.$emit('onTouchStart', swiper, e)
    },
    onTouchMove (swiper, e) {
      slideComponent.$emit('onTouchMove', swiper, e)
    },
    onTouchMoveOpposite (swiper, e) {
      slideComponent.$emit('onTouchMoveOpposite', swiper, e)
    },
    onTouchEnd (swiper, e) {
      slideComponent.$emit('onTouchEnd', swiper, e)
    },
    onReachBeginning (swiper) {
      slideComponent.$emit('onReachBeginning', swiper)
    },
    onReachEnd (swiper) {
      slideComponent.$emit('onReachEnd', swiper)
    },
    onSetTransition (swiper, duration) {
      slideComponent.$emit('onSetTransition', swiper, duration)
    },
    onSetTranslate (swiper, translate) {
      slideComponent.$emit('onSetTranslate', swiper, translate)
    },
    onAutoplayStart (swiper) {
      slideComponent.$emit('onAutoplayStart', swiper)
    },
    onAutoplayStop (swiper) {
      slideComponent.$emit('onAutoplayStop', swiper)
    },
    onLazyImageLoad (swiper, slide, image) {
      slideComponent.$emit('onLazyImageLoad', swiper, slide, image)
    },
    onLazyImageReady (swiper, slide, image) {
      slideComponent.$emit('onLazyImageReady', swiper, slide, image)
    },
    onKeyPress (swiper, keyCode) {
      slideComponent.$emit('onKeyPress', swiper, keyCode)
    }
  }
}
