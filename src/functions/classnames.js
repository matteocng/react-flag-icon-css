// @flow
import classnames from 'classnames'
import type classes from 'classnames'
import type { FlagIconPropsType, FlagIconOptionsType } from '../types/flow'
import { baseThemeStyleName, flagIconClassesPrefix, flagIconClassesPrefixName } from './constants'


export const makeClassesObject = (
  { ...props, code, flip = '', size = '', squared = false, rotate }: FlagIconPropsType,
  options: FlagIconOptionsType,
): classes => {
  let obj = {
    [flagIconClassesPrefixName]: true,
    [`${flagIconClassesPrefix}squared`]: squared,
    [`${flagIconClassesPrefix}${size}`]: size,
    [`${flagIconClassesPrefix}${code}`]: code,
    [`${flagIconClassesPrefix}flip-${flip}`]: flip,
    [`${flagIconClassesPrefix}rotate-${rotate || ''}`]: rotate,
    [baseThemeStyleName]: options.useCssModules && options.themeStyles,
  }

  if (props.className && options.useCssModules) {
    obj = { ...obj, [props.className]: true }
  }
  return obj
}

export default (props: FlagIconPropsType, options: FlagIconOptionsType): string =>
  classnames(makeClassesObject(props, options))
