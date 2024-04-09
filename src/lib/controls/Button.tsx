import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";
import {StylableContainer} from "./Container";

export interface ButtonProps extends StylableComponentProps {
  title?: string
  popUp?: string
  visible?: boolean
  disabled?: boolean
  isSelected?: boolean
  selectedState?: (state: StylableComponentProps) => void
  disabledState?: (state: StylableComponentProps) => void
}

export const NoCSSButton = (props: ButtonProps) => {
  if ('visible' in props && !props.visible) return <></>
  let className = buildClassName(props)
  if ('className' in props) className += ' ' + props.className

  return <button className={className}
                 title={props.popUp}
                 onClick={(e) => {
                   if (!props.disabled) {
                     e.stopPropagation()
                     props.onClick?.()
                   }
                 }}>{props.title ?? props.children}</button>
}

const defBtnProps = {
  textColor: '#ffFFff',
  bgColor: '#24282c',
  selectedBgColor: '#3c4349',
  hoverState: (state: StylableComponentProps) => {
    state.bgColor = '#2d3237'
  }
}

export const Button = (props: ButtonProps) => {
  const isDisabled = 'disabled' in props && props.disabled
  if (isDisabled) {
    const style = {...props}
    if (props.disabledState) props.disabledState(style)
    return <NoCSSButton textColor={defBtnProps.textColor}
                        bgColor={defBtnProps.bgColor}
                        opacity='0.5'
                        {...style}
                        hoverState={_ => {
                        }}/>
  }

  const isSelected = 'isSelected' in props && props.isSelected
  if (isSelected) {
    const style = {...props}
    if (props.selectedState) props.selectedState(style)
    return <NoCSSButton textColor={defBtnProps.textColor}
                        bgColor={defBtnProps.selectedBgColor}
                        {...style}/>
  }

  return <NoCSSButton textColor={defBtnProps.textColor}
                      bgColor={defBtnProps.bgColor}
                      hoverState={defBtnProps.hoverState}
                      {...props}/>
}

/*
*
* Switcher
*
* */

export interface SwitcherProps {
  popUp?: string
  width?: number
  height?: number
  borderWidth?: number
  thumbColor?: string
  selectedThumbColor?: string
  bgColor?: string
  selectedBgColor?: string
  visible?: boolean
  disabled?: boolean
  isSelected?: boolean
  onClick?: () => void
}

export const NoCSSSwitcher = (props: SwitcherProps) => {
  const width = props.width ?? 34
  const height = props.height ?? 22
  const borderWidth = props.borderWidth ?? 3
  const thumbDiameter = height - 2 * borderWidth

  const click = () => {
    if (!props.disabled) props.onClick?.()
  }
  return <NoCSSButton disabled={props.disabled}
                      popUp={props.popUp}
                      minHeight='0'
                      width={width + 'px'}
                      height={height + 'px'}
                      bgColor={props.isSelected ? props.selectedBgColor ?? props.bgColor : props.bgColor}
                      cornerRadius={height + 'px'}
                      animateAll='background-color 300ms'
                      onClick={click}>

    <StylableContainer width={thumbDiameter + 'px'}
                       height={thumbDiameter + 'px'}
                       cornerRadius={thumbDiameter + 'px'}
                       bgColor={props.isSelected ? props.selectedThumbColor ?? props.thumbColor : props.thumbColor}
                       top='0'
                       left={(props.isSelected ? width - thumbDiameter - borderWidth : borderWidth) + 'px'}
                       animateAll='300ms'
                       position='relative'/>
  </NoCSSButton>
}
