// @flow
import PropTypes from 'prop-types'
import { getCountryCodes } from '../functions/countries'
import { AddExactValidator } from '../functions/propTypes'

const FlagIconSizeType = PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
const FlagIconRotateType = PropTypes.oneOf([30, 60, 90, 180, 270])
const FlagIconFlipType = PropTypes.oneOf(['horizontal', 'vertical'])
const FlagIconCodeType = PropTypes.oneOf(getCountryCodes())

const FlagIconClassesObject = {
  code: FlagIconCodeType.isRequired,
  size: FlagIconSizeType,
  squared: PropTypes.bool,
  rotate: FlagIconRotateType,
  flip: FlagIconFlipType,
}
const FlagIconPropsTypeObject = {
  ...FlagIconClassesObject,
  children: PropTypes.element,
  Component: PropTypes.string,
}

export const FlagIconClassesObjectType = AddExactValidator(FlagIconClassesObject)
export const FlagIconPropsType = AddExactValidator(FlagIconPropsTypeObject)

export const FlagIconOptionsType = AddExactValidator({
  useCssModules: PropTypes.bool,
  themeStyles: PropTypes.object,
})
