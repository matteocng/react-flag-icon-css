// @flow
import React from 'react'
import test from 'tape' // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme' // eslint-disable-line import/no-extraneous-dependencies
import classnames from 'classnames'

import type { ReactWrapper, ShallowWrapper } from 'enzyme' // eslint-disable-line import/no-extraneous-dependencies
import type classes from 'classnames'
import type { FlagIconPropsType, FlagIconOptionsType } from '../types/flow'

import FlagIconFactory from '../'
import styles from '../styles'
import DummyComponentFactory from './DummyComponent'
import { countries, constants, makeStyles, makeClassesObject, objectKeysApplyFn,
         makeFlagIconOptions } from '../functions'
import testThemeStyles from './testThemeStyles.scss'

const { getCountryCodes } = countries
const { flagIconClassesPrefixName } = constants

// Helpers and definitions

const getExpectedClassName = (props: FlagIconPropsType, options: FlagIconOptionsType) : string => {
  const computedOptions = makeFlagIconOptions(options)
  let oParams = makeClassNameObject(props, computedOptions)

  if (computedOptions.useCssModules) {
    const computedStyles = makeCssModulesObject(styles, computedOptions)

    oParams = objectKeysApplyFn(oParams, (key: string) : string => {
      const skipValue = !oParams[key] // keys with 'false' values can be ignored
      const newKeyName = computedStyles[key]
      return skipValue ? key : newKeyName
    })
  }
  return classnames(oParams)
}

const baseProps = {
  code: 'it'
}

// Tests


test('FlagIconFactory > useCssModules: false and props: className', (t: tape$Context) => {
  const options = { useCssModules: false }
  const FlagIcon = FlagIconFactory(React, options)
  const props = { ...baseProps, className: 'some-css-rule' }

  // Test that className works when useCssModules: false
  const ReactFlagIcon : React$Element<*> = FlagIcon(props)
  const wrapper: ShallowWrapper<*> = shallow(ReactFlagIcon)
  const expectedClassName = getExpectedClassName(props, options)

  t.equal(wrapper.contains(<span className={expectedClassName} />), true)
  t.end()
})

test('FlagIconFactory', (t: tape$Context) => {
  FlagIconFactory(React)
  t.end()
})

test('FlagIcon themeStyles', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const ReactFlagIcon = FlagIconCssModules({ ...baseProps })

  const wrapper: ShallowWrapper<*> = shallow(ReactFlagIcon)
  const expectedClassName = getExpectedClassName(baseProps, options)

  t.equal(wrapper.contains(<span className={expectedClassName} />), true)
  t.end()
})

test('FlagIcon props', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const FlagIcon = FlagIconFactory(React, makeFlagIconOptions({ useCssModules: false }))
  const props = {
    size: '3x',
    squared: '',
    rotate: 180
  }

  let currentProps = { ...baseProps }
  let currentExpectedClassName = ''

  Object.keys(props).forEach((prop: string) => {
    const ReactFlagIconCssModules : React$Element<*> = FlagIconCssModules({ ...currentProps })
    const ReactFlagIcon : React$Element<*> = FlagIcon({ ...currentProps })
    const FlagIcons = [ReactFlagIconCssModules, ReactFlagIcon]
    FlagIcons.forEach((flagIcon: React$Element<*>, i: number) => {
      const wrapper: ShallowWrapper<*> = shallow(flagIcon)
      const Component = currentProps.Component ? currentProps.Component : 'span'
      const currentOptions = { ...options, useCssModules: (i === 0) }
      currentExpectedClassName = getExpectedClassName(currentProps, currentOptions)

      t.equal(wrapper.contains(<Component className={currentExpectedClassName} />), true)
    })
    currentProps = { ...currentProps, [prop]: props[prop] }
  })
  t.end()
})

test('FlagIcon props:Component', (t: tape$Context) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(React, options)
  const FlagIcon = FlagIconFactory(React, { useCssModules: false })
  const ReactFlagIconCssModules = FlagIconCssModules({ ...baseProps, Component: 'div' })
  const ReactFlagIcon = FlagIcon({ ...baseProps, Component: 'div' })
  const flagIcons = [ReactFlagIconCssModules, ReactFlagIcon]
  let currentExpectedClassName = ''

  flagIcons.forEach((flagIcon: React$Element<*>, i: number) => {
    const wrapper: ShallowWrapper<*> = shallow(flagIcon)
    const currentOptions = { ...options, useCssModules: (i === 0) }
    currentExpectedClassName = getExpectedClassName(baseProps, currentOptions)

    t.equal(wrapper.contains(<div className={currentExpectedClassName} />), true)
  })
  t.end()
})

test('FlagIcon mount > props:children', (t: tape$Context) => {
  const FlagIconCssModules = FlagIconFactory(React, { themeStyles: testThemeStyles })
  const FlagIcon = FlagIconFactory(React, { useCssModules: false })
  const childrenClassName = 'test'
  const childrenText = 'test'
  const children = DummyComponentFactory(React)({ text: childrenText,
                                                  className: childrenClassName })
  const ReactFlagIconCssModules = FlagIconCssModules({ ...baseProps, children })
  const ReactFlagIcon = FlagIcon({ ...baseProps, children })
  const flagIcons = [ReactFlagIconCssModules, ReactFlagIcon]

  flagIcons.forEach((flagIcon: React$Element<*>) => {
    const wrapper: ReactWrapper<*> = mount(flagIcon)

    t.equal(wrapper.contains(children), true)
    t.equal(wrapper.find('div').is(`div.${childrenClassName}`), true)
    t.equal(wrapper.find('div').text(), childrenText)
  })
  t.end()
})
