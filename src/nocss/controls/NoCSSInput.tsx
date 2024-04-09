import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {useState} from "react";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {HStack, VStack} from "../../lib/controls/Container";
import {Label} from "../../lib/controls/Label";
import {TextArea, TextInput, TextInputProps} from "../../lib/controls/Input";


export const NoCSSInput = ({theme}: { theme: GlobalTheme }) => {
  console.log('new NoCSSInput')
  const [enteredName, setEnteredName] = useState('')
  const [enteredPwd, setEnteredPwd] = useState('')
  const [nameProtocol] = useState({value: ''})
  const [pwdProtocol] = useState({value: ''})

  const submit = () => {
    setEnteredName(nameProtocol.value)
    setEnteredPwd(pwdProtocol.value)
  }

  return <NoCSSControlView controlLink='input'
                           theme={theme}
                           title='Input'
                           subTitle='<input> | <textarea>'>

    <MarkdownBlock title="1. TextInput"
                   markdown1={block1NoCSSTxt}
                   theme={theme}>
      <VStack>
        <HStack valign='base'>
          <Label text='Login:'
                 width='150px'
                 textColor='#626b75'/>

          <CustomInput placeholder='Enter your name'
                       protocol={nameProtocol}
                       onSubmitted={submit}/>

          <Label text={enteredName}
                 textColor='#dca83a'/>
        </HStack>

        <HStack valign='base'>
          <Label text='Password:'
                 width='150px'
                 textColor='#626b75'/>

          <CustomInput type='password'
                       protocol={pwdProtocol}
                       placeholder='Enter password'
                       onSubmitted={submit}/>

          <Label text={enteredPwd}
                 textColor='#dca83a'/>
        </HStack>
      </VStack>

    </MarkdownBlock>

    <MarkdownBlock title="2. TextArea"
                   markdown1={block2NoCSSTxt}
                   theme={theme}>

      <CustomTextArea/>

    </MarkdownBlock>
  </NoCSSControlView>
}

export const CustomTextArea = (props: TextInputProps) => {
  const [numOfSymbols, setNumOfSymbols] = useState(0)
  const onTextAreaChanged = (value: string) => {
    setNumOfSymbols(value.length)
  }
  return (
    <HStack valign='bottom'>
      <TextArea width='400px'
                placeholder='Enter multiline text'
                textColor='#ffFFff'
                caretColor='#ffFFff'
                bgColor='#181e20'
                rows={7}
                borderColor='#35414a'
                padding='10px'
                cornerRadius='5px'
                focusState={state => {
                  state.borderColor = '#5b9dcf'
                  state.bgColor = '#151a1c'
                }}
                placeholderState={state => {
                  state.textColor = '#ffFFff50'
                }}
                onChange={onTextAreaChanged}
                {...props}/>

      <Label text={numOfSymbols > 0 ? numOfSymbols + ' symbols' : ''}
             textColor='#dca83a'/>
    </HStack>
  )
}

export const CustomInput = (props: TextInputProps) => {
  return (
    <TextInput width='200px'
               textColor='#ffFFff'
               caretColor='#ffFFff'
               bgColor='#181e20'
               borderColor='#35414a'
               padding='10px'
               cornerRadius='5px'
               focusState={state => {
                 state.borderColor = '#5b9dcf'
                 state.bgColor = '#151a1c'
               }}
               placeholderState={state => {
                 state.textColor = '#ffFFff50'
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
  const [enteredName, setEnteredName] = useState('')
  const [enteredPwd, setEnteredPwd] = useState('')
  const [nameProtocol] = useState({ value: '' })
  const [pwdProtocol] = useState({ value: '' })

  const submit = () => {
    setEnteredName(nameProtocol.value)
    setEnteredPwd(pwdProtocol.value)
  }
  
  return (
    <VStack>
      <HStack valign='base'>
        <Label text='Login:'
               width='150px'
               textColor='#626b75'/>

        <CustomInput placeholder='Enter your name'
                     protocol={nameProtocol}
                     onSubmitted={submit}/>

        <Label text={enteredName}
               textColor='#dca83a'/>
      </HStack>

      <HStack valign='base'>
        <Label text='Password:'
               width='150px'
               textColor='#626b75'/>

        <CustomInput type='password'
                     protocol={pwdProtocol}
                     placeholder='Enter password'
                     onSubmitted={submit}/>

        <Label text={enteredPwd}
               textColor='#dca83a'/>
      </HStack>
    </VStack>
  )
}

export const CustomInput = (props: InputProps) => {
  return (
    <TextInput width='200px'
               textColor='#ffFFff'
               caretColor='#ffFFff'
               bgColor='#181e20'
               borderColor='#35414a'
               padding='10px'
               cornerRadius='5px'
               focusState={state => {
                 state.borderColor = '#5b9dcf'
                 state.bgColor = '#151a1c'
               }}
               placeholderState={state => {
                 state.textColor = '#ffFFff50'
               }}
               {...props}/>
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
  const [numOfSymbols, setNumOfSymbols] = useState(0)
  const onTextAreaChanged = (value: string) => {
    setNumOfSymbols(value.length)
  }
  
  return (
    <HStack valign='bottom'>
      <TextArea width='400px'
                placeholder='Enter multiline text'
                textColor='#ffFFff'
                caretColor='#ffFFff'
                bgColor='#181e20'
                rows={7}
                borderColor='#35414a'
                padding='10px'
                cornerRadius='5px'
                focusState={state => {
                  state.borderColor = '#5b9dcf'
                  state.bgColor = '#151a1c'
                }}
                placeholderState={state => {
                  state.textColor = '#ffFFff50'
                }}
                onChange={onTextAreaChanged}
                {...props}/>

      <Label text={numOfSymbols > 0 ? numOfSymbols + ' symbols' : ''}
             textColor='#dca83a'/>
    </HStack>
  )
}
\`\`\``
