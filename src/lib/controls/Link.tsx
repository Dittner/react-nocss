import * as React from 'react'
import {buildClassName, StylableComponentProps} from "../NoCSS";
import {NavLink} from "react-router-dom";

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
