import type { default as ReactType } from 'react'


type DummyPropsType = {
  className?: string,
  text?: string
}

const DummyComponent = (React: typeof react) : ReactType.createElement =>
(props: DummyPropsType) : ReactType.Element<*> =>
  <div className={props.className}>{props.text}</div>

export default DummyComponent
