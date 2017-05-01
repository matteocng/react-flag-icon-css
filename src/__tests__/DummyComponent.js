// @flow
import typeof ReactModule from 'react'
import type ReactType from 'react'

type DummyPropsType = {
  className?: string,
  text?: string,
}

const DummyComponent = (
  React: ReactModule,
  props: DummyPropsType,
  // eslint-disable-next-line react/prop-types
): React$Element<*> => <div className={props.className}>{props.text}</div>

DummyComponent.defaultProps = {
  className: '',
  text: '',
}

const DummyComponentFactory = (React: ReactModule): ReactType.createElement =>
  DummyComponent.bind(null, React)

export default DummyComponentFactory
