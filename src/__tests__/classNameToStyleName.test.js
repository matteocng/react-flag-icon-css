// @flow
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import type classes from 'classnames'
import classNameToStyleName from '../functions/classNameToStyleName'
import { cssModulePrefix } from './internals/constants'
import styles from './static/testThemeStyles.css'

test('basic behavior', t => {
  const styleName: classes = classNameToStyleName('some-css-rule', styles)
  t.is(styleName, `${cssModulePrefix}some-css-rule`)
})

test("styleName doesn't exist in styles", t => {
  t.throws(() => {
    classNameToStyleName('some-not-existing-css-rule', styles)
  })
})
