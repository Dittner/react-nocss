import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";

/*
*
* STACK
*
* */

export type StackHAlign = 'left' | 'right' | 'center' | 'stretch'
export type StackVAlign = 'top' | 'center' | 'base' | 'bottom' | 'stretch'

export interface StackProps extends StylableComponentProps {
  halign?: StackHAlign
  valign?: StackVAlign
}

const defVStackProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  gap: '10px',
  boxSizing: 'border-box'
}

export const VStack = (props: StackProps) => {
  const style = { ...defVStackProps, ...props }
  const halign = props.halign ?? 'left'
  const valign = props.valign ?? 'top'

  switch (halign) {
    case 'left':
      style.alignItems = 'flex-start'
      break
    case 'center':
      style.alignItems = 'center'
      break
    case 'right':
      style.alignItems = 'flex-end'
      break
    case 'stretch':
      style.alignItems = 'stretch'
      break
    default:
      style.alignItems = 'flex-start'
  }

  switch (valign) {
    case 'top':
      style.justifyContent = 'flex-start'
      break
    case 'center':
      style.justifyContent = 'center'
      break
    case 'base':
      style.alignItems = 'baseline'
      break
    case 'bottom':
      style.justifyContent = 'flex-end'
      break
    case 'stretch':
      style.justifyContent = 'space-between'
      break
    default:
      style.alignItems = 'flex-start'
  }

  let className = buildClassName(style)
  if ('className' in props) className += ' ' + props.className

  return <div id={props.id}
              key={props.keyValue}
              className={className}
              onMouseDown={props.onMouseDown}
              onClick={props.onClick}
              onDoubleClick={props.onDoubleClick}>
    {props.children}</div>
}

const defHStackProps = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '10px',
  boxSizing: 'border-box',
  wrap: false
}

export const HStack = (props: StackProps) => {
  const style = { ...defHStackProps, ...props }
  const halign = props.halign ?? 'left'
  const valign = props.valign ?? 'top'

  switch (halign) {
    case 'left':
      style.justifyContent = 'flex-start'
      break
    case 'center':
      style.justifyContent = 'center'
      break
    case 'right':
      style.justifyContent = 'flex-end'
      break
    case 'stretch':
      style.justifyContent = 'space-between'
      break
    default:
      style.alignItems = 'flex-start'
  }

  switch (valign) {
    case 'top':
      style.alignItems = 'flex-start'
      break
    case 'center':
      style.alignItems = 'center'
      break
    case 'base':
      style.alignItems = 'baseline'
      break
    case 'bottom':
      style.alignItems = 'flex-end'
      break
    case 'stretch':
      style.alignItems = 'stretch'
      break
    default:
      style.alignItems = 'flex-start'
  }

  let className = buildClassName(style)
  if ('className' in props) className += ' ' + props.className

  return <div id={props.id}
              key={props.keyValue}
              className={className}
              onClick={props.onClick}
              onMouseDown={props.onMouseDown}
              onDoubleClick={props.onDoubleClick}>
    {props.children}
  </div>
}

export const StylableContainer = (props: StylableComponentProps) => {
  const style = { boxSizing: 'border-box', ...props }
  let className = buildClassName(style)
  if ('className' in props) className += ' ' + props.className

  return <div id={props.id}
              className={className}
              onClick={props.onClick}
              onMouseDown={props.onMouseDown}
              onDoubleClick={props.onDoubleClick}>
    {props.children}
  </div>
}

export type StackLayout = 'horizontal' | 'vertical'

export interface LayoutProps extends StackProps {
  layout: StackLayout
}

export const Stack = (props: LayoutProps) => {
  if (props.layout === 'horizontal') {
    return <HStack {...props}>{props.children}</HStack>
  } else {
    return <VStack {...props}>{props.children}</VStack>
  }
}
