import * as React from 'react'
import {ControlLink, MarkdownText} from "../NoCSSPage";
import {GlobalTheme} from "../ThemeManager";
import {HStack, Label, Spacer, VStack} from "../../lib/NoCSSComponents";

export interface NoCSSControlViewProps {
  title: string
  subTitle: string
  controlLink: ControlLink
  theme: GlobalTheme
  children: any
}

export const NoCSSControlView = (props: NoCSSControlViewProps) => {
  console.log('new NoCSSControlView, controlLink: ' + props.controlLink)
  const theme = props.theme

  return (
    <VStack id={'#' + props.controlLink}
            width="100%" maxWidth={theme.maxContentWidth}
            padding='20px'
            height="100%"
            halign="center"
            valign="top"
            gap="20px"
            disableHorizontalScroll>

      <VStack halign='center' valign='top'
              width="100%" gap='5px'>

        <Label className='h2'
               text={props.title}
               padding='10px'
               width={theme.maxContentWidth}
               textAlign='center'
               fontWeight='600'
               textTransform='uppercase'
               fontSize='2.5rem'
               bgColor={theme.orange}
               textColor={theme.black}/>

        <Label className='p'
               text={props.subTitle}
               width='100%'
               paddingBottom='20px'
               textColor={theme.text50}/>

        {props.children}

      </VStack>
    </VStack>
  )
}

interface MarkdownBlockProps {
  title: string
  markdown1: string
  markdown2?: string
  theme: GlobalTheme
  children: any
}

export const MarkdownBlock = (props: MarkdownBlockProps) => {
  console.log('new MarkdownBlock')

  return (
    <VStack halign="stretch"
            valign="top" gap='0'
            paddingBottom='50px'
            width="100%">
      <Label type="h2"
             width="100%"
             text={props.title}
             textColor={props.theme.orange}
             fontWeight='600'
             minWidth="150px"/>

      <Spacer height="40px"/>

      <HStack className='markdown dark'
              halign='left'
              valign='center'>
        {props.children}
      </HStack>

      <MarkdownText value={props.markdown1}
                    width="100%"/>

      {props.markdown2 &&
        <MarkdownText value={props.markdown2}
                      width="100%"/>
      }
    </VStack>
  )
}
