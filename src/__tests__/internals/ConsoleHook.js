// @flow
export type ConsoleHookType = {|
  getLog: () => string,
  flushLog: () => string,
  detach: () => ConsoleHookType,
  attach: () => ConsoleHookType,
|}

export const ConsoleOutput = {
  log: 'log',
  info: 'info',
  warn: 'warn',
  error: 'error',
}

type ConsoleOutputType = $Keys<typeof ConsoleOutput>

type ConsoleHookInputType = {|
  outputType: ConsoleOutputType,
  attachOnCreate?: boolean,
|}

let consoleText = ''

const defaultOptions = {
  outputType: ConsoleOutput.log,
  attachOnCreate: true,
}

const makeOptions = (options: ConsoleHookInputType): ConsoleHookInputType =>
  Object.assign(defaultOptions, options)

// Factory of ConsoleHookType.
// NOTE: please avoid using this hook whenever possible, not a best practice.
export default (inputOptions: ConsoleHookInputType): ConsoleHookType => {
  const options = makeOptions(inputOptions)
  const { outputType, attachOnCreate } = options
  const fnBeforeAttach = console[outputType] // eslint-disable-line no-console

  const fnHook = (...args: mixed[]) => {
    consoleText = `${consoleText}${args.join()}`
  }

  const returnValue: ConsoleHookType = {
    getLog: (): string => consoleText,
    flushLog: (): string => {
      const ret: string = consoleText
      consoleText = ''
      return ret
    },
    detach: (): ConsoleHookType => {
      // eslint-disable-next-line flowtype/no-weak-types, no-extra-semi
      ;(console: any)[outputType] = fnBeforeAttach
      return returnValue
    },
    attach: (): ConsoleHookType => {
      // eslint-disable-next-line flowtype/no-weak-types, no-extra-semi
      ;(console: any)[outputType] = fnHook
      return returnValue
    },
  }

  // Call 'attach', so that ConsoleHookType is immediately active when created.
  if (attachOnCreate) returnValue.attach()

  return returnValue
}
