import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";

export const Rectangle = (props: StylableComponentProps) => {
  if (props.visible === false) return <></>
  return <div className={buildClassName(props)}/>
}
