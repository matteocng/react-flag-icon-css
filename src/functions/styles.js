// @flow
import type { FlagIconOptionsType, ObjStringKeyValuesType } from '../types/flow'


export default (
  styles: ObjStringKeyValuesType,
  options?: FlagIconOptionsType,
): ObjStringKeyValuesType => { // eslint-disable-line arrow-body-style
  return (options && options.themeStyles) ? { ...styles, ...options.themeStyles } : styles
}
