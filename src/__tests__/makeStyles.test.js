// @flow
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import makeStyles from '../functions/styles'
import styles from './static/testThemeStyles.css'
import type { CssModuleType } from '../types/flow'

test("returns 'styles' as-is if 'options' is not passed", t => {
  const returnStyles: CssModuleType = makeStyles(styles)

  t.deepEqual(returnStyles, styles)
})

test("returns 'styles' merged with 'themeStyles'", t => {
  // We pretend this is a 'CssModuleType' result from importing a .css file.
  const themeStyles: CssModuleType = {
    lorem: 'ipsum',
    dolor: 'amet',
  }
  const options = { themeStyles, useCssModules: true }
  const returnStyles: CssModuleType = makeStyles(styles, options)

  t.snapshot(returnStyles)
})
