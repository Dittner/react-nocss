import {buildClassName, StylableComponentProps} from "./core";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

/*
*
* LABEL
*
**/

type LabelType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export interface LabelProps extends StylableComponentProps{
  text?: string
  lineHeight?: string
  letterSpacing?: string
  breakLines?: boolean
  type?: LabelType | undefined
}

export const Label = (props: LabelProps) => {
  if ('visible' in props && !props.visible) return <></>

  const id = props.id
  let className = 'className' in props ? props.className + ' ' : ''
  className += buildClassName(props)

  if (props.breakLines && props.text) {
    const lines = props.text?.split('\n')
    return <>{
      lines.map(line => {
        return <p id={id} className={className} onClick={props.onClick}>{line}</p>
      })
    }
    </>
  }

  switch (props.type) {
    case 'p': return <p id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</p>
    case 'h1': return <h1 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h1>
    case 'h2': return <h2 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h2>
    case 'h3': return <h3 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h3>
    case 'h4': return <h4 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h4>
    case 'h5': return <h5 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h5>
    case 'h6': return <h6 id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</h6>
    default: return <p id={id} className={className} onClick={props.onClick}>{props.text ?? props.children}</p>
  }
}


/*
*
* BUTTON
*
**/

export interface ButtonProps extends StylableComponentProps {
  title?: string
  popUp?: string
  visible?: boolean
  disabled?: boolean
  isSelected?: boolean
  selectedState?: (state: StylableComponentProps) => void
  disabledState?: (state: StylableComponentProps) => void
}

