import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {useState} from "react";
import {
  Button,
  HStack,
  Label,
  Rectangle,
  StackHAlign,
  StackProps,
  StackVAlign,
  VStack
} from "../../lib/components";
import {GlobalTheme} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";



export const NoCSSContainer = ({ theme }: { theme: GlobalTheme }) => {
  const [valign, setValign] = useState<StackVAlign>('center')
  const [halign, setHalign] = useState<StackHAlign>('center')
  const valignValues = Array.of<StackVAlign>('top', 'center', 'bottom', 'stretch')
  const halignValues = Array.of<StackHAlign>('left', 'center', 'right', 'stretch')
  const [layout, setLayout] = useState<StackLayout>('horizontal')

  const switchLayout = () => {
    if (layout === 'horizontal') { setLayout('vertical') } else { setLayout('horizontal') }
  }

  return <NoCSSControlView controlLink='container'
                           theme={theme}
                           title='Container'
                           subTitle='<div>'>

    <MarkdownBlock title="1. VStack"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>
      <VStack halign='stretch'
              valign='top'
              gap='10px'
              width='150px'>
        <Label text='Horizontal alignment:'
               textColor={theme.text50}/>

        {halignValues.map(align => {
          return <Button key={align}
                         title={align}
                         isSelected={halign === align}
                         onClick={() => {
                           setHalign(align)
                         }}/>
        })}
      </VStack>

      <VStack halign='stretch'
              valign='top'
              gap='10px'
              width='150px'>
        <Label text='Vertical alignment:'
               textColor={theme.text50}/>

        {valignValues.map(align => {
          return <Button key={align}
                         title={align}
                         isSelected={valign === align}
                         onClick={() => {
                           setValign(align)
                         }}/>
        })}
      </VStack>

      <VStack halign={halign}
              valign={valign}
              gap='10px'
              width='300px'
              height='250px'
              marginHorizontal='20px'
              bgColor='#3a7c7b'>
        <BlackBox/>
        <BlackBox/>
        <BlackBox/>
      </VStack>

    </MarkdownBlock>

    <MarkdownBlock title="2. HStack"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>
      <VStack halign='stretch'
              valign='top'
              gap='10px'
              width='150px'>
        <Label text='Horizontal alignment:'
               textColor={theme.text50}/>

        {halignValues.map(align => {
          return <Button key={align}
                         title={align}
                         isSelected={halign === align}
                         onClick={() => {
                           setHalign(align)
                         }}/>
        })}
      </VStack>

      <VStack halign='stretch'
              valign='top'
              gap='10px'
              width='150px'>
        <Label text='Vertical alignment:'
               textColor={theme.text50}/>

        {valignValues.map(align => {
          return <Button key={align}
                         title={align}
                         isSelected={valign === align}
                         onClick={() => {
                           setValign(align)
                         }}/>
        })}
      </VStack>

      <HStack halign={halign}
              valign={valign}
              gap='10px'
              width='300px'
              height='250px'
              marginHorizontal='20px'
              bgColor='#3a7c7b'>
        <BlackBox/>
        <BlackBox/>
        <BlackBox/>
      </HStack>

    </MarkdownBlock>

    <MarkdownBlock title="3. How can we change a stack alignment at runtime?"
                   markdown1={block3NoCSSTxt}
                   theme={theme}>

      <VStack width='300px'>
        <Stack layout={layout}
               halign='center'
               valign='center'
               width='100%'
               height='250px'
               bgColor='#3a7c7b'>
          <BlackBox/>
          <BlackBox/>
          <BlackBox/>
        </Stack>

        <Button title='Switch alignment'
                width='100%'
                onClick={switchLayout}/>
      </VStack>
    </MarkdownBlock>

  </NoCSSControlView>
}

const BlackBox = () => {
  return (
    <Rectangle bgColor='#212628' padding='25px'/>
  )
}

type StackLayout = 'horizontal' | 'vertical'

interface LayoutProps extends StackProps {
  layout: StackLayout
}

const Stack = (props: LayoutProps) => {
  if (props.layout === 'horizontal') {
    return <HStack {...props}>{props.children}</HStack>
  } else {
    return <VStack {...props}>{props.children}</VStack>
  }
}

