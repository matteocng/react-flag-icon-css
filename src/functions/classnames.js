// @flow
import classnames from 'classnames'
import type classes from 'classnames'
import type { FlagIconPropsType, FlagIconOptionsType } from '../types/flow'
import {
  baseThemeStyleName,
  flagIconClassesPrefix,
  flagIconClassesPrefixName,
} from './constants'

export const makeClassesObject = <T>(
  props: FlagIconPropsType<T>,
  options: FlagIconOptionsType<T>,
): classes => {
  const {
    code,
    flip = '',
    size = '',
    squared = false,
    rotate,
    className,
  } = props
  const { themeStyles, useCssModules } = options

  let obj = {
    [flagIconClassesPrefixName]: true,
    [`${flagIconClassesPrefix}squared`]: squared,
    [`${flagIconClassesPrefix}${size}`]: size,
    [`${flagIconClassesPrefix}${code}`]: code,
    [`${flagIconClassesPrefix}flip-${flip}`]: flip,
    [`${flagIconClassesPrefix}rotate-${rotate || ''}`]: rotate,
    [baseThemeStyleName]:
      useCssModules && themeStyles && themeStyles[baseThemeStyleName],
  }

  if (className && useCssModules) {
    obj = { ...obj, [className]: true }
  }
  return obj
}

export default <T>(
  props: FlagIconPropsType<*>,
  options: FlagIconOptionsType<T>,
): string => classnames(makeClassesObject(props, options))
