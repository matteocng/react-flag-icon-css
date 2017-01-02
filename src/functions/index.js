// @flow
import type classes from 'classnames'
import type { KeyCallbackType } from '../types/flow'

export { default as makeClassnames, makeClassesObject } from './classnames'
export { default as makeFlagIconOptions } from './options'
export { default as makeStyles } from './styles'
export * as countries from './countries'
export * as constants from './constants'


export const objectKeysApplyFn = ( // eslint-disable-line import/prefer-default-export
  obj: classes,
  fn: KeyCallbackType
): classes =>
  Object.keys(obj).reduce((retObj: classes, key: string): classes => { // eslint-disable-line arrow-body-style, max-len
    return {
      ...retObj,
      [fn(key)]: obj[key]
    }
  }, {})

export const diffArrays = <T>(arA: Array<T>, arB: Array<T>): Array<T> => {
  const arrays = (arA.length > arB.length) ? [arA, arB] : [arB, arA]
  return arrays[0].filter((newArElem: T): boolean => !arrays[1].includes(newArElem))
}
