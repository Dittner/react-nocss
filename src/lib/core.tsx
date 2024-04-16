import * as React from 'react'
import {
  type PseudoClassType, StyleSheetProcessor
} from './processor'

export const abbreviations: Record<string, string> = {
  'align-items': 'A',
  'background-color': 'BG',
  'background-image': 'BI',
  'background-attachment': 'BIA',
  'background-repeat': 'BIR',
  'background-size': 'BIS',
  'border': 'BO',
  'border-left': 'BL',
  'border-right': 'BR',
  'border-top': 'BT',
  'border-bottom': 'BB',
  'border-radius': 'BRA',
  'bottom': 'B',
  'box-sizing': 'S',
  'box-shadow': 'BS',
  'caret-color': 'CC',
  'color': 'C',
  'cursor': 'CU',
  'display': 'D',
  'flex-direction': 'F',
  'flex-grow': 'FG',
  'flex-wrap': 'FR',
  'font-family': 'FF',
  'font-size': 'FS',
  'font-style': 'FST',
  'font-weight': 'FW',
  'gap': 'G',
  'height': 'H',
  'justify-content': 'J',
  'left': 'L',
  'letter-spacing': 'LS',
  'line-height': 'LH',
  'margin': 'M',
  'margin-left': 'ML',
  'margin-right': 'MR',
  'margin-top': 'MT',
  'margin-bottom': 'MB',
  'max-height': 'MAH',
  'max-width': 'MAW',
  'min-height': 'MIH',
  'min-width': 'MIW',
  'opacity': 'OP',
  'overflow': 'O',
  'overflow-x': 'OX',
  'overflow-y': 'OY',
  'outline': 'OL',
  'padding': 'P',
  'padding-left': 'PL',
  'padding-right': 'PR',
  'padding-top': 'PT',
  'padding-bottom': 'PB',
  'position': 'PO',
  'right': 'R',
  'text-align': 'TA',
  'text-decoration': 'TD',
  'transform': 'TRA',
  'text-transform': 'TR',
  'text-shadow': 'TS',
  'text-overflow': 'TO',
  'top': 'T',
  'transition': 'TN',
  'white-space': 'WS',
  'width': 'W',
  'z-index': 'Z'
}

interface RuleBuilderInterface {
  reset: (pseudoClass: PseudoClassType, rulePriority: RulePriority) => void
  operator: Record<string, (value: any) => void>
  getClassName: (tag: string) => string
  addRule: (parentSelector: string, childSelector: string) => void
}

export type RulePriority = 'high' | 'low'

