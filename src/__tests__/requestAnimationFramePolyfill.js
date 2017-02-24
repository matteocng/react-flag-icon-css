// @flow
type RequestAnimationFrameCallbackType = () => void // eslint-disable-line flowtype/no-weak-types
type PolyfillReturnType = (callback: RequestAnimationFrameCallbackType) => void

// SEE(jlmakes): https://gist.github.com/paulirish/1579671
const polyfill = (
  (): PolyfillReturnType => {
    let clock = Date.now()

    return (callback: RequestAnimationFrameCallbackType) => {
      const currentTime = Date.now()

      if (currentTime - clock > 16) {
        clock = currentTime
        callback(currentTime)
      } else {
        setTimeout(() => {
          polyfill(callback)
        }, 0)
      }
    }
  }
)()

/* eslint-disable no-undef, import/prefer-default-export, flowtype/no-weak-types */
export default (
  window: Object
): Function => { // eslint-disable-line arrow-body-style
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame || polyfill
}
/* eslint-enable no-undef, import/prefer-default-export, flowtype/no-weak-types */
