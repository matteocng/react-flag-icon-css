// @flow
import PropTypes from 'prop-types'
import type { FlagIconOptionsType } from '../types/flow'
import {
  FlagIconOptionsType as FlagIconOptionsTypeReact,
} from '../types/propTypes'

const defaultOptions: FlagIconOptionsType = {
  useCssModules: true,
}

export default (options?: FlagIconOptionsType): FlagIconOptionsType => {
  const computedOptions = { ...defaultOptions, ...options }

  PropTypes.checkPropTypes(
    FlagIconOptionsTypeReact,
    computedOptions,
    'key',
    'FlagIconFactory options',
  )
  return computedOptions
}
