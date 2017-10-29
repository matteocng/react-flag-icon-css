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
  FlagIconOptionsType,
} from '../../types/flow'

const makeWrongCode = () => 'wrong'
const makeCorrectCode = () => 'it'

// 1. FlagIconCodeType
// $FlowExpectError
const wrongCode: FlagIconCodeType = makeWrongCode()

const validCode: FlagIconCodeType = makeCorrectCode()

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
const FlagIconCssModules = FlagIconFactory(React)
FlagIconCssModules({ code: validCode })

// $FlowExpectError
FlagIconCssModules({ code: makeWrongCode() })

// $FlowExpectError
FlagIconCssModules({ rotate: 30 })

// 4. FlagIconPropsType
const correctProps: FlagIconPropsType = {
  code: 'it',
}

const wrongProps: FlagIconPropsType = {
  // $FlowExpectError
  code: 'wrong',
}

// $FlowExpectError
const missingRequiredProps: FlagIconPropsType = {
  rotate: 30,
}

// 5. CustomFlagIconFactory
const CustomFlagIcon = CustomFlagIconFactory(React, optionsCustomCodes)

let test = <CustomFlagIcon code={makeCorrectCode()} />

test = <CustomFlagIcon code="ex2" />

// $FlowExpectError
test = <CustomFlagIcon code={makeWrongCode()} />

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

// 10. FlagIconOptionsType
const correctOptions: FlagIconOptionsType<*> = { useCssModules: false }

// $FlowExpectError
const wrongOptions: FlagIconOptionsType<*> = { useCssModules: 'wrong' }

FlagIconFactory(React, correctOptions)

// $FlowExpectError
FlagIconFactory(React, { useCssModules: 'wrong' })

// 11. Dynamic loops (typical use case).
const myAppCodes: FlagIconCodeType[] = ['it', 'eu', 'de', 'fr', 'es']

const MyFlagIcon = FlagIconFactory(React)
myAppCodes.map(code => MyFlagIcon({ code }))

const myCustomCodes = { c1: 'Custom 1', c2: 'Custom 2' }
const MyCustomFlagIcon = CustomFlagIconFactory(React, {
  customCodes: myCustomCodes,
})
const myAppCodesWithCustom = [...myAppCodes, ...Object.keys(myCustomCodes)]
myAppCodesWithCustom.map(code => MyCustomFlagIcon({ code }))
