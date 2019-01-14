// @flow
import test from 'ava' // eslint-disable-line import/no-extraneous-dependencies
import type classes from 'classnames'
import { makeClassesObject, makeFlagIconOptions } from '../functions'
import { filterClassObjectKey } from './internals/functions'
import { requiredProps, optionalProps, allProps } from './static/flagIconProps'

// TODO: this may be improved, maybe using snapshots.
test('functions > makeClassesObject', (t: *) => {
  const computedOptions = makeFlagIconOptions()
  const oParams: classes = makeClassesObject(allProps, computedOptions)

  // First remove ${flagIconClassesPrefixName}, any key not starting with
  // ${flagIconClassesPrefixName} (e.g theme key)
  const oFilteredParams = Object.keys(oParams).filter(
    filterClassObjectKey.bind(this, oParams),
  )
  const expectedLength = Object.keys(optionalProps).length
  // We substract the length of the required properties and then expect a key in the
  // object created by makeClassesObject for each of the optional properties
  const computedLength =
    oFilteredParams.length - Object.keys(requiredProps).length

  t.is(expectedLength, computedLength)
})
