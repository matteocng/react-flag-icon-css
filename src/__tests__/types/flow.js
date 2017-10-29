// @flow
/* eslint-disable no-unused-vars */
import * as React from 'react'
import {
  getCountries,
  getCountryCodes,
  getRotates,
  getFlips,
  getSizes,
} from '../../functions/props'
import FlagIconFactory from '../../'
import { CustomFlagIconFactory } from '../../FlagIcon/FlagIconFactory'
import { codes, styles } from '../example-custom-flags'
import type {
  FlagIconCodeType,
  FlagIconPropsType,
  FlagIconRotateType,
  FlagIconFlipType,
  FlagIconSizeType,
  CountryType,
} from '../../types/flow'

const ReactDefault = React.default

// 1. FlagIconCodeType
// $FlowExpectError
const wrongCode: FlagIconCodeType = 'wrong'

const validCode: FlagIconCodeType = 'it'

// 2. CountryType
const correct: CountryType = {
  name: 'Italy',
  code: 'it',
}

const wrong: CountryType = {
  name: 'Wrong',
  // $FlowExpectError
  code: 'wrong',
}

const optionsCustomCodes = {
  customCodes: codes,
  themeStyles: styles,
}

// 3. FlagIconFactory, FlagIcon
const FlagIconCssModules = FlagIconFactory(ReactDefault)
FlagIconCssModules({ code: 'it' })

// $FlowExpectError
FlagIconCssModules({ code: 'wrong' })

// $FlowExpectError
FlagIconCssModules({ rotate: 30 })

// 4. FlagIconPropsType
const correctProps: FlagIconPropsType<void> = {
  code: 'it',
}

const wrongProps: FlagIconPropsType<void> = {
  // $FlowExpectError
  code: 'wrong',
}

// $FlowExpectError
const missingRequiredProps: FlagIconPropsType<void> = {
  rotate: 30,
}

// 5. CustomFlagIconFactory
const CustomFlagIcon = CustomFlagIconFactory(ReactDefault, optionsCustomCodes)

let test = <CustomFlagIcon code="it" />

test = <CustomFlagIcon code="ex2" />

// $FlowExpectError
test = <CustomFlagIcon code="wrong" />

// 6. getCountries(), getCountryCodes()
const countries = getCountries()
countries.push({ code: 'it', name: 'Italy' })

// $FlowExpectError
countries.push({ code: 'wrong', name: 'Wrong' })

const countryCodes = getCountryCodes()
countryCodes.push('it')

// $FlowExpectError
countryCodes.push('wrong')

const countriesAnnotated: CountryType[] = getCountries()
const countryCodesAnnotated: FlagIconCodeType[] = getCountryCodes()

countriesAnnotated.push({ code: 'it', name: 'Italy' })

// $FlowExpectError
countriesAnnotated.push({ code: 'wrong', name: 'Wrong' })

countryCodesAnnotated.push('it')

// $FlowExpectError
countryCodesAnnotated.push('wrong')

// 7. getRotates()
const rotates = getRotates()

// $FlowExpectError
rotates.push('wrong')

const rotatesAnnotated: FlagIconRotateType[] = getRotates()

// $FlowExpectError
rotatesAnnotated.push(155)

// 8. getSizes()
const sizes = getSizes()
// $FlowExpectError
sizes.push('wrong')
// $FlowExpectError
sizes.push(355)

const sizesAnnotated: FlagIconSizeType[] = getSizes()

// $FlowExpectError
sizesAnnotated.push(30)

// $FlowExpectError
sizesAnnotated.push(355)

// 9. getFlips()
const flips = getFlips()

// $FlowExpectError
flips.push('wrong')

// $FlowExpectError
flips.push(355)

const flipsAnnotated: FlagIconFlipType[] = getFlips()

// $FlowExpectError
flipsAnnotated.push('wrong')

// $FlowExpectError
flipsAnnotated.push(355)
