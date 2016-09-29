// @flow
import CssModulesTransform from 'react-css-modules'
import { propTypes as tcombProps } from 'tcomb-react'
import type { default as ReactType } from 'react'

import makeFlagIconOptions from './options'
import styles from './styles'
import makeClassName from './classnameMaker'
import makeCssModulesObject from './cssModulesStyleObjectMaker'
import type { FlagIconPropsType, FlagIconOptionsType } from './types/flow'
import { FlagIconPropsTypeTcomb } from './types/tcomb'


const FlagIcon = (React: Object, options: FlagIconOptionsType) : ReactType.createElement => // eslint-disable-line flowtype/no-weak-types, max-len
  ({ ...props, Component = 'span', children }: FlagIconPropsType) : ReactType.Element<*> => {
    const stylePropName = options.useCssModules ? 'styleName' : 'className'
    const p = { [stylePropName]: makeClassName(props, options) }

    return <Component {...p}>{children}</Component>
  }

const FlagIconFactory = (React: Object, options?: FlagIconOptionsType) : ReactType.createElement => { // eslint-disable-line flowtype/no-weak-types, max-len
  const computedOptions = makeFlagIconOptions(options)

  const FlagIconComponent = FlagIcon(React, computedOptions)
  const FlagIconComponentComputed = Object.assign(FlagIconComponent, {
    propTypes: tcombProps(FlagIconPropsTypeTcomb)
  })
  const computedStyles = makeCssModulesObject(styles, options)
  const fnCssModules = CssModulesTransform(computedStyles, { allowMultiple: true })

  return computedOptions.useCssModules ?
            fnCssModules(FlagIconComponentComputed) : FlagIconComponentComputed
}

export default FlagIconFactory
