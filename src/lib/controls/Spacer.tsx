import * as React from 'react'
import {buildClassName} from "../NoCSS";


interface SpacerProps {
  width?: string
  height?: string
  visible?: boolean
}

export const Spacer = ({
  width,
  height,
  visible = true
}: SpacerProps) => {
  if (!visible) return <></>

  const style: any = {}
  style.flexGrow = 1

  if (width !== undefined) {
    style.width = width
    style.minWidth = width
    style.maxWidth = width
  }

  if (height !== undefined) {
    style.height = height
    style.minHeight = height
    style.maxHeight = height
  }

  return <div className={buildClassName(style)}/>
}
