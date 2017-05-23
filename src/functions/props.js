// @flow
import type {
  FlagIconCodeType,
  FlagIconRotateType,
  FlagIconFlipType,
  FlagIconSizeType,
  CountryType,
} from '../types/flow'
import { sizes, rotates, flips, countries } from '../static/enums'

export const getCountries = (): CountryType[] => countries

export const getCountryCodes = (): FlagIconCodeType[] =>
  countries.map((country: CountryType): FlagIconCodeType => country.code)

export const getFlips = (): FlagIconFlipType[] => flips

export const getRotates = (): FlagIconRotateType[] => rotates

export const getSizes = (): FlagIconSizeType[] => sizes
