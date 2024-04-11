import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {Label} from "../../lib/NoCSSComponents";
import {stylable} from "../../lib/NoCSS";

export const NoCSSStylableComponent = ({theme}: { theme: GlobalTheme }) => {
  console.log('new NoCSSStylableComponent')
  return <NoCSSControlView controlLink='stylable'
                           theme={theme}
                           title='Stylable Component'
                           subTitle='<div>'>

    <MarkdownBlock title="1. We can attach a style to a UIComponent only in a react-function by default"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>
      <UIComponent title='This interface offers only a title-property'/>
    </MarkdownBlock>

    <MarkdownBlock title="2. Stylable-wrapper can help decorate a UIComponent"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>
      <StylableUIComponent title='Stylable UIComponent'
                           padding='50px'
                           border='20px solid #8851ae'
                           cornerRadius='10px'
                           bgColor='#874083'/>
    </MarkdownBlock>
  </NoCSSControlView>
}

const UIComponent = ({title}: { title: string }) => {
  return (
    <Label text={title}
           textColor='#ccd7da'
           borderBottom='2px solid #ccd7da'/>
  )
}


const StylableUIComponent = stylable(({title}: { title: string }) => {
  return (
    <Label text={title}
           textColor='#ccd7da'
           borderBottom='2px solid #ccd7da'/>
  )
})


/*
==============================
Block 1
==============================
*/

const block1NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <UIComponent title='This interface offers only a title-property'/>
  )
}

const UIComponent = ({title}: { title: string }) => {
  return (
    <Label text={title}
           textColor='#ccd7da'
           borderBottom='2px solid #ccd7da'/>
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
    <StylableUIComponent title='Stylable UIComponent'
                         padding='50px'
                         border='20px solid #8851ae'
                         cornerRadius='10px'
                         bgColor='#874083'/>
  )
}

const StylableUIComponent = stylable(({title}: { title: string }) => {
  return (
    <Label text={title}
           textColor='#ccd7da'
           borderBottom='2px solid #ccd7da'/>
  )
})
\`\`\``
