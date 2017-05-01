// @flow
import jsdom from 'jsdom' // eslint-disable-line import/no-extraneous-dependencies
import requestAnimationFramePolyfill from './requestAnimationFramePolyfill'

const createDocument = () => {
  if (typeof document !== 'undefined') {
    return
  }

  global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
  global.window = global.document.defaultView
  global.navigator = global.window.navigator
}

const registerPolyfills = () => {
  // We need this because 'react-dom' depends on 'requestAnimationFrame'.
  global.requestAnimationFrame = requestAnimationFramePolyfill(global.window)
}

createDocument()
registerPolyfills()
