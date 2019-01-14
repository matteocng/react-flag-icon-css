// @flow
import type { Node, StatelessFunctionalComponent } from 'react'
import type {
  FlagIconCodeType,
  FlagIconSizeType,
  FlagIconRotateType,
  FlagIconFlipType,
} from './enums'

// Workaround for exact types because: "Exact fails when doing es6 object spread".
// SEE: https://github.com/facebook/flow/issues/2405
type Exact<T> = T & $Shape<T>

// Object whose values are 'ReactPropTypes'.
// SEE: https://git.io/vFIvf
export type PropsTypeObjectType = $Subtype<{
  [string]: $npm$propTypes$ReactPropsCheckType,
}>

export type ObjStringKeyValuesType = { [key: string]: string }

export type CssModuleType = ObjStringKeyValuesType

export type {
  FlagIconCodeType,
  FlagIconSizeType,
  FlagIconRotateType,
  FlagIconFlipType,
}

type FlagIconPropsTypeBase = {
  squared?: boolean,
  size?: FlagIconSizeType,
  rotate?: FlagIconRotateType,
  flip?: FlagIconFlipType,
  Component?: string,
  children?: Node,
  className?: string,
  styleName?: string,
}

export type FlagIconPropsType = FlagIconPropsTypeBase & {
  code: FlagIconCodeType,
}

export type CustomFlagIconPropsType<T> = FlagIconPropsTypeBase & {
  code: FlagIconCodeType | $Keys<T & {}>,
}

export type FlagIconOptionsType<T> = Exact<{
  customCodes?: T,
  themeStyles?: CssModuleType,
  useCssModules?: boolean,
}>

export type KeyCallbackType = (key: string, i: number) => string

export type FlagIconReturnType<T> = StatelessFunctionalComponent<
  CustomFlagIconPropsType<T>,
>
export type FlagIconFactoryReturnType<T> = FlagIconReturnType<T>
export type StandardFlagIconFactoryReturnType = StatelessFunctionalComponent<FlagIconPropsType>

export type CountryType = {
  name: string,
  code: FlagIconCodeType,
}

export type ReactTestRendererTreeType = {
  type: string,
  props: {
    className?: string,
  },
  children?: ReactTestRendererTreeType,
}

// Just a placeholder. The '+' is required (see the React flow definition file).
// If/when it's possible to type a module itself with maximum compatibility, research
// and modify this. Test with an external app to be sure that there are no weird
// Flow errors thrown; Flow thinking it's all ok when launching it from this
// package's folder is not enough.
export type ReactModuleType = { +[any]: any } // eslint-disable-line flowtype/no-weak-types
