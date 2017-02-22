// @flow
import React from 'react'
import test from 'tape' // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme' // eslint-disable-line import/no-extraneous-dependencies
import classnames from 'classnames'

import type { ReactWrapper, ShallowWrapper } from 'enzyme' // eslint-disable-line import/no-extraneous-dependencies
import type classes from 'classnames'
import type {
  FlagIconPropsType,
  FlagIconOptionsType,
  FlagIconCodeType
} from '../types/flow'

import FlagIconFactory from '../'
import styles from '../styles'
import DummyComponentFactory from './DummyComponent'
import {
  countries,
  constants,
  makeStyles,
  makeClassesObject,
  objectKeysApplyFn,
  makeFlagIconOptions,
  diffArrays
} from '../functions'
import { GetFlagIconModuleCountryCodes } from './functions'
import testThemeStyles from './testThemeStyles.css'

const { getCountryCodes } = countries
const { flagIconClassesPrefixName } = constants

// Helper functions

const getExpectedClassName = (props: FlagIconPropsType, options: FlagIconOptionsType): string => {
  const computedOptions = makeFlagIconOptions(options)
  let oParams = makeClassesObject(props, computedOptions)

  if (computedOptions.useCssModules) {
    const computedStyles = makeStyles(styles, computedOptions)

    oParams = objectKeysApplyFn(oParams, (key: string): string => {
      const skipValue = !oParams[key] // keys with 'false' values can be ignored
      const newKeyName = computedStyles[key]
      return skipValue ? key : newKeyName
    })
  }
  return classnames(oParams)
}

const filterClassObjectKey = (obj: classes, objKey: string): boolean =>
  objKey !== flagIconClassesPrefixName && objKey.startsWith(flagIconClassesPrefixName)

// FlagIcon Props

const requiredProps = {
  code: 'it'
}

const optionalProps = {
  size: '3x',
  squared: false,
  rotate: 90,
  flip: 'horizontal'
}

const allProps = {
  ...requiredProps,
  ...optionalProps
}

// Tests

test('countries.json is synchronized with flag-icon-css', (t: tape$Context) => {
  const jsonCodes = getCountryCodes()
  const moduleCodes: FlagIconCodeType[] = GetFlagIconModuleCountryCodes()
  const diff = diffArrays(jsonCodes, moduleCodes)
  const testOk = (diff.length === 0)
  const message = testOk ? '' : `Diff: ${diff.join(', ')}`

  t.ok(testOk, message)
  t.end()
})

test('functions > makeClassesObject', (t: tape$Context) => {
  const computedOptions = makeFlagIconOptions()
  const oParams = makeClassesObject(allProps, computedOptions)

  // First remove ${flagIconClassesPrefixName}, any key not starting with
  // ${flagIconClassesPrefixName} (e.g theme key)
  const oFilteredParams = Object.keys(oParams).filter(filterClassObjectKey.bind(this, oParams))
  const expectedLength = Object.keys(optionalProps).length
  // We substract the length of the required properties and then expect a key in the
  // object created by makeClassesObject for each of the optional properties
  const computedLength = oFilteredParams.length - Object.keys(requiredProps).length

  t.equal(expectedLength, computedLength)
  t.end()
})

test('FlagIconFactory > useCssModules: false and props: className', (t: tape$Context) => {
  const options = { useCssModules: false }
  const FlagIcon = FlagIconFactory(React, options)
  const props = { ...requiredProps, className: 'some-css-rule' }

  // Test that className works when useCssModules: false
  const ReactFlagIcon : React$Element<*> = FlagIcon(props)
  const wrapper: ShallowWrapper<*> = shallow(ReactFlagIcon)
  const expectedClassName = getExpectedClassName(props, options)

  t.equal(wrapper.contains(<span className={expectedClassName} />), true)
  t.end()
})

test('FlagIcon themeStyles', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const ReactFlagIcon = FlagIconCssModules({ ...requiredProps })

  const wrapper: ShallowWrapper<*> = shallow(ReactFlagIcon)
  const expectedClassName = getExpectedClassName(requiredProps, options)

  t.equal(wrapper.contains(<span className={expectedClassName} />), true)
  t.end()
})

test('FlagIcon props', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const FlagIcon = FlagIconFactory(React, makeFlagIconOptions({ useCssModules: false }))

  let currentProps = { ...requiredProps }
  let currentExpectedClassName = ''

  const countryCodes = getCountryCodes()
  let aComparisonResults = []

  countryCodes.forEach((code: string) => {
    currentProps = { ...currentProps, code }

    Object.keys(optionalProps).forEach((prop: string) => {
      const ReactFlagIconCssModules : React$Element<*> = FlagIconCssModules({ ...currentProps })
      const ReactFlagIcon : React$Element<*> = FlagIcon({ ...currentProps })
      const FlagIcons = [ReactFlagIconCssModules, ReactFlagIcon]

      FlagIcons.forEach((flagIcon: React$Element<*>, i: number) => {
        const wrapper: ShallowWrapper<*> = shallow(flagIcon)
        const Component = currentProps.Component ? currentProps.Component : 'span'
        const currentOptions = { ...options, useCssModules: (i === 0) }
        currentExpectedClassName = getExpectedClassName(currentProps, currentOptions)

        const result = wrapper.contains(<Component className={currentExpectedClassName} />)
        aComparisonResults = [...aComparisonResults, result]
      })
      currentProps = { ...currentProps, [prop]: optionalProps[prop] }
    })
  })

  const nTrueComparisons = aComparisonResults.filter((result: boolean): boolean => result).length
  t.equal(nTrueComparisons, aComparisonResults.length)
  t.end()
})

test('FlagIcon props:Component', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const FlagIcon = FlagIconFactory(React, { useCssModules: false })
  const ReactFlagIconCssModules = FlagIconCssModules({ ...requiredProps, Component: 'div' })
  const ReactFlagIcon = FlagIcon({ ...requiredProps, Component: 'div' })
  const flagIcons = [ReactFlagIconCssModules, ReactFlagIcon]
  let currentExpectedClassName = ''

  flagIcons.forEach((flagIcon: React$Element<*>, i: number) => {
    const wrapper: ShallowWrapper<*> = shallow(flagIcon)
    const currentOptions = { ...options, useCssModules: (i === 0) }
    currentExpectedClassName = getExpectedClassName(requiredProps, currentOptions)

    t.equal(wrapper.contains(<div className={currentExpectedClassName} />), true)
  })
  t.end()
})

test('FlagIcon mount > props:children', (t: tape$Context) => {
  const FlagIconCssModules = FlagIconFactory(React, { themeStyles: testThemeStyles })
  const FlagIcon = FlagIconFactory(React, { useCssModules: false })
  const childrenClassName = 'test'
  const childrenText = 'test'
  const children = DummyComponentFactory(React)({
    text: childrenText,
    className: childrenClassName
  })
  const ReactFlagIconCssModules = FlagIconCssModules({ ...requiredProps, children })
  const ReactFlagIcon = FlagIcon({ ...requiredProps, children })
  const flagIcons = [ReactFlagIconCssModules, ReactFlagIcon]

  flagIcons.forEach((flagIcon: React$Element<*>) => {
    const wrapper: ReactWrapper<*> = mount(flagIcon)

    t.equal(wrapper.contains(children), true)
    t.equal(wrapper.find('div').is(`div.${childrenClassName}`), true)
    t.equal(wrapper.find('div').text(), childrenText)
  })
  t.end()
})