/*
==============================
Block 1
==============================
*/

const block1NoCSSTxt = `\`\`\`tsx
const App = () => {
  const [valign, setValign] = useState<StackVAlign>('center')
  const [halign, setHalign] = useState<StackHAlign>('center')
  const valignValues = Array.of<StackVAlign>('top', 'center', 'bottom', 'stretch')
  const halignValues = Array.of<StackHAlign>('left', 'center', 'right', 'stretch')
  
  return (
    <VStack halign='stretch' 
            valign='top' 
            gap='10px'
            width='150px'>
      <Label text='Horizontal alignment:'
             textColor='#626b75'/>

      {halignValues.map(align => {
        return <Button key={align}
                       title={align}
                       isSelected={halign === align}
                       onClick={() => {setHalign(align)}}/>
      })}
    </VStack>

    <VStack halign='stretch' 
            valign='top' 
            gap='10px'
            width='150px'>
      <Label text='Vertical alignment:'
             textColor='#626b75'/>

      {valignValues.map(align => {
        return <Button key={align}
                       title={align}
                       isSelected={valign === align}
                       onClick={() => {setValign(align)}}/>
      })}
    </VStack>

    <VStack halign={halign} 
            valign={valign} 
            gap='10px'
            width='300px' 
            height='250px' 
            marginHorizontal='20px'
            bgColor='#3a7c7b'>
      <BlackBox/>
      <BlackBox/>
      <BlackBox/>
    </VStack>
  )
}

const BlackBox = () => {
  return (
    <Rectangle bgColor='#212628' padding='25px'/>
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
  const [valign, setValign] = useState<StackVAlign>('center')
  const [halign, setHalign] = useState<StackHAlign>('center')
  const valignValues = Array.of<StackVAlign>('top', 'center', 'bottom', 'stretch')
  const halignValues = Array.of<StackHAlign>('left', 'center', 'right', 'stretch')
  
  return (
    <VStack halign='stretch' 
            valign='top' 
            gap='10px'
            width='150px'>
      <Label text='Horizontal alignment:'
             textColor='#626b75'/>

      {halignValues.map(align => {
        return <Button key={align}
                       title={align}
                       isSelected={halign === align}
                       onClick={() => {setHalign(align)}}/>
      })}
    </VStack>

    <VStack halign='stretch' 
            valign='top' 
            gap='10px'
            width='150px'>
      <Label text='Vertical alignment:'
             textColor='#626b75'/>

      {valignValues.map(align => {
        return <Button key={align}
                       title={align}
                       isSelected={valign === align}
                       onClick={() => {setValign(align)}}/>
      })}
    </VStack>

    <HStack halign={halign} 
            valign={valign} 
            gap='10px'
            width='300px' 
            height='250px' 
            marginHorizontal='20px'
            bgColor='#3a7c7b'>
      <BlackBox/>
      <BlackBox/>
      <BlackBox/>
    </HStack>
  )
}
\`\`\``

/*
==============================
Block 3
==============================
*/

const block3NoCSSTxt = `\`\`\`tsx
type StackLayout = 'horizontal' | 'vertical'
interface LayoutProps extends StackProps {
  layout: StackLayout
}

const Stack = (props: LayoutProps) => {
  if (props.layout === 'horizontal') {
    return <HStack {...props}>{props.children}</HStack>
  } else {
    return <VStack {...props}>{props.children}</VStack>
  }
}

const App = () => {
  const [layout, setLayout] = useState<StackLayout>('horizontal')
  
  const switchLayout = () => {
    if (layout === 'horizontal') 
      setLayout('vertical')
    else 
      setLayout('horizontal')
  }
  
  return (
    <VStack width='300px'>
      <Stack layout={layout}
             halign='center'
             valign='center'
             width='100%'
             height='250px'
             bgColor='#3a7c7b'>
        <BlackBox/>
        <BlackBox/>
        <BlackBox/>
      </Stack>

      <Button title='Switch alignment'
              width='100%'
              onClick={switchLayout}/>
    </VStack>
  )
}
\`\`\``
