// @flow
// Test functions used in tests.
import * as React from 'react'
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import render from 'react-test-renderer' // eslint-disable-line import/no-extraneous-dependencies
import { restoreClassNamesInTree, makeFlagIcons } from './internals/functions'
import { cssModulePrefix } from './internals/constants'

test('restoreClassNamesInTree', t => {
  // Sample 'react-test-renderer' render(<SomeComponent />) output.
  const tree = {
    type: 'div',
    props: { className: `${cssModulePrefix}some-class`, lorem: 'ipsum' },
    children: {
      type: 'span',
      props: {
        className: `${cssModulePrefix}some-other-class ${cssModulePrefix}ipsum`,
      },
    },
  }

  // We expect `demodulifiedTree` to be `tree` with the `cssModulePrefix` string
  // removed from every `className`.
  const demodulifiedTree = restoreClassNamesInTree(tree)
  t.snapshot(demodulifiedTree)
})

test('makeFlagIcons', t => {
  const options = [{ useCssModules: false }, { useCssModules: true }]
  const props = [{ code: 'it', flip: 'horizontal' }, { code: 'es', rotate: 60 }]

  // $FlowExpectError
  t.throws(() => makeFlagIcons())
  // $FlowExpectError
  t.throws(() => makeFlagIcons(options))
  t.throws(() => makeFlagIcons(options, [{ code: 'it' }]))

  const [FlagIcon, FlagIconModules] = makeFlagIcons(options, props)
  const App = (
    <div>
      {FlagIcon}
      {FlagIconModules}
    </div>
  )
  const tree = render.create(App).toJSON()
  t.snapshot(tree)
})
