// @flow
import * as React from 'react'
import fs from 'fs'
import path from 'path'
import type classes from 'classnames'
import FlagIconFactory from '../../'
import type {
  FlagIconOptionsType,
  FlagIconPropsType,
  ReactTestRendererTreeType,
} from '../../types/flow'
import {
  flagIconModulePath,
  flagIconClassesPrefix,
  flagIconClassesPrefixName,
} from '../../functions/constants'
import { cssModulePrefix } from './constants'
import styles from '../../styles'

export const GetFlagIconModuleCountryCodes = (
  modulePath: string = flagIconModulePath,
): string[] =>
  fs
    .readdirSync(path.resolve(`${modulePath}/flags/4x3`))
    .reduce(
      (retAr: string[], fileName: string): string[] => {
        // reduce() first argument: function.
        const code = path.basename(fileName, path.extname(fileName))
        return styles[`${flagIconClassesPrefix}${code}`]
          ? [...retAr, code]
          : retAr
      },
      ([]: string[]), // reduce() second argument: initial value of 'retAr'.
    )

// Removes from `obj` all keys whose name is `flagIconClassesPrefixName` or starts with it.
export const filterClassObjectKey = (obj: classes, objKey: string): boolean =>
  objKey !== flagIconClassesPrefixName &&
  objKey.startsWith(flagIconClassesPrefixName)

// Makes N `FlagIcon` with N `options` and `props`.
export const makeFlagIcons = <T>(
  aOptions: FlagIconOptionsType<T>[],
  aProps: FlagIconPropsType[],
) => {
  if (!aOptions || !aProps) {
    throw Error('`props` and `options` must not be empty.')
  }

  if (aOptions.length !== aProps.length) {
    throw Error('Pass the same number of `props` and `options`.')
  }

  return aOptions.map((options: FlagIconOptionsType<T>, i: number) => {
    const props = aProps[i]
    const FlagIcon = FlagIconFactory(React, options)

    return FlagIcon(props)
  })
}

// Walks a `ReactTestRendererTreeType` tree (returned by 'react-test-renderer')
// and calls `fnCallback` to transform the `className` props.
const transformClassNames = (
  tree: ReactTestRendererTreeType,
  fnCallback: string => ?string,
) => {
  const cloneTree = { ...tree }
  if (cloneTree.props.className) {
    const result = fnCallback(cloneTree.props.className)
    if (result) cloneTree.props.className = result
  }

  if (cloneTree.children) {
    cloneTree.children = transformClassNames(cloneTree.children, fnCallback)
  }
  return cloneTree
}

export const restoreClassNamesInTree = (
  modulesTree: ReactTestRendererTreeType,
) =>
  transformClassNames(modulesTree, className =>
    className.replace(new RegExp(cssModulePrefix, 'g'), ''),
  )

export const diffArrays = <T>(arA: Array<T>, arB: Array<T>): Array<T> => {
  const arrays = arA.length > arB.length ? [arA, arB] : [arB, arA]
  return arrays[0].filter(
    (newArElem: T): boolean => !arrays[1].includes(newArElem),
  )
}