const NoCSSButton = (props: ButtonProps) => {
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
**/

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

export const Switcher = (props: SwitcherProps) => {
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

/*
*
* STACK, VSTACK, HSTACK
*
**/

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

/*
*
* INPUT
*
* */


const TEXT_COLOR = '#000000'
const SELECTION_COLOR = '#0e93ff'

export interface InputProtocol {
  value: string
}

export type InputType = 'text' | 'number' | 'password' | 'email'
export type TurnType = 'on' | 'off'

export interface TextInputProps extends StylableComponentProps {
  type?: InputType
  protocol?: InputProtocol
  text?: string
  fontSize?: string
  placeholder?: string
  caretColor?: string
  onChange?: ((value: string) => void) | undefined
  onSubmitted?: (() => void) | undefined
  onCanceled?: (() => void) | undefined
  autoFocus?: boolean
  autoCorrect?: TurnType
  autoComplete?: TurnType
  focusState?: (state: StylableComponentProps) => void
  placeholderState?: (state: StylableComponentProps) => void
}

const NoCSSInput = (props: TextInputProps) => {
  let className = buildClassName(props)
  if ('className' in props) className += ' ' + props.className

  const onKeyDown = (e: any) => {
    // Enter key
    if (props.onSubmitted && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      props.onSubmitted()
    }
    // Esc key
    else if (props.onCanceled && e.keyCode === 27 && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      props.onCanceled()
    }
  }

  const inputRef = useCallback((input: HTMLInputElement) => {
    if (input && props.autoFocus) {
      setTimeout(() => {
        input.focus()
      }, 0)
    }
  }, [props.autoFocus])

  return (
    <input ref={inputRef}
           className={className}
           placeholder={props.placeholder}
           autoCorrect={props.autoCorrect}
           autoComplete={props.autoComplete}
           type={props.type}
           defaultValue={props.text ?? props.protocol?.value}
           onChange={e => {
             if (props.protocol) props.protocol.value = e.currentTarget.value
             props.onChange?.(e.currentTarget.value)
           }}
           onKeyDown={onKeyDown}/>
  )
}

const defInputProps = {
  type: 'text' as InputType,
  textColor: TEXT_COLOR,
  borderColor: TEXT_COLOR,
  bgColor: '#ffFFff',
  autoCorrect: 'off' as TurnType,
  autoComplete: 'off' as TurnType,
  focusState: (state: StylableComponentProps) => {
    state.borderColor = SELECTION_COLOR
  }
}

export const TextInput = (props: TextInputProps) => {
  if ('visible' in props && !props.visible) return <></>
  return (
    <NoCSSInput type={defInputProps.type}
                textColor={defInputProps.textColor}
                bgColor={defInputProps.bgColor}
                borderColor={defInputProps.borderColor}
                autoCorrect={defInputProps.autoCorrect}
                autoComplete={defInputProps.autoComplete}
                focusState={defInputProps.focusState}
                {...props}/>
  )
}

/*
*
* TextArea
*
* */

interface TextAreaProps extends StylableComponentProps {
  text?: string
  rows?: number
  lineHeight?: string
  protocol?: InputProtocol
  placeholder?: string
  caretColor?: string
  autoFocus?: boolean
  autoCorrect?: TurnType
  autoComplete?: TurnType
  onChange?: ((value: string) => void) | undefined
  focusState?: (state: StylableComponentProps) => void
  placeholderState?: (state: StylableComponentProps) => void
}

const NoCSSTextArea = (props: TextAreaProps) => {
  const className = 'className' in props ? props.className + ' ' + buildClassName(props) : buildClassName(props)

  return <textarea className={className}
                   placeholder={props.placeholder}
                   value={props.text ?? props.protocol?.value}
                   autoFocus={props.autoFocus}
                   spellCheck="false"
                   rows={props.rows}
                   onChange={e => {
                     if (props.protocol) props.protocol.value = e.currentTarget.value
                     props.onChange?.(e.currentTarget.value)
                   }}/>
}

const defTextAreaProps = {
  textColor: TEXT_COLOR,
  borderColor: TEXT_COLOR,
  bgColor: '#ffFFff',
  autoCorrect: 'off' as TurnType,
  autoComplete: 'off' as TurnType,
  focusState: (state: StylableComponentProps) => {
    state.borderColor = SELECTION_COLOR
  }
}

export const TextArea = (props: TextAreaProps) => {
  if ('visible' in props && !props.visible) return <></>

  console.log('new TextArea')
  return (
    <NoCSSTextArea borderColor={defTextAreaProps.borderColor}
                   bgColor={defTextAreaProps.bgColor}
                   autoCorrect={defTextAreaProps.autoCorrect}
                   autoComplete={defTextAreaProps.autoComplete}
                   focusState={defTextAreaProps.focusState}
                   {...props}/>
  )
}

/*
*
* Image
*
* */

interface ImageProps extends StackProps {
  src: string
  alt: string
  containerWidth?: string
  containerHeight?: string
  preview?: string
}

export const Image = (props: ImageProps) => {
  const [showPreview, setShowPreview] = useState(props.preview !== undefined)

  useEffect(() => {
    if (props.preview) {
      setShowPreview(true)
      setTimeout(() => {
        setShowPreview(false)
      }, 100)
    }
  }, [props.src])

  if ('visible' in props && !props.visible) return <></>

  return (
    <VStack {...props}
            width={props.containerWidth ?? props.width}
            height={props.containerHeight ?? props.height}>
      <img width={props.width}
           height={props.height}
           src={showPreview ? props.preview : props.src} alt={props.alt}/>
    </VStack>
  )
}

/*
*
* LINK
*
* */

export interface LinkProps extends StylableComponentProps {
  title: string,
  link: string,
  visible?: boolean
}

export const LinkButton = (props: LinkProps) => {
  if ('visible' in props && !props.visible) return <></>
  let className = buildClassName(props)
  if ('className' in props) className += ' ' + props.className

  return <NavLink className={className}
                  to={props.link}>{props.title}</NavLink>
}

/*
*
* SPACER
*
* */

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

/*
*
* Rectangle
*
* */

export const Rectangle = (props: StylableComponentProps) => {
  if (props.visible === false) return <></>
  return <div className={buildClassName(props)}/>
}
