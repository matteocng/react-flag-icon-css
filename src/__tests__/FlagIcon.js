// @flow
import * as React from 'react'
import type { Node } from 'react'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import render from 'react-test-renderer' // eslint-disable-line import/no-extraneous-dependencies

import FlagIconFactory from '../'
import DummyComponentFactory from './internals/DummyComponent'
import { countries } from '../functions'
import {
  GetFlagIconModuleCountryCodes,
  makeFlagIcons,
  restoreClassNamesInTree,
  diffArrays,
} from './internals/functions'
import testThemeStyles from './static/testThemeStyles.css'
import { requiredProps, optionalProps } from './static/flagIconProps'

const { getCountryCodes } = countries
const ReactDefault = React.default

// Utility functions.

const makeSnapshotMessage = (props, options) =>
  `Props: ${JSON.stringify(props)}. Options: ${JSON.stringify(options)}`

const testFlagIcon = (t: *, flagIcon: Node, options, props) => {
  const tree = render.create(flagIcon).toJSON()
  t.snapshot(tree, makeSnapshotMessage(props, options))
}

const testFlagIcons = (t: *, flagIcons: Node[], options, props) =>
  flagIcons.forEach((flagIcon, i) =>
    testFlagIcon(
      t,
      flagIcon,
      options[i],
      Array.isArray(props) ? props[i] : props,
    ),
  )

// Tests.

test('countries.js is synchronized with flag-icon-css', (t: *) => {
  // We cast FlagIconCodeType[] to string[] (Flow).
  const jsonCodes = getCountryCodes().map((code): string => code)
  const moduleCodes = GetFlagIconModuleCountryCodes()
  const diff = diffArrays(jsonCodes, moduleCodes)
  const testOk = diff.length === 0
  const message = testOk ? '' : `Diff: ${diff.join(', ')}`

  t.truthy(testOk, message)
})

test('props: className', (t: *) => {
  const options = { useCssModules: false }
  const props = { ...requiredProps, className: 'some-css-rule' }

  const FlagIcon = FlagIconFactory(ReactDefault, options)
  const ReactFlagIcon = FlagIcon(props)
  testFlagIcon(t, ReactFlagIcon, options, props)
})

test('props: styleName', (t: *) => {
  const options = { themeStyles: testThemeStyles }
  const props = {
    ...requiredProps,
    styleName: 'some-other-css-rule',
    className: 'some-css-rule',
  }

  const FlagIconModules = FlagIconFactory(ReactDefault, options)(props)
  testFlagIcon(t, FlagIconModules, options, props)
})

test('options:themeStyles', (t: *) => {
  const options = { themeStyles: testThemeStyles }
  const FlagIconCssModules = FlagIconFactory(ReactDefault, options)
  const ReactFlagIcon = FlagIconCssModules({ ...requiredProps })

  const tree = render.create(ReactFlagIcon).toJSON()
  t.snapshot(tree, makeSnapshotMessage(requiredProps, options))
})

test('optional props', (t: *) => {
  const options = [{ useCssModules: false }, {}]
  let currentProps = { ...requiredProps }

  Object.keys(optionalProps).forEach((prop: string) => {
    const flagIcons = makeFlagIcons(options, [currentProps, currentProps])

    // We render the 'standard CSS' FlagIcon and save a snapshot.
    const tree = render.create(flagIcons[0]).toJSON()
    t.snapshot(tree, makeSnapshotMessage(currentProps, options[0]))

    // The only expected difference in this test between `tree` and `modulesTree`
    // is the `className` props: they have been replaced by `FlagIcon` with the
    // corresponding CSS modules. We undo that replacement using `restoreClassNamesInTree`
    // and then compare the two JSON trees. This workaround keeps the snapshot
    // file shorter.
    const modulesTree = render.create(flagIcons[1]).toJSON()

    const deModulifiedModulesTree = restoreClassNamesInTree(modulesTree)

    t.true(
      JSON.stringify(tree) === JSON.stringify(deModulifiedModulesTree),
      makeSnapshotMessage(currentProps, options[1]),
    )

    currentProps = { ...currentProps, [prop]: optionalProps[prop] }
  })
})

test('props:Component', (t: *) => {
  const options = [{ useCssModules: false }, {}]
  const props = { ...requiredProps, Component: 'div' }
  const flagIcons = makeFlagIcons(options, [props, props])

  testFlagIcons(t, flagIcons, options, props)
})

test('props:children', (t: *) => {
  const options = [{ useCssModules: false }, {}]

  const childrenClassName = 'test'
  const childrenText = 'test'
  const DummyComponent = DummyComponentFactory(ReactDefault)
  const children = DummyComponent({
    code: 'it',
    text: childrenText,
    className: childrenClassName,
  })

  const props = { ...requiredProps, children }
  const flagIcons = makeFlagIcons(options, [props, props])

  testFlagIcons(t, flagIcons, options, props)
})
