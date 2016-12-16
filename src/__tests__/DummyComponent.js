import type ReactType from 'react'


type DummyPropsType = {
  className?: string,
  text?: string
}

const DummyComponent = (React: typeof module): ReactType.createElement =>
(props: DummyPropsType): React$Element<*> =>
  <div className={props.className}>{props.text}</div>

export default DummyComponent
