import type ReactType from 'react'


type DummyPropsType = {
  className?: string,
  text?: string
}

const DummyComponent = (React: typeof module, props: DummyPropsType): React$Element<*> =>
  <div className={props.className}>{props.text}</div> // eslint-disable-line react/prop-types

DummyComponent.defaultProps = {
  className: '',
  text: ''
}

const DummyComponentFactory = (React: typeof module): ReactType.createElement =>
  DummyComponent.bind(null, React)

export default DummyComponentFactory
