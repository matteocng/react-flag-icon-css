// @flow
import { String, Boolean, ReactElement, struct, enums, maybe, Object as TObject } from 'tcomb'
import type { CountryType, ObjStringKeyValuesType as ObjKVType } from '../types/flow'
import { getCountries } from '../functions'


const strict = true

// Functions
const addKeyToObj = (retObj: ObjKVType,
                     curObj: CountryType) : ObjKVType => ({ ...retObj, [curObj.code]: curObj.name })

const countriesKeyValue = getCountries().reduce(addKeyToObj, {})

// Types
const FlagIconSizeType = enums.of(['lg', '2x', '3x', '4x', '5x'], 'FlagIconSizeType')
const FlagIconRotateType = enums.of([90, 180, 270], 'FlagIconRotateType')

const FlagIconCodeType = enums(countriesKeyValue, 'FlagIconCodeType')

export const FlagIconPropsTypeTcomb = struct({
  code: FlagIconCodeType,
  size: maybe(FlagIconSizeType),
  squared: maybe(Boolean),
  rotate: maybe(FlagIconRotateType),
  Component: maybe(String),
  children: maybe(ReactElement)
}, { name: 'FlagIconType', strict })

export const FlagIconOptionsTypeTcomb = struct({
  useCssModules: Boolean,
  themeStyles: maybe(TObject)
}, { name: 'FlagIconOptionsType', strict })
