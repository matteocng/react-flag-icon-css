import type { CountryType } from '../types/flow'
import oCountries from '../../static/countries.json'


export const getCountries = (): CountryType[] => oCountries
export const getCountryCodes = (): FlagIconCodeType[] =>
  getCountries().map((o: CountryType): FlagIconCodeType => o.code)