const RuleBuilder = (): RuleBuilderInterface => {
  const notAllowedSymbolsInClassName = /[%. ()/#"]+/g
  const classNameHash = new Map<string, string>()

  // Creating of dynamic stylesheets are enabled only in Chrome (23.06.2023)
  // const styleSheet = new CSSStyleSheet();
  // document.adoptedStyleSheets = [styleSheet];
  const styleSheet = window.document.styleSheets[0]
  const styleSheetProcessor = new StyleSheetProcessor(styleSheet)
  let pseudoClass: PseudoClassType = 'none'
  let rulePriority: RulePriority = 'low'

  const operator: Record<string, (value: any) => void> = Object.create(null)

  const reset = (pseudoClassValue: PseudoClassType, rulePriorityValue: RulePriority): void => {
    styleSheetProcessor.clearValues()
    pseudoClass = pseudoClassValue
    rulePriority = rulePriorityValue
  }

  const getClassName = (tag: string): string => {
    const hashSum = styleSheetProcessor.valuesToHashSum()
    if (!hashSum) return ''

    if (classNameHash.has(hashSum)) { return classNameHash.get(hashSum) as string }

    const className = hashSum.replace(notAllowedSymbolsInClassName, 'x')
    classNameHash.set(hashSum, className)
    //console.log('--new selector #' + (++selectorsCount) + ': ', className)

    styleSheetProcessor.insertRule(className, tag)

    return className
  }

  const addRule = (parentSelector: string, childTagSelector: string): void => {
    const hashSum = styleSheetProcessor.valuesToHashSum()
    if (!hashSum) return

    const selector = parentSelector + ' ' + childTagSelector
    if (classNameHash.has(selector)) return
    //console.log('--new selector #' + (++selectorsCount) + ': ', selector)

    styleSheetProcessor.insertRule(selector, '')
  }

  const setValue = (key: string, value: string, appendToClassSelectorName: boolean = true) => {
    if (value === undefined) return

    styleSheetProcessor.setValue(pseudoClass, key, value, rulePriority, appendToClassSelectorName)
  }

  operator.width = (value: string) => { setValue('width', value) }
  operator.height = (value: string) => { setValue('height', value) }
  operator.minHeight = (value: string) => { setValue('min-height', value) }
  operator.maxHeight = (value: string) => { setValue('max-height', value) }
  operator.minWidth = (value: string) => { setValue('min-width', value) }
  operator.maxWidth = (value: string) => { setValue('max-width', value) }
  operator.left = (value: string) => { setValue('left', value) }
  operator.right = (value: string) => { setValue('right', value) }
  operator.top = (value: string) => { setValue('top', value) }
  operator.bottom = (value: string) => { setValue('bottom', value) }

  operator.paddingLeft = (value: string) => { setValue('padding-left', value) }
  operator.paddingRight = (value: string) => { setValue('padding-right', value) }
  operator.paddingHorizontal = (value: string) => {
    setValue('padding-left', value)
    setValue('padding-right', value)
  }
  operator.paddingTop = (value: string) => { setValue('padding-top', value) }
  operator.paddingBottom = (value: string) => { setValue('padding-bottom', value) }
  operator.paddingVertical = (value: string) => {
    setValue('padding-top', value)
    setValue('padding-bottom', value)
  }
  operator.padding = (value: string) => { setValue('padding', value) }

  operator.layer = (value: string) => { setValue('z-index', value) }
  operator.position = (value: string) => { setValue('position', value) }
  operator.enableOwnScroller = (value: boolean) => { value && setValue('overflow-y', 'auto') }
  operator.disableScroll = (value: boolean) => { value && setValue('overflow', 'hidden') }
  operator.disableHorizontalScroll = (value: boolean) => { value && setValue('overflow-x', 'hidden') }
  operator.disabled = (value: boolean) => { value && setValue('cursor', 'not-allowed') }

  operator.boxSizing = (value: string) => {
    setValue('box-sizing', value)
    setValue('-webkit-box-sizing', value, false)
    setValue('-moz-box-sizing', value, false)
  }

  operator.display = (value: string) => { setValue('display', value) }
  operator.gap = (value: string) => { setValue('gap', value) }
  operator.flexDirection = (value: string) => { setValue('flex-direction', value) }
  operator.flexGrow = (value: string) => { setValue('flex-grow', value) }
  operator.wrap = (value: string) => { value && setValue('flex-wrap', 'wrap') }
  operator.alignItems = (value: string) => { setValue('align-items', value) }
  operator.justifyContent = (value: string) => { setValue('justify-content', value) }
  operator.margin = (value: string) => { setValue('margin', value) }
  operator.marginLeft = (value: string) => { setValue('margin-left', value) }
  operator.marginRight = (value: string) => { setValue('margin-right', value) }
  operator.marginTop = (value: string) => { setValue('margin-top', value) }
  operator.marginBottom = (value: string) => { setValue('margin-bottom', value) }
  operator.marginHorizontal = (value: string) => {
    setValue('margin-left', value)
    setValue('margin-right', value)
  }
  operator.marginVertical = (value: string) => {
    setValue('margin-top', value)
    setValue('margin-bottom', value)
  }

  operator.outline = (value: string | [string, string, string]) => { setValue('outline', Array.isArray(value) ? value.join(' ') : value) }
  operator.bgColor = (value: string) => { setValue('background-color', value) }
  operator.borderColor = (value: string) => { setValue('border', '1px ' + 'solid ' + value) }
  operator.border = (value: string | [string, string, string]) => { setValue('border', Array.isArray(value) ? value.join(' ') : value) }
  operator.borderLeft = (value: string | [string, string, string]) => { setValue('border-left', Array.isArray(value) ? value.join(' ') : value) }
  operator.borderRight = (value: string | [string, string, string]) => { setValue('border-right', Array.isArray(value) ? value.join(' ') : value) }
  operator.borderTop = (value: string | [string, string, string]) => { setValue('border-top', Array.isArray(value) ? value.join(' ') : value) }
  operator.borderBottom = (value: string | [string, string, string]) => { setValue('border-bottom', Array.isArray(value) ? value.join(' ') : value) }
  operator.cornerRadius = (value: string) => { setValue('border-radius', value) }
  operator.opacity = (value: string) => { setValue('opacity', value) }
  operator.shadow = (value: string) => { setValue('box-shadow', value) }
  operator.textShadow = (value: string) => { setValue('text-shadow', value) }
  operator.btnCursor = (value: string) => { setValue('cursor', value ? 'pointer' : 'auto') }

  operator.fontFamily = (value: string) => { setValue('font-family', value) }
  operator.fontSize = (value: string) => { setValue('font-size', value) }
  operator.fontWeight = (value: string) => { setValue('font-weight', value) }
  operator.fontStyle = (value: string) => { setValue('font-style', value) }
  operator.lineHeight = (value: string) => { setValue('line-height', value) }
  operator.letterSpacing = (value: string) => { setValue('letter-spacing', value) }
  operator.textColor = (value: string) => { setValue('color', value) }
  operator.textAlign = (value: string) => { setValue('text-align', value) }
  operator.textDecoration = (value: string) => { setValue('text-decoration', value) }
  operator.transform = (value: string) => { setValue('transform', value) }
  operator.textTransform = (value: string) => { setValue('text-transform', value) }
  operator.whiteSpace = (value: string) => { setValue('white-space', value) }
  operator.caretColor = (value: string) => { setValue('caret-color', value) }
  operator.overflow = (value: string) => { setValue('overflow', value) }
  operator.textOverflow = (value: string) => { setValue('text-overflow', value) }

  operator.bgImageSrc = (value: string) => { setValue('background-image','url(' + value + ')') }
  operator.bgImageRepeat = (value: string) => { setValue('background-repeat', value) }
  operator.bgImageSize = (value: string) => { setValue('background-size', value) }
  operator.bgImageAttachment = (value: string) => { setValue('background-attachment', value) }

  operator.animate = (value: string) => { setValue('transition', value) }
  operator.animateAll = (value: string) => { setValue('transition', 'all ' + value) }

  // HOVER
  operator.hoverState = (fillPropsFunc: (state: StylableComponentProps) => void) => {
    pseudoClass = 'hover'
    const hoverStateProps: any = {}
    fillPropsFunc(hoverStateProps)

    for (const k of [...Object.keys(hoverStateProps)].sort(sortKeys)) {
      if (operator[k]) {
        operator[k](hoverStateProps[k])
      }
    }
    pseudoClass = 'none'
  }

  // FOCUS
  operator.focusState = (fillPropsFunc: (state: StylableComponentProps) => void) => {
    pseudoClass = 'focus'
    const focusStateProps: any = {}
    fillPropsFunc(focusStateProps)
    for (const k of [...Object.keys(focusStateProps)].sort(sortKeys)) {
      if (operator[k]) {
        operator[k](focusStateProps[k])
      }
    }
    pseudoClass = 'none'
  }

  // PLACEHOLDER
  operator.placeholderState = (fillPropsFunc: (state: StylableComponentProps) => void) => {
    pseudoClass = 'placeholder'
    const placeholderProps: any = {}
    fillPropsFunc(placeholderProps)
    for (const k of [...Object.keys(placeholderProps)].sort(sortKeys)) {
      if (operator[k]) {
        operator[k](placeholderProps[k])
      }
    }
    pseudoClass = 'none'
  }

  return { reset, operator, getClassName, addRule }
}

const ruleBuilder = RuleBuilder()

const sortKeys = (a: string, b: string) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export const buildClassName = (props: any, tag = ''): string => {
  const { reset, operator, getClassName } = ruleBuilder
  reset('none', 'high')

  for (const k of [...Object.keys(props)].sort(sortKeys)) {
    if (operator[k]) {
      operator[k](props[k])
    }
    // else {
    //   console.warn("  --NoCSS: Operator «" + k + "» not found!")
    // }
  }
  return getClassName(tag)
}

export const buildRule = (props: any, parentSelector: string, childSelector: string): void => {
  const { reset, operator, addRule } = ruleBuilder
  reset('none', 'low')

  for (const k of [...Object.keys(props)].sort(sortKeys)) {
    if (operator[k]) {
      operator[k](props[k])
    }
  }
  addRule(parentSelector, childSelector)
}

export type BorderStyle = 'solid' | 'dotted' | 'dashed' | 'double' | 'none' | 'hidden'
export interface StylableComponentProps {
  id?: string
  keyValue?: string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  gap?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  padding?: string
  paddingLeft?: string
  paddingRight?: string
  paddingHorizontal?: string
  paddingVertical?: string
  paddingTop?: string
  paddingBottom?: string
  margin?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  marginHorizontal?: string
  marginVertical?: string
  wrap?: boolean
  position?: 'static' | 'absolute' | 'relative' | 'fixed' | 'sticky'
  enableOwnScroller?: boolean
  disableScroll?: boolean
  disableHorizontalScroll?: boolean
  disabled?: boolean
  layer?: string //z-index
  animate?: string //'background-color 300ms'
  animateAll?: string //'300ms'
  textColor?: string
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  textDecoration?: 'none' | 'underline'
  whiteSpace?: 'normal' | 'pre' | 'pre-wrap' | 'nowrap'
  overflow?: 'auto' | 'hidden' | 'clip'
  textOverflow?: 'auto' | 'ellipsis' | 'clip' | 'fade'
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase'
  transform?: string
  bgColor?: string
  borderColor?: string
  border?: string | [string, BorderStyle, string]
  borderLeft?: string | [string, BorderStyle, string]
  borderRight?: string | [string, BorderStyle, string]
  borderTop?: string | [string, BorderStyle, string]
  borderBottom?: string | [string, BorderStyle, string]
  outline?: string | [string, string, string]
  cornerRadius?: string
  opacity?: string
  shadow?: string // offset-x | offset-y | blur-radius | spread-radius | color
  textShadow?: string //offset-x | offset-y | blur-radius | color
  btnCursor?: boolean
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  fontStyle?: 'normal' | 'italic'
  caretColor?: string
  bgImageSrc?: string
  bgImageSize?: 'cover' | 'contain' | 'auto'
  bgImageRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' |'repeat-y' | 'unset' | 'space'
  bgImageAttachment?: 'scroll' | 'fixed' | 'unset' | 'local'
  visible?: boolean
  className?: string
  children?: any
  hoverState?: (state: StylableComponentProps) => void
  onClick?: () => void
  onMouseDown?: (e: any) => void
  onDoubleClick?: (e: any) => void
}

export const stylable = <T, X extends T & StylableComponentProps>(component: (componentProps: T) => React.JSX.Element): ((props: X) => React.JSX.Element) => {
  return (props: X) => {
    const className = buildClassName(props)
    return <div key={props.keyValue}
                id={props.id}
                className={props.className ? props.className + ' ' + className : className}>{component(props)}
    </div>
  }
}
