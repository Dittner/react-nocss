import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {useState} from "react";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {Button, ButtonProps} from "../../lib/NoCSSComponents";
import {Label} from "../../lib/NoCSSComponents";

export const NoCSSButton = ({ theme }: { theme: GlobalTheme }) => {
  console.log('new NoCSSButton')
  const [isSelected, setSelected] = useState(true)

  return <NoCSSControlView controlLink='button'
                           theme={theme}
                           title='Button'
                           subTitle='<button>'>

    <MarkdownBlock title="1. Default and custom button"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>
      <Button title='Template'/>

      <Button title='Template Disabled'
              disabled/>

      <Button title='Custom Btn'
              textColor='#ebcdef'
              bgColor='#8851ae'
              paddingHorizontal='12px'
              cornerRadius='5px'
              borderColor='#8851ae'
              hoverState={state => {
                state.bgColor = '#673e83'
              }}/>

      <Button title='Custom Btn Disabled'
              textColor='#ff0000'
              bgColor='#ff0000'
              paddingHorizontal='12px'
              cornerRadius='5px'
              borderColor='#ff0000'
              hoverState={state => {
                state.bgColor = '#ff0000'
              }}
              disabledState={state => {
                state.opacity = '1'
                state.bgColor = '0'
                state.textColor = '#888888'
                state.borderColor = '#888888'
              }}
              disabled/>

    </MarkdownBlock>

    <MarkdownBlock title="2. Selectable button"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>
      <Button title='Selectable Template Btn'
              isSelected={isSelected}
              onClick={() => {
                setSelected(!isSelected)
              }}/>

      <Button title='Selectable Custom Btn'
              isSelected={isSelected}
              textColor='#ebcdef'
              bgColor='#8851ae'
              paddingHorizontal='12px'
              cornerRadius='5px'
              borderColor='#8851ae'
              hoverState={state => {
                state.bgColor = '#673e83'
              }}
              selectedState={state => {
                state.borderColor = '#ebcdef'
                state.bgColor = '#673e83'
              }}
              onClick={() => {
                setSelected(!isSelected)
              }}/>

      <Label width='100%'
             textAlign='right'
             text={isSelected ? 'Selected' : 'Not selected'}
             textColor={isSelected ? '#dca83a' : '#888888'}/>

    </MarkdownBlock>

    <MarkdownBlock title="3. Title with icon"
                   markdown1={block3NoCSSTxt}
                   theme={theme}>

      <Button textColor='#ebcdef'
              bgColor='#8851ae'
              paddingHorizontal='12px'
              cornerRadius='5px'
              borderColor='#8851ae'
              hoverState={state => {
                state.bgColor = '#673e83'
              }}>
        <span className="icon-download"/>
        <span>  Download</span>
      </Button>

    </MarkdownBlock>

    <MarkdownBlock title="4. Inheritance"
                   markdown1={block4NoCSSTxt}
                   theme={theme}>
      <Btn title='Btn'/>
      <SBtn title='S-Btn'/>
      <MBtn title='M-Btn'/>
      <LBtn title='L-Btn'/>
      <XLBtn title='XL-Btn'/>
    </MarkdownBlock>
  </NoCSSControlView>
}

const Btn = (props: ButtonProps) => {
  return (
    <Button textColor='#9d21ae'
            bgColor='0'
            fontSize='14px'
            paddingHorizontal='none'
            padding='8px'
            hoverState={state => {
              state.textDecoration = 'underline'
            }}
            {...props}/>
  )
}

const SBtn = (props: ButtonProps) => {
  return (
    <Btn textColor='#ebcdef'
         bgColor='#8851ae'
         cornerRadius='5px'
         borderColor='#8851ae'
         hoverState={state => {
           state.bgColor = '#673e83'
         }}
         {...props}/>
  )
}

const MBtn = (props: ButtonProps) => {
  return (
    <SBtn fontSize='18px'
          padding='12px'
          {...props}/>
  )
}

const LBtn = (props: ButtonProps) => {
  return (
    <MBtn textColor='#ffFFff'
          fontSize='24px'
          padding='20px'
          {...props}/>
  )
}

