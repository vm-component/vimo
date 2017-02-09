/**
 * Created by Hsiang on 2017/2/9.
 * @name Keyboard
 * @description
 * The `Keyboard` class allows you to work with the keyboard events provided
 * by the Ionic keyboard plugin.
 *
 * @usage
 * ```ts
 * export class MyClass {
 *   constructor(public keyboard: Keyboard) {
 *
 *   }
 * }
 * ```
 */


// import { Injectable, NgZone } from '@angular/core';

// import { Config } from '../config/config';
// import { DomController } from './dom-controller';
import Vue from 'vue'
import { focusOutActiveElement, hasFocusedTextInput, nativeTimeout, clearNativeTimeout } from './dom';
import { Key } from './key';

const KEYBOARD_CLOSE_POLLING = 150;
const KEYBOARD_POLLING_CHECKS_MAX = 100;

const KEYBOARD_SHOW_EVENTNAME = 'native.keyboardshow';
const KEYBOARD_HIDE_EVENTNAME = 'native.keyboardhide';

export class Keyboard {

  constructor () {
    this._tmr = 0;
    // this.focusOutline(config.get('focusOutline'), document);
    this.focusOutline(true, document);

    // listerner keyboardhide
    window.addEventListener(KEYBOARD_HIDE_EVENTNAME, () => {
      clearNativeTimeout(this._tmr);
      this._tmr = nativeTimeout(() => {
        // this custom cordova plugin event fires when the keyboard will hide
        // useful when the virtual keyboard is closed natively
        // https://github.com/driftyco/ionic-plugin-keyboard
        if (hasFocusedTextInput()) {
          focusOutActiveElement();
        }
      }, 80);
    });
    // listerner keyboardshow
    window.addEventListener(KEYBOARD_SHOW_EVENTNAME, () => {
      clearNativeTimeout(this._tmr);
    });
  }

  /**
   * Check to see if the keyboard is open or not.
   *
   * ```ts
   * export class MyClass {
   *   constructor(public keyboard: Keyboard) {
   *
   *   }
   *
   *   keyboardCheck() {
   *     console.log('The keyboard is open:', this.keyboard.isOpen());
   *   }
   * }
   * ```
   *
   * @return {boolean} returns a true or false value if the keyboard is open or not.
   */
  isOpen () {
    return hasFocusedTextInput();
  }

  /**
   * When the keyboard is closed, call any methods you want.
   *
   * ```ts
   * export class MyClass {
   *   constructor(public keyboard: Keyboard) {
   *     this.keyboard.onClose(this.closeCallback);
   *   }
   *   closeCallback() {
   *     // call what ever functionality you want on keyboard close
   *     console.log('Closing time');
   *   }
   * }
   * ```
   *
   * @param {function} callback - method you want to call when the keyboard has been closed.
   * @return {function} - returns a callback that gets fired when the keyboard is closed.
   */
  onClose (callback, pollingInternval = KEYBOARD_CLOSE_POLLING, pollingChecksMax = KEYBOARD_POLLING_CHECKS_MAX) {
    console.debug(`keyboard, onClose created`);
    const self = this;
    let checks = 0;

    let promise = null; //Promise<any>;

    if (!callback) {
      // a callback wasn't provided, so let's return a promise instead
      promise = new Promise(resolve => { callback = resolve; });
    }

    function checkKeyboard () {
      console.debug(`keyboard, isOpen: ${self.isOpen()}`);
      if (!self.isOpen() || checks > pollingChecksMax) {
        nativeTimeout(function () {
          // self._zone.run(function () {
          console.debug(`keyboard, closed`);
          callback();
          // });
        }, 400);

      } else {
        nativeTimeout(checkKeyboard, pollingInternval);
      }
      checks++;
    }

    nativeTimeout(checkKeyboard, pollingInternval);

    return promise;
  }

  /**
   * Programmatically close the keyboard.
   */
  close () {
    Vue.nextTick(function () {
      if (hasFocusedTextInput()) {
        // only focus out when a text input has focus
        console.debug(`keyboard, close()`);
        Vue.nextTick(function () {
          focusOutActiveElement();
        })
      }
    })
  }

  /**
   * focus的元素添加outline样式,一般是 虚线框
   *
   * @private
   * @param {any} setting
   * @param {any} document
   */
  focusOutline (setting, document) {
    /* Focus Outline
     * --------------------------------------------------
     * By default, when a keydown event happens from a tab key, then
     * the 'focus-outline' css class is added to the body element
     * so focusable elements have an outline. On a mousedown or
     * touchstart event, then the 'focus-outline' css class is removed.
     *
     * Config default overrides:
     * focusOutline: true     - Always add the focus-outline
     * focusOutline: false    - Do not add the focus-outline
     */

    const self = this;
    let isKeyInputEnabled = false;

    function cssClass () {
      Vue.nextTick(function () {
        document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
      })
    }

    if (setting === true) {
      isKeyInputEnabled = true;
      return cssClass();

    } else if (setting === false) {
      return;
    }

    /**
     * default is to add the focus-outline when the tab key is used
     *
     * @param {KeyboardEvent} ev
     * */
    function keyDown (ev) {
      if (!isKeyInputEnabled && ev.keyCode === Key.TAB) {
        isKeyInputEnabled = true;
        enableKeyInput();
      }
    }

    function pointerDown () {
      isKeyInputEnabled = false;
      enableKeyInput();
    }

    function enableKeyInput () {
      cssClass();

      Vue.nextTick(function () {
        document.removeEventListener('mousedown', pointerDown);
        document.removeEventListener('touchstart', pointerDown);

        if (isKeyInputEnabled) {
          document.addEventListener('mousedown', pointerDown);
          document.addEventListener('touchstart', pointerDown);
        }
      })
    }

    document.addEventListener('keydown', keyDown);
  }

}


