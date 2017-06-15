// @flow
import type { CssModuleType } from '../types/flow'

export default (className: string, styles: CssModuleType) => {
  if (!styles[className]) {
    throw new Error(`Could not resolve the styleName ${className}`)
  }

  return styles[className]
}
