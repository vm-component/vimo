var win = window;
/* istanbul ignore next */
var NOOP = function () {
  // empty
};
var _uiEvtOpts = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: /* istanbul ignore next */ function () {
      _uiEvtOpts = true;
    }
  });
  win.addEventListener('optsTest', NOOP, opts);
}
catch (e) {
  // empty
}

function registerListener(ele, eventName, callback, opts, unRegisterListenersCollection) {
  if (opts === void 0) {
    opts = {};
  }
  if (!ele)
    throw new TypeError('Function requires "ele" parameter!');
  if (!eventName)
    throw new TypeError('Function requires "eventName" parameter!');
  if (!callback)
    throw new TypeError('Function requires "callback" parameter!');
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  var listenerOpts = _uiEvtOpts
    ? {
      capture: !!opts.capture,
      passive: !!opts.passive
    }
    : !!opts.capture;
  var unReg;
  if (!('addEventListener' in ele) || !('removeEventListener' in ele)) {
    throw new Error('The current environment does not support addEventListener&removeEventListener!');
  }
  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts);
  unReg = function unregisterListener() {
    ele['removeEventListener'](eventName, callback, listenerOpts);
  };
  if (unRegisterListenersCollection && Array.isArray(unRegisterListenersCollection)) {
    unRegisterListenersCollection.push(unReg);
  }
  return unReg;
}

registerListener._uiEvtOpts = _uiEvtOpts;

var assert = console.assert;
var POINTER_EVENT_TYPE_MOUSE = 1;
var POINTER_EVENT_TYPE_TOUCH = 2;
/**
 * @hidden
 */
var PointerEvents = /** @class */ (function () {
  function PointerEvents(ele, pointerDown, pointerMove, pointerUp, option) {
    this.ele = ele;
    this.pointerDown = pointerDown;
    this.pointerMove = pointerMove;
    this.pointerUp = pointerUp;
    this.option = option;
    this.rmTouchStart = null;
    this.rmTouchMove = null;
    this.rmTouchEnd = null;
    this.rmTouchCancel = null;
    this.rmMouseStart = null;
    this.rmMouseMove = null;
    this.rmMouseUp = null;
    this.lastTouchEvent = 0;
    this.doc = document;
    this.mouseWait = 2 * 1000;
    this.lastEventType = 0;
    assert(ele, 'element can not be null');
    assert(pointerDown, 'pointerDown can not be null');
    this.bindTouchEnd = this.handleTouchEnd.bind(this);
    this.bindMouseUp = this.handleMouseUp.bind(this);
    this.rmTouchStart = registerListener(ele, 'touchstart', this.handleTouchStart.bind(this), option);
    this.rmMouseStart = registerListener(ele, 'mousedown', this.handleMouseDown.bind(this), option);
  }

  PointerEvents.prototype.handleTouchStart = function (ev) {
    assert(this.ele, 'element can not be null');
    assert(this.pointerDown, 'pointerDown can not be null');
    this.lastTouchEvent = Date.now() + this.mouseWait;
    this.lastEventType = POINTER_EVENT_TYPE_TOUCH;
    if (!this.pointerDown(ev, POINTER_EVENT_TYPE_TOUCH)) {
      return;
    }
    if (!this.rmTouchMove && this.pointerMove) {
      this.rmTouchMove = registerListener(this.ele, 'touchmove', this.pointerMove, this.option);
    }
    if (!this.rmTouchEnd) {
      this.rmTouchEnd = registerListener(this.ele, 'touchend', this.bindTouchEnd, this.option);
    }
    if (!this.rmTouchCancel) {
      this.rmTouchCancel = registerListener(this.ele, 'touchcancel', this.bindTouchEnd, this.option);
    }
  };
  PointerEvents.prototype.handleMouseDown = function (ev) {
    assert(this.ele, 'element can not be null');
    assert(this.pointerDown, 'pointerDown can not be null');
    if (this.lastTouchEvent > Date.now()) {
      console.debug('mousedown event dropped because of previous touch');
      return;
    }
    this.lastEventType = POINTER_EVENT_TYPE_MOUSE;
    if (!this.pointerDown(ev, POINTER_EVENT_TYPE_MOUSE)) {
      return;
    }
    if (!this.rmMouseMove && this.pointerMove) {
      this.rmMouseMove = registerListener(this.doc, 'mousemove', this.pointerMove, this.option);
    }
    if (!this.rmMouseUp) {
      this.rmMouseUp = registerListener(this.doc, 'mouseup', this.bindMouseUp, this.option);
    }
  };
  PointerEvents.prototype.handleTouchEnd = function (ev) {
    this.stopTouch();
    this.pointerUp && this.pointerUp(ev, POINTER_EVENT_TYPE_TOUCH);
  };
  PointerEvents.prototype.handleMouseUp = function (ev) {
    this.stopMouse();
    this.pointerUp && this.pointerUp(ev, POINTER_EVENT_TYPE_MOUSE);
  };
  PointerEvents.prototype.stopTouch = function () {
    this.rmTouchMove && this.rmTouchMove();
    this.rmTouchEnd && this.rmTouchEnd();
    this.rmTouchCancel && this.rmTouchCancel();
    this.rmTouchMove = this.rmTouchEnd = this.rmTouchCancel = null;
  };
  PointerEvents.prototype.stopMouse = function () {
    this.rmMouseMove && this.rmMouseMove();
    this.rmMouseUp && this.rmMouseUp();
    this.rmMouseMove = this.rmMouseUp = null;
  };
  PointerEvents.prototype.stop = function () {
    this.stopTouch();
    this.stopMouse();
  };
  PointerEvents.prototype.destroy = function () {
    this.rmTouchStart && this.rmTouchStart();
    this.rmMouseStart && this.rmMouseStart();
    this.stop();
    this.ele = this.pointerUp = this.pointerMove = this.pointerDown = null;
    this.rmTouchStart = this.rmMouseStart = null;
  };
  return PointerEvents;
}());

export default PointerEvents;
//# sourceMappingURL=pointer-events.es5.js.map