const XLBtn = (props: ButtonProps) => {
  return (
    <LBtn fontSize='32px'
          padding='32px'
          bgColor='#ae51a9'
          hoverState={state => {
            state.bgColor = '#874083'
          }}
          {...props}/>
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
    <Button title='Template'/>

    <Button title='Template Disabled'
            disabled/>

    <Button title='Custom Btn'
            textColor='#ebcdef'
            bgColor='#8851ae'
            paddingHorizontal='12px'
            cornerRadius='5px'
            borderColor='#8851ae'
            hoverState={state => {
              state.bgColor = '#673e83'
            }}/>

    <Button title='Custom Btn Disabled'
            textColor='#ff0000'
            bgColor='#ff0000'
            paddingHorizontal='12px'
            cornerRadius='5px'
            borderColor='#ff0000'
            hoverState={state => {
              state.bgColor = '#ff0000'
            }}
            disabledState={state => {
              state.opacity = '1'
              state.bgColor = '0'
              state.textColor = '#888888'
              state.borderColor = '#888888'
            }}
            disabled/>
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
  const [isSelected, setSelected] = useState(true)
  return (
    <Button title='Selectable Template Btn'
            isSelected={isSelected}
            onClick={() => {
              setSelected(!isSelected)
            }}/>

    <Button title='Selectable Custom Btn'
            isSelected={isSelected}
            textColor='#ebcdef'
            bgColor='#8851ae'
            paddingHorizontal='12px'
            cornerRadius='5px'
            borderColor='#8851ae'
            hoverState={state => {
              state.bgColor = '#673e83'
            }}
            selectedState={state => {
              state.borderColor = '#ebcdef'
              state.bgColor = '#673e83'
            }}
            onClick={() => {
              setSelected(!isSelected)
            }}/>

    <Label width='100%'
           textAlign='right'
           text={isSelected ? 'Selected' : 'Not selected'}
           textColor={isSelected ? '#dca83a' : '#888888'}/>
  )
}
\`\`\``
/*
==============================
Block 3
==============================
*/

const block3NoCSSTxt = `\`\`\`tsx
const App = () => {
  return (
    <Button textColor='#ebcdef'
            bgColor='#8851ae'
            paddingHorizontal='12px'
            cornerRadius='5px'
            borderColor='#8851ae'
            hoverState={state => {
              state.bgColor = '#673e83'
            }}>
      <span className="icon-download"/>
      <span>  Download</span>
    </Button>
  )
}
\`\`\``

/*
==============================
Block 4
==============================
*/

const block4NoCSSTxt = `\`\`\`tsx
const Btn = (props: ButtonProps) => {
  return (
    <Button textColor='#ebcdef'
            bgColor='0'
            paddingHorizontal='none'
            padding='8px'
            fontSize='14px'
            hoverState={state => {
              state.textDecoration = 'underline'
            }}
            {...props}/>
  )
}

const SBtn = (props: ButtonProps) => {
  return (
    <Btn bgColor='#8851ae'
         cornerRadius='5px'
         borderColor='#8851ae'
         hoverState={state => {
           state.bgColor = '#673e83'
         }}
         {...props}/>
  )
}

const MBtn = (props: ButtonProps) => {
  return (
    <SBtn fontSize='18px'
          padding='12px'
          {...props}/>
  )
}

const LBtn = (props: ButtonProps) => {
  return (
    <MBtn textColor='#ffFFff'
          fontSize='24px'
          padding='20px'
          {...props}/>
  )
}

const XLBtn = (props: ButtonProps) => {
  return (
    <LBtn fontSize='32px'
          padding='32px'
          bgColor='#ae51a9'
          hoverState={state => {
            state.bgColor = '#874083'
          }}
          {...props}/>
  )
}

const App = () => {
  return (
    <Btn title='Btn'/>
    <SBtn title='S-Btn'/>
    <MBtn title='M-Btn'/>
    <LBtn title='L-Btn'/>
    <XLBtn title='XL-Btn'/>
  )
}
\`\`\``
