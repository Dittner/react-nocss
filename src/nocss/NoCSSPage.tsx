import * as React from 'react'
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import { NoCSSLabel } from './controls/NoCSSLabel'
import { NoCSSButton } from './controls/NoCSSButton'
import { NoCSSContainer } from './controls/NoCSSContainer'
import { NoCSSSpacer } from './controls/NoCSSSpacer'
import { NoCSSInput } from './controls/NoCSSInput'
import ReactMarkdown from 'react-markdown'
import { NoCSSAnimation } from './controls/NoCSSAnimation'
import { useLocation } from 'react-router-dom'
import {VStack} from "../lib/controls/Container";
import {themeManager} from "./ThemeManager";
import {stylable} from "../lib/NoCSS";
import {NoCSSControlLinkList} from "./NoCSSControlLinkList";
import {NoCSSStylableComponent} from "./controls/NoCSSStylableComponent";
import {Image} from "../lib/controls/Image";
import {NoCSSImage} from "./controls/NoCSSImage";

export type ControlLink = 'intro' | 'label' | 'button' | 'container' | 'spacer' | 'input' | 'animation' | 'stylable' | 'image'
export const noCSSControlLinks = Array.of<ControlLink>('label', 'button', 'container', 'spacer', 'input', 'animation', 'stylable', 'image')

export const NoCSSPage = () => {
  console.log('new NoCSSPage')
  const theme = themeManager.theme
  const {
    pathname,
    hash,
    key
  } = useLocation()

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0)
    } else {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const elementPos = Math.round(element.getBoundingClientRect().top + document.documentElement.scrollTop)
          // element.scrollIntoView();
          console.log('elementPos=', elementPos)
          window.scrollTo(0, elementPos < 100 ? 0 : elementPos - 100)
        }
      }, 0)
    }
  }, [pathname, hash, key])

  return <VStack width="100%"
                 height="100%"
                 halign="center"
                 valign="center"
                 paddingVertical='50px'
                 gap="20px"
                 disableHorizontalScroll>
    <NoCSSControlLinkList/>
    <NoCSSLabel theme={theme}/>
    <NoCSSButton theme={theme}/>
    <NoCSSContainer theme={theme}/>
    <NoCSSSpacer theme={theme}/>
    <NoCSSInput theme={theme}/>
    <NoCSSAnimation theme={theme}/>
    <NoCSSStylableComponent theme={theme}/>
    <NoCSSImage theme={theme}/>
  </VStack>
}

//TODO Do not remove MarkdownText: the reference on Prism.js is necessary for subpages
export const MarkdownText = stylable(({ value }: { value: string }) => {
  useEffect(() => {
    console.log('--Prism.highlightAll')
    Prism.highlightAll()
  }, [value])
  return <ReactMarkdown className={themeManager.theme.id} key={value}>{value}</ReactMarkdown>
})
