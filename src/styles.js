// @flow
import * as stylesFlagIcon from 'flag-icon-css/css/flag-icon.css'
import * as stylesMain from './styles/main.css'
import type { CssModuleType } from './types/flow'

const finalStyles: CssModuleType = {
  ...stylesFlagIcon,
  ...stylesMain,
}

export default finalStyles
