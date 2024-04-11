import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {HStack, Label, Spacer, VStack} from "../../lib/NoCSSComponents";

export const NoCSSSpacer = ({ theme }: { theme: GlobalTheme }) => {
  console.log('new NoCSSSpacer')
  return <NoCSSControlView controlLink='spacer'
                           theme={theme}
                           title='Spacer'
                           subTitle='<div>'>

    <MarkdownBlock title="1. Precise alignment"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>
      <VStack halign='center'
              valign='center'
              gap='0'
              bgColor='#3a7c7b'
              width='500px'
              height='250px'>
        <BlackBox title='1'/>

        <HStack halign='center'
                valign='center'
                gap='0'
                width='100%'>
          <BlackBox title='1'/>
          <Spacer width='40px'/>
          <BlackBox title='1'/>
        </HStack>

        <HStack halign='center'
                valign='center'
                gap='0'
                width='100%'>
          <Spacer width='40px'/>
          <BlackBox title='1'/>
          <Spacer width='40px'/>
          <BlackBox title='2'/>
          <Spacer width='40px'/>
          <BlackBox title='1'/>
          <Spacer width='40px'/>
        </HStack>

        <HStack halign='center'
                valign='center'
                gap='0'
                width='100%'>
          <BlackBox title='1'/>
          <Spacer width='40px'/>
          <BlackBox title='3'/>
          <Spacer width='40px'/>
          <BlackBox title='3'/>
          <Spacer width='40px'/>
          <BlackBox title='1'/>
        </HStack>
      </VStack>
    </MarkdownBlock>

    <MarkdownBlock title="2. Flexible alignment"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>
      <VStack valign='center'
              bgColor='#3a7c7b'
              width='500px'
              height='250px'
              padding='20px'>
        <HStack width='100%'>
          <BlackBox title='1'/>
          <BlackBox title='2'/>
          <BlackBox title='3'/>
          <BlackBox title='4'/>
          <Spacer/>
          <BlackBox title='5'/>
        </HStack>

        <HStack width='100%'>
          <BlackBox title='1'/>
          <BlackBox title='2'/>
          <Spacer/>
          <BlackBox title='3'/>
          <Spacer/>
          <BlackBox title='4'/>
          <BlackBox title='5'/>
        </HStack>

        <HStack width='100%'>
          <BlackBox title='1'/>
          <Spacer/>
          <BlackBox title='2'/>
          <Spacer/>
          <BlackBox title='3'/>
          <Spacer/>
          <BlackBox title='4'/>
          <Spacer/>
          <BlackBox title='5'/>
        </HStack>
      </VStack>
    </MarkdownBlock>
  </NoCSSControlView>
}

const BlackBox = ({ title }: { title: string }) => {
  return (
    <Label text={title}
           width='40px'
           paddingVertical='10px'
           textAlign='center'
           textColor='#8cbfbe'
           bgColor='#212628'/>
  )
}

/*
==============================
Block 1
==============================
*/

const block1NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <VStack halign='center'
            valign='center'
            gap='0'
            bgColor='#3a7c7b'
            width='500px'
            height='250px'>
      <BlackBox title='1'/>

      <HStack halign='center'
              valign='center'
              gap='0'
              width='100%'>
        <BlackBox title='1'/>
        <Spacer width='40px'/>
        <BlackBox title='1'/>
      </HStack>

      <HStack halign='center'
              valign='center'
              gap='0'
              width='100%'>
        <Spacer width='40px'/>
        <BlackBox title='1'/>
        <Spacer width='40px'/>
        <BlackBox title='2'/>
        <Spacer width='40px'/>
        <BlackBox title='1'/>
        <Spacer width='40px'/>
      </HStack>

      <HStack halign='center'
              valign='center'
              gap='0'
              width='100%'>
        <BlackBox title='1'/>
        <Spacer width='40px'/>
        <BlackBox title='3'/>
        <Spacer width='40px'/>
        <BlackBox title='3'/>
        <Spacer width='40px'/>
        <BlackBox title='1'/>
      </HStack>
    </VStack>
  )
}

const BlackBox = ({ title }: { title: string }) => {
  return (
    <Label text={title}
           width='40px'
           paddingVertical='10px'
           textAlign='center'
           textColor='#8cbfbe'
           bgColor='#212628'/>
  )
}
\`\`\``

/*
==============================
Block 2
==============================
*/

const block2NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <VStack valign='center'
            bgColor='#3a7c7b'
            width='500px'
            height='250px'
            padding='20px'>
      <HStack width='100%'>
        <BlackBox title='1'/>
        <BlackBox title='2'/>
        <BlackBox title='3'/>
        <BlackBox title='4'/>
        <Spacer/>
        <BlackBox title='5'/>
      </HStack>

      <HStack width='100%'>
        <BlackBox title='1'/>
        <BlackBox title='2'/>
        <Spacer/>
        <BlackBox title='3'/>
        <Spacer/>
        <BlackBox title='4'/>
        <BlackBox title='5'/>
      </HStack>

      <HStack width='100%'>
        <BlackBox title='1'/>
        <Spacer/>
        <BlackBox title='2'/>
        <Spacer/>
        <BlackBox title='3'/>
        <Spacer/>
        <BlackBox title='4'/>
        <Spacer/>
        <BlackBox title='5'/>
      </HStack>
    </VStack>
  )
}

const BlackBox = ({ title }: { title: string }) => {
  return (
    <Label text={title}
           width='40px'
           paddingVertical='10px'
           textAlign='center'
           textColor='#8cbfbe'
           bgColor='#212628'/>
  )
}
\`\`\``
