import type { CountryType } from '../types/flow'
import oCountries from '../static/countries'


export const getCountries = () : Array<CountryType> => oCountries
export const getCountryCodes = (): Array<string> =>
  getCountries().map((o: CountryType) : string => o.code)
