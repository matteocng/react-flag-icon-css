export const requiredProps = {
  code: 'it',
}

export const optionalProps = {
  size: '3x',
  squared: false,
  rotate: 90,
  flip: 'horizontal',
}

export const allProps = {
  ...requiredProps,
  ...optionalProps,
}
