// @flow
import PropTypes from 'prop-types'
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

DummyComponent.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
}

const DummyComponentFactory = (React: ReactModule): ReactType.createElement =>
  DummyComponent.bind(null, React)

export default DummyComponentFactory
