import {useCallback} from 'react'
import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";

const TEXT_COLOR = '#000000'
const SELECTION_COLOR = '#0e93ff'

/*
*
* INPUT
*
* */

export interface InputProtocol {
  value: string
}

type InputType = 'text' | 'number' | 'password' | 'email'
type TurnType = 'on' | 'off'

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
