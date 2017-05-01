// @flow
import type { FlagIconOptionsType, ObjStringKeyValuesType } from '../types/flow'

export default (
  styles: ObjStringKeyValuesType,
  options?: FlagIconOptionsType,
  // eslint-disable-next-line arrow-body-style
): ObjStringKeyValuesType => {
  return options && options.themeStyles
    ? { ...styles, ...options.themeStyles }
    : styles
}
