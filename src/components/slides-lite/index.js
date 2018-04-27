export { default } from './slides-lite.vue'
/**
 * @component SlidesLite
 * @description
 *
 * ## 轮播组件 / 精简版Slides组件
 *
 * 参考的项目源自`swipe-js-iso`, 详情转向下方链接, 此外 为了保证和Slide组件接口的一致性, 将同操作和同属性的接口改成和Slides一致的名称
 *
 *
 * ### 对照表
 *
 当前属性 / Props                  | 原始名称 / Original              | 类型 / type  | 默认值 / Default | 描述 / Description
 ------------------------------|------------------------------|------------|---------------|-------------------------------------------------------------------------------------------
 initialSlide                  | startSlide                   | Number     | 0             | index position Swipe should start at
 speed                         | speed                        | Number     | 300           | speed of prev and next transitions in milliseconds.
 autoplay                      | auto                         | Number     | -             | begin with auto slideshow (time in milliseconds between slides)
 loop                          | continuous                   | Boolean    | true          | create an infinite feel with no endpoints
 -                             | disableScroll                | Boolean    | false         | stop any touches on this container from scrolling the page(点击拖动轮播是否能滚动页面,pc上可以,移动端不起作用)
 touchMoveStopPropagation      | stopPropagation              | Boolean    | false         | stop event propagation
 pagination                    | -                            | String     | ''            | 只能是'.swiper-pagination'

 *
 *
 当前事件 / Event                  | 原始名称 / Original              | 类型 / type  | 默认值 / Default | 描述 / Description
 ----------------------------- | ---------------------------- | ---------- | -------       | -----------------------------------------------------------------------------------------
 onProgress(swiper, progress)  | swiping(progress)            | Function   | noop          | invoked while swiping with the percentage (0-1) of the full width that has been swiped.
 onSlideChangeEnd(swiper)      | callback(index, elem)        | Function   | noop          | runs at slide change(改变即触发).
 onTransitionEnd(swiper)       | transitionEnd(index, elem)   | Function   | noop          | sruns at the end slide transition(改变并且动画完毕后触发, 实际比callback晚点).
 *
 *
 实例方法 / Methods                         | 原始名称 / Original        | 描述 / Description
 ---------------------------------------|------------------------|-----------------------------------------------------------------------------
 slidePrev(runCallbacks, speed)         | prev()                 | slide to prev
 slideNext(runCallbacks, speed)         | next()                 | slide to next
 mySwiper.activeIndex                   | getPos()               | returns current slide index position(返回当前的index)
 mySwiper.slides.length                 | getNumSlides()         | returns the total amount of slides(返回轮播子页面的个数)
 slideTo(index, duration, runCallbacks) | slide(index, duration) | slide to set index position (duration: speed of transition in milliseconds)
 stopAutoplay()                         | stop()                 | 停止自动滚动
 destroy()                              | kill()                 | 移除销毁
 *
 *
 * @demo #/slides-lite
 * @see https://github.com/voronianski/swipe-js-iso
 * */
