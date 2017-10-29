// @flow
// Simple component that partly mimics `FlagIcon` and `FlagIconFactory`. When we
// update `flow-bin` and dozens or hundreds of errors pop up, it should be "easier"
// to figure out a solution/workaround here, before attempting to modify the main
// code. We place the Flow tests below too, so that it is easier to modify something
// and check that it all works in a single file (Flow types, React components,
// Flow tests).
import PropTypes from 'prop-types'
import typeof ReactModule from 'react' // eslint-disable-line import/no-duplicates
// We import `ReactLibrary` exclusively for the Flow tests below.
import ReactLibrary from 'react' // eslint-disable-line import/no-duplicates
import type { Node, StatelessFunctionalComponent } from 'react'

// 1. Flow types.
type DummyCodeType = 'it' | 'eu'

type BaseDummyPropsType = {
  className?: string, // eslint-disable-line react/require-default-props
  text?: string, // eslint-disable-line react/require-default-props
}

type DummyPropsType = BaseDummyPropsType & {
  code: DummyCodeType,
}

type CustomDummyPropsType<T> = BaseDummyPropsType & {
  code: DummyCodeType | $Keys<T & {}>,
}

type DummyReturnType<T> = StatelessFunctionalComponent<CustomDummyPropsType<T>>
type DummyFactoryReturnType<T> = DummyReturnType<T>
type StandardDummyFactoryReturnType = StatelessFunctionalComponent<
  DummyPropsType,
>

type DummyOptionsType<T: {}> = {
  customCodes?: T,
  textRequired?: boolean,
}

// 2. Factory and component.
// We use functions and not simply two constants because otherwise, when using the
// "wrong" constant, no error is thrown.
const makeCorrectCode = () => 'it'
const makeWrongCode = () => 'wrong'

const DummyComponent = <T>(
  React: ReactModule,
  // eslint-disable-next-line react/prop-types
): DummyReturnType<T> => (props: CustomDummyPropsType<T>): Node =>
  <div className={props.className}>
    <span>
      {props.text} - {props.code}
    </span>
  </div>

const defaultProps = {
  text: 'Some Text',
}

const makePropTypes = <T: {}>(options: DummyOptionsType<T> = {}) => ({
  code: PropTypes.oneOf([makeCorrectCode(), 'eu']),
  className: PropTypes.string,
  text: options.textRequired ? PropTypes.string.isRequired : PropTypes.string,
})

const DummyComponentFactory = <T: {}>(
  React: ReactModule,
  options?: DummyOptionsType<T>,
): StandardDummyFactoryReturnType => {
  const builtDummyComponent = DummyComponent(React)

  builtDummyComponent.propTypes = makePropTypes(options)
  // `defaultProps` is not added to Flow's `StatelessFunctionalComponent` type so
  // that its type may be inferred. SEE: https://github.com/facebook/flow/pull/4806
  // $FlowExpectError
  builtDummyComponent.defaultProps = defaultProps
  return builtDummyComponent
}

const CustomDummyFactory = <T: {}>(
  React: ReactModule,
  options?: DummyOptionsType<T>,
): DummyFactoryReturnType<T> => DummyComponentFactory(React, options)

export default DummyComponentFactory

// 3. Flow tests.
/* eslint-disable no-unused-vars */
const Dummy = DummyComponentFactory(ReactLibrary)
Dummy({ code: makeCorrectCode() })

// $FlowExpectError
const code: DummyCodeType = { code: makeWrongCode() }

// $FlowExpectError
Dummy({ code: { code: makeWrongCode() } })

// $FlowExpectError
Dummy({ rotate: 30 })

const customCodes = { custom: 'Custom' }

const CustomDummy: DummyFactoryReturnType<
  typeof customCodes,
> = DummyComponentFactory(ReactLibrary, { customCodes })

// $FlowExpectError
CustomDummy({ code: { code: makeWrongCode() } })

CustomDummy({ code: 'custom' })

// $FlowExpectError
const theOptionsWrong = { customCodes: true }
CustomDummyFactory(ReactLibrary, theOptionsWrong)

const theOptions = { customCodes }
const CustomDummyAuto = CustomDummyFactory(ReactLibrary, theOptions)

const manuallyTypedOptionsType: DummyOptionsType<*> = { customCodes }
const AnotherDummy = CustomDummyFactory(ReactLibrary, theOptions)
AnotherDummy({ code: 'custom' })
AnotherDummy({ code: makeCorrectCode() })

// $FlowExpectError
const manuallyTypedOptionsTypeWrong: DummyOptionsType<*> = { customCodes: true }

// $FlowExpectError
CustomDummyAuto({ code: makeWrongCode() })

CustomDummyAuto({ code: 'custom' })

CustomDummyAuto({ code: makeCorrectCode() })

const somePropObject: DummyPropsType = {
  code: makeCorrectCode(),
}

// $FlowExpectError
const someWrongPropObject: DummyPropsType<void> = {
  code: makeWrongCode(),
}

// Dynamic loops.
const myAppCodes: DummyCodeType[] = [makeCorrectCode(), 'eu']

const MyDummy = DummyComponentFactory(ReactLibrary)
myAppCodes.map(paramCode => MyDummy({ code: paramCode }))

const myCustomCodes = { c1: 'Custom 1', c2: 'Custom 2' }
const MyCustomDummy = CustomDummyFactory(ReactLibrary, {
  customCodes: myCustomCodes,
})
const myAppCodesWithCustom = [...myAppCodes, ...Object.keys(myCustomCodes)]
myAppCodesWithCustom.map(paramCode => MyCustomDummy({ code: paramCode }))
