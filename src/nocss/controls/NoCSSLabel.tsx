import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager"
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView"
import {Label} from "../../lib/components";

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const NoCSSLabel = ({ theme }: { theme: GlobalTheme }) => {
  return <NoCSSControlView controlLink='label'
                           theme={theme}
                           title='Label'
                           subTitle='<p> | <h1> | <h2> | <h3> | <h4> | <h5> | <h6>'>

    <MarkdownBlock title="1. Basic properties"
                   markdown1={colorsNoCSSTxt}
                   theme={theme}>
      <Label className='def'
             fontSize='18px'
             text='Abyssus abyssum invocat'
             padding='20px'
             textColor='#ffFFff'
             bgColor='#3a7c7b'
             cornerRadius='5px'
             borderColor='#57bfbe'/>
    </MarkdownBlock>

    <MarkdownBlock title="2. Multiline text"
                   markdown1={multilineNoCSSTxt}
                   theme={theme}>
      <Label className='def'
             text={loremIpsum}
             width='500px'
             fontSize='14px'
             textAlign='left'
             padding='20px'
             textColor='#57bfbe'
             borderLeft='5px solid #57bfbe'/>
    </MarkdownBlock>

    <MarkdownBlock title="3. Headers"
                   markdown1={headersNoCSSTxt}
                   theme={theme}>
      <Label type='h1' text='h1'/>
      <Label type='h2' text='h2'/>
      <Label type='h3' text='h3'/>
      <Label type='h4' text='h4'/>
      <Label type='h5' text='h5'/>
      <Label type='h6' text='h6'/>
      <Label type='p' text='p'/>
    </MarkdownBlock>

  </NoCSSControlView>
}

/*
==============================
Colors
==============================
*/

const multilineNoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <Label text={loremIpsum}
           width='500px'
           fontSize='14px'
           textAlign='left'
           padding='20px'
           textColor='#57bfbe'
           borderLeft='5px solid #57bfbe'/>
  )
}
\`\`\``

/*
==============================
Colors
==============================
*/

const colorsNoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <Label text='Abyssus abyssum invocat'
           fontSize='18px'
           padding='20px'
           textColor='#ffFFff'
           bgColor='#3a7c7b'
           borderColor='#57bfbe'
           cornerRadius='5px'/>
  )
}
\`\`\``

/*
==============================
Headers
==============================
*/

const headersNoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <Label type='h1' text='h1' textColor='#c7d7e5'/>
    <Label type='h2' text='h2' textColor='#c2b99f'/>
    <Label type='h3' text='h3' textColor='#a4887e'/>
    <Label type='h4' text='h4' textColor='#ab9b4d'/>
    <Label type='h5' text='h5' textColor='#8064c7'/>
    <Label type='h6' text='h6' textColor='#626b75'/>
    <Label type='p'  text='p'  textColor='#86b3c7'/>
  )
}
\`\`\``
