// @flow
import FlagIcon from './FlagIcon'
import styles from '../styles'
import { makeStyles, makeFlagIconOptions } from '../functions'
import { getCountryCodes } from '../functions/props'
import { validateStyles } from '../functions/styles'
import { MakeFlagIconPropsType } from '../types/propTypes'
import type {
  FlagIconOptionsType,
  FlagIconFactoryReturnType,
  StandardFlagIconFactoryReturnType,
  CssModuleType,
  ReactModuleType,
} from '../types/flow'

const FlagIconFactory = <T>(
  React: ReactModuleType,
  options?: FlagIconOptionsType<T>,
): StandardFlagIconFactoryReturnType => {
  // We 'makeFlagIconOptions' by merging the default options with the (optional)
  // user-supplied options.
  const computedOptions = makeFlagIconOptions(options)
  const { useCssModules, customCodes } = computedOptions

  let FlagIconComponent = null

  if (useCssModules) {
    const computedStyles: CssModuleType = makeStyles(styles, options)
    if (process.env.NODE_ENV !== 'production') {
      validateStyles(computedStyles, computedOptions, options)
    }

    FlagIconComponent = FlagIcon(React, computedOptions, computedStyles)
  } else {
    FlagIconComponent = FlagIcon(React, computedOptions)
  }
  FlagIconComponent.displayName = 'FlagIcon' // Otherwise 'WrappedComponent' when testing.

  if (process.env.NODE_ENV !== 'production') {
    // UglifyJS strips this block out in production.
    // We assign react propTypes (dynamic type checking) to the React component.
    // SEE: https://github.com/reactjs/prop-types
    let codes = getCountryCodes()

    if (customCodes) {
      codes = [...codes, ...Object.keys(customCodes)]
    }

    FlagIconComponent.propTypes = MakeFlagIconPropsType(codes)
  } // In production, FlagIconComponent.propTypes will be undefined.

  return FlagIconComponent
}

export default FlagIconFactory

const CustomFlagIconFactory = <T: { [string]: string }>(
  React: ReactModuleType,
  options?: FlagIconOptionsType<T>,
): FlagIconFactoryReturnType<T> => FlagIconFactory(React, options)
export { CustomFlagIconFactory }
