// @flow
import typeof ReactModule from 'react'
import type ReactType from 'react'


type DummyPropsType = {
  className?: string,
  text?: string
}

const DummyComponent = (React: ReactModule, props: DummyPropsType): React$Element<*> =>
  <div className={props.className}>{props.text}</div> // eslint-disable-line react/prop-types

DummyComponent.defaultProps = {
  className: '',
  text: ''
}

const DummyComponentFactory = (React: ReactModule): ReactType.createElement =>
  DummyComponent.bind(null, React)

export default DummyComponentFactory
