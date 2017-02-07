/**
 * Created by Hsiang on 2017/2/7.
 */

/**
 * @param {any} ev
 * @return {PointerCoordinates}
 * */
export function pointerCoord(ev) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (ev) {
    var changedTouches = ev.changedTouches;
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    var pageX = ev.pageX;
    if (pageX !== undefined) {
      return { x: pageX, y: ev.pageY };
    }
  }
  return { x: 0, y: 0 };
}
