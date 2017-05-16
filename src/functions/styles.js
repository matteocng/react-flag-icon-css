// @flow
import type { FlagIconOptionsType, ObjStringKeyValuesType } from '../types/flow'

export default <T>(
  styles: ObjStringKeyValuesType,
  options?: FlagIconOptionsType<T>,
  // eslint-disable-next-line arrow-body-style
): ObjStringKeyValuesType => {
  return options && options.themeStyles
    ? { ...styles, ...options.themeStyles }
    : styles
}
