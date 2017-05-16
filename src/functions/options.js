// @flow
import PropTypes from 'prop-types'
import type { FlagIconOptionsType } from '../types/flow'
import { MakeFlagIconOptionsPropType } from '../types/propTypes'

const defaultOptions: FlagIconOptionsType<*> = {
  useCssModules: true,
}

export default <T>(
  options?: FlagIconOptionsType<T>,
): FlagIconOptionsType<T> => {
  const computedOptions = { ...defaultOptions, ...options }

  PropTypes.checkPropTypes(
    MakeFlagIconOptionsPropType(),
    computedOptions,
    'key',
    'FlagIconFactory options',
  )
  return computedOptions
}
