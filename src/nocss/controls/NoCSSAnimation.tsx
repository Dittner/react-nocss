import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {Button} from "../../lib/controls/Button";

export const NoCSSAnimation = ({ theme }: { theme: GlobalTheme }) => {
  console.log('new NoCSSAnimation')

  return <NoCSSControlView controlLink='animation'
                           theme={theme}
                           title='Animation'
                           subTitle='<button>'>

    <MarkdownBlock title="1. Transition of a button's state"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>

      <Button title='Animate all properties'
              textColor='#ebcdef'
              bgColor='#cc4da3'
              paddingHorizontal='12px'
              cornerRadius='5px'
              animateAll='1s'
              height='50px'
              width='250px'
              hoverState={state => {
                state.bgColor = '#6f3feb'
                state.width = '500px'
              }}/>

    </MarkdownBlock>

    <MarkdownBlock title="2. Animate a definite property"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>

      <Button title='Animate only background'
              textColor='#ebcdef'
              bgColor='#cc4da3'
              paddingHorizontal='12px'
              cornerRadius='5px'
              animate='background-color 300ms'
              height='50px'
              width='250px'
              hoverState={state => {
                state.bgColor = '#6f3feb'
                state.width = '500px'
              }}/>

    </MarkdownBlock>

  </NoCSSControlView>
}

const block1NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
      <Button title='Animate all properties'
              textColor='#ebcdef'
              bgColor='#cc4da3'
              paddingHorizontal='12px'
              cornerRadius='5px'
              animateAll='1s'
              height='50px'
              width='250px'
              hoverState={state => {
                state.bgColor = '#6f3feb'
                state.width = '500px'
              }}/>
  )
}
\`\`\``

const block2NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
      <Button title='Animate only background'
              textColor='#ebcdef'
              bgColor='#cc4da3'
              paddingHorizontal='12px'
              cornerRadius='5px'
              animate='background-color 300ms'
              height='50px'
              width='250px'
              hoverState={state => {
                state.bgColor = '#6f3feb'
                state.width = '500px'
              }}/>
  )
}
\`\`\``
