// @flow
import type { PropsTypeObjectType } from '../types/flow'

type ObjStringKeyMixedValueType = { [string]: * }

const fnThemeStylesValidator = (
  // prop-types Object supplied by the user. i.e {lorem: PropTypes.string}
  propsObject: PropsTypeObjectType,
  // prop-values Object supplied by the user. i.e {lorem: 'ipsum'}
  propsValues: ObjStringKeyMixedValueType,
  propName: string,
  componentName: string,
  // eslint-disable-next-line consistent-return
): ?Error => {
  const { useCssModules, customCodes } = propsValues
  if (!useCssModules) return

  if (customCodes) {
    const { themeStyles } = propsValues

    if (themeStyles) {
      const themeStylesClassNames = Object.keys(themeStyles)
      const result = Object.keys(customCodes).filter(
        (customCode: string) =>
          !themeStylesClassNames.includes(`flag-icon-${customCode}`),
      )

      if (result.length > 0) {
        // eslint-disable-next-line consistent-return
        return new Error(
          `Invalid prop(s) \`themeStyles\` supplied to \
\`${componentName}\`, expected \`.flag-icon-[${result.join('/')}]\`.`,
        )
      }
    } else {
      // eslint-disable-next-line consistent-return
      return new Error(
        `Missing required prop(s) \`themeStyles\` supplied to \`${componentName}\`.`,
      )
    }
  }
}

export const AddThemeStylesValidator = (
  obj: PropsTypeObjectType,
): PropsTypeObjectType => {
  const validatorKeyName = '__themeStyles__'
  if (Object.prototype.hasOwnProperty.call(obj, validatorKeyName)) {
    // TODO: print a message or throw when not in production?
    return obj // The custom validator is already 'installed'.
  }

  return {
    ...obj,
    [validatorKeyName]: fnThemeStylesValidator.bind(this, obj),
  }
}

/**
 * This 'custom validator' function is called by the `prop-types` module at runtime.
 * If `propsValues`, the Object containing the 'props' passed to a React component
 * or to `PropTypes.checkPropTypes()`, contains a 'prop' (= one of its keys) that
 * is not in `propsObject` (the 'props' Object assigned by the user to
 * SomeComponent.propTypes or passed to `PropTypes.checkPropTypes()` - to declare
 * the prop-types), `prop-types` prints the text of `Error` to the console.
 *
 * SEE: https://github.com/reactjs/prop-types
 */
const fnNoExtraPropsValidator = (
  // prop-types Object supplied by the user. i.e {lorem: PropTypes.string}
  propsObject: PropsTypeObjectType,
  // prop-values Object supplied by the user. i.e {lorem: 'ipsum'}
  propsValues: ObjStringKeyMixedValueType,
  propName: string,
  componentName: string,
  // eslint-disable-next-line consistent-return
): ?Error => {
  const passedPropNames: string[] = Object.keys(propsValues)
  const extra = passedPropNames.filter(
    (prop: string) => !Object.prototype.hasOwnProperty.call(propsObject, prop),
  )

  if (extra.length > 0) {
    return new Error(
      `Invalid prop(s) ${JSON.stringify(extra)} supplied to \
\`${componentName}\`, expected one of [${passedPropNames.join(',')}].`,
    )
  }
}

/**
 * Adds a 'custom validator' function to `obj`; this function makes sure that any
 * 'prop' passed by the user at runtime exists as a key in `obj`, otherwise it throws
 * an Error. `obj` is a 'props' object, the one you would assign to `SomeComponent.propTypes`
 * or pass to `PropTypes.checkPropTypes()`. i.e {lorem: PropTypes.string}
 *
 * We use bind() to make a new `fnNoExtraPropsValidator` function with the first argument
 * set as: `obj`. We need to do this because `prop-types` doesn't pass this object
 * to 'custom validator' functions such as `fnNoExtraPropsValidator`.
 *
 * This type of validation is NOT the runtime equivalent to Flow's 'exact object
 * types', since we don't check if any required `prop-types` props have been supplied
 * or not, relying on the user to have specified an appropriate `isRequired` prop-type
 * for those.
 *
 * SEE: https://flow.org/en/docs/types/objects/#toc-exact-object-types
 */
// eslint-disable-next-line import/prefer-default-export, max-len
export const AddNoExtraPropsValidator = (
  obj: PropsTypeObjectType,
): PropsTypeObjectType => {
  const validatorKeyName = '__no__extra__props__validator___'
  if (Object.prototype.hasOwnProperty.call(obj, validatorKeyName)) {
    // The custom validator is already 'installed', or the user has managed to
    // somehow use `validatorKeyName`.
    return obj
  }

  return {
    ...obj,
    [validatorKeyName]: fnNoExtraPropsValidator.bind(this, obj),
  }
}
