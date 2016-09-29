// @flow
import jsdom from 'jsdom' // eslint-disable-line import/no-extraneous-dependencies


export default () => {
  if (typeof document !== 'undefined') {
    return
  }

  global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
  global.window = global.document.defaultView
  global.navigator = global.window.navigator
}
