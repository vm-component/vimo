/**
 * 更新img
 * @param {Img[]} imgs
 * @param {number} viewableTop
 * @param {number} contentHeight
 * @param {string} scrollDirectionY
 * @param {number} requestableBuffer
 * @param {number} renderableBuffer
 * @private
 * */
export function updateImgs (imgs, viewableTop, contentHeight, scrollDirectionY, requestableBuffer, renderableBuffer) {
  // ok, so it's time to see which images, if any, should be requested and rendered
  // ultimately, if we're scrolling fast then don't bother requesting or rendering
  // when scrolling is done, then it needs to do a check to see which images are
  // important to request and render, and which image requests should be aborted.
  // Additionally, images which are not near the viewable area should not be
  // rendered at all in order to save browser resources.
  const viewableBottom = (viewableTop + contentHeight)
  const priority1 = [] // Img[]
  const priority2 = [] // Img[]
  let img // 每个Img的实例;

  // all images should be paused
  for (var i = 0, ilen = imgs.length; i < ilen; i++) {
    img = imgs[i]

    if (scrollDirectionY === 'up') {
      // scrolling up
      if (img.getTop() < viewableBottom && img.getBottom() > viewableTop - renderableBuffer) {
        // 可视区向上移动, 图片在可是区域或者在可视区域的上面一点, 按照滚动方向即将要看到图片
        img.canRequest = img.canRender = true
        priority1.push(img)
        continue
      }

      if (img.getBottom() <= viewableTop && img.getBottom() > viewableTop - requestableBuffer) {
        // 可视区向上移动, 图片在可视区的上面, 还未进入, 但是需要提前发出图片请求
        img.canRequest = true
        img.canRender = false
        priority2.push(img)
        continue
      }

      if (img.getTop() >= viewableBottom && img.getTop() < viewableBottom + renderableBuffer) {
        // 可视区向上移动, 图片在可视区的下面, 所以按照这个方向移动, 是不会再看到图片,
        // 但是图片还是可能在renderable area, 故不需要reset
        img.canRequest = img.canRender = false
        continue
      }
    } else {
      // scrolling down
      if (img.getBottom() > viewableTop && img.getTop() < viewableBottom + renderableBuffer) {
        // 可视区向下移动,  图片在可是区域或者在可视区域的下面一点, 按照滚动方向即将要看到图片
        img.canRequest = img.canRender = true
        priority1.push(img)
        continue
      }

      if (img.getTop() >= viewableBottom && img.getTop() < viewableBottom + requestableBuffer) {
        // 可视区向下移动, 图片在可视区的下面, 还未进入, 但是需要提前发出图片请求
        img.canRequest = true
        img.canRender = false
        priority2.push(img)
        continue
      }

      if (img.getBottom() <= viewableTop && img.getBottom() > viewableTop - renderableBuffer) {
        // 可视区向下移动, 图片在可视区的上面, 所以按照这个方向移动, 是不会再看到图片,
        // 但是图片还是可能在renderable area, 故不需要reset
        img.canRequest = img.canRender = false
        continue
      }
    }

    img.canRequest = img.canRender = false
    img.reset()
  }

  // update all imgs which are viewable
  priority1.sort(sortTopToBottom).forEach(i => i.update())

  if (scrollDirectionY === 'up') {
    // scrolling up
    priority2.sort(sortTopToBottom).reverse().forEach(i => i.update())
  } else {
    // scrolling down
    priority2.sort(sortTopToBottom).forEach(i => i.update())
  }
}

/**
 *
 * 对两个img组件根据top排序
 * @param {object} a - Img组件实例
 * @param {object} b - Img组件实例
 * @return {number}
 * @private
 * */
export function sortTopToBottom (a, b) {
  if (a.top < b.top) {
    return -1
  }
  if (a.top > b.top) {
    return 1
  }
  return 0
}
