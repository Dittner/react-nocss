import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";

/*
*
* LABEL
*
* */

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
