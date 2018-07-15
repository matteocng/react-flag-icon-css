// @flow
import classnames from 'classnames'
import type classes from 'classnames'
import type {
  FlagIconPropsType,
  FlagIconOptionsType,
  CssModuleType,
} from '../types/flow'
import classNameToStyleName from './classNameToStyleName'
import {
  baseThemeStyleName,
  flagIconClassesPrefix,
  flagIconClassesPrefixName,
} from './constants'

export const makeClassesObject = <T>(
  props: FlagIconPropsType,
  options: FlagIconOptionsType<T>,
): classes => {
  const {
    code,
    flip = '',
    size = '',
    squared = false,
    rotate,
    className,
    styleName,
  } = props
  const { themeStyles, useCssModules } = options

  return {
    [flagIconClassesPrefixName]: true,
    [`${flagIconClassesPrefix}squared`]: squared,
    [`${flagIconClassesPrefix}${size}`]: size,
    [`${flagIconClassesPrefix}${code}`]: code,
    [`${flagIconClassesPrefix}flip-${flip}`]: flip,
    [`${flagIconClassesPrefix}rotate-${rotate || ''}`]: rotate,
    [baseThemeStyleName]:
      useCssModules && themeStyles && themeStyles[baseThemeStyleName],
    [styleName || '']:
      useCssModules && themeStyles && styleName && themeStyles[styleName],
    [className || '']: className,
  }
}

// Generates a string with ' ' separated class names matching the current `props`
// and `options`. It is called every time `FlagIcon` is rendered.
export default <T>(
  props: FlagIconPropsType,
  options: FlagIconOptionsType<T>,
  styles?: CssModuleType,
): string => {
  const { useCssModules } = options

  const classesObject: classes = makeClassesObject(props, options)
  let strClasses: string = classnames(classesObject)

  if (useCssModules) {
    const { className } = props
    // We split the ' ' separated class names that `classnames` has produced.
    const aClasses = strClasses.split(' ')
    const nClasses = aClasses.length

    strClasses = aClasses
      .map((c: string, i: number) => {
        // We leave 'className' as it is because it must refer to global Css.
        if (className && i === nClasses - 1) return c
        // We replace each `className` with its corresponding 'Css module' name.
        return classNameToStyleName(c, styles || {})
      })
      .join(' ')
  }
  return strClasses
}
