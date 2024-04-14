import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme} from "../ThemeManager";
import {useState} from "react";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {Button, HStack, Label, Spacer, TextArea, TextInput, TextInputProps, VStack} from "../../lib/components";

export const NoCSSInput = ({theme}: { theme: GlobalTheme }) => {
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
                   markdown1={block1}
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
                   markdown1={block2}
                   theme={theme}>

      <CustomTextArea/>

    </MarkdownBlock>

    <MarkdownBlock title="3. InputProtocol"
                   markdown1={block3}
                   theme={theme}>

      <InputProtocolDemo/>

    </MarkdownBlock>
  </NoCSSControlView>
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

export const InputProtocolDemo = (props: TextInputProps) => {
  const [inputProtocol, updateInputProtocol] = useState({value: 'Default text'})
  const [areaProtocol, updateAreaProtocol] = useState({value: 'Default text'})
  return (
    <HStack height='300px'>
      <VStack height='100%'>
        <TextInput protocol={inputProtocol}
                   width='200px'
                   textColor='#5b9dcf'
                   caretColor='#ffFFff'
                   bgColor='#181e20'
                   borderColor='#35414a'
                   padding='10px'
                   cornerRadius='5px'
                   focusState={state => {
                     state.borderColor = '#5b9dcf'
                     state.bgColor = '#151a1c'
                   }}/>

        <Spacer/>

        <Button title='Clear Input'
                paddingHorizontal='10px'
                onClick={() => updateInputProtocol({value:''})}/>
      </VStack>

      <VStack height='100%'>
        <TextArea protocol={areaProtocol}
                  width='400px'
                  height='100%'
                  textColor='#5b9dcf'
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
                  }}/>

        <Button title='Clear Area'
                paddingHorizontal='10px'
                onClick={() => updateAreaProtocol({value:''})}/>
      </VStack>
    </HStack>
  )
}

/*
==============================
Block 1
==============================
*/

const block1 = `\`\`\`tsx
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
const block2 = `\`\`\`tsx
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


/*
==============================
Block 3
==============================
*/
const block3 = `\`\`\`tsx
const App = () => {
  const [inputProtocol, updateInputProtocol] = useState({value: 'Default text'})
  const [areaProtocol, updateAreaProtocol] = useState({value: 'Default text'})
  return (
    <HStack height='300px'>
      <VStack height='100%'>
        <TextInput protocol={inputProtocol}
                   width='200px'
                   textColor='#5b9dcf'
                   caretColor='#ffFFff'
                   bgColor='#181e20'
                   borderColor='#35414a'
                   padding='10px'
                   cornerRadius='5px'
                   focusState={state => {
                     state.borderColor = '#5b9dcf'
                     state.bgColor = '#151a1c'
                   }}/>

        <Spacer/>

        <Button title='Clear Input'
                paddingHorizontal='10px'
                onClick={() => updateInputProtocol({value:''})}/>
      </VStack>

      <VStack height='100%'>
        <TextArea protocol={areaProtocol}
                  width='400px'
                  height='100%'
                  textColor='#5b9dcf'
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
                  }}/>

        <Button title='Clear Area'
                paddingHorizontal='10px'
                onClick={() => updateAreaProtocol({value:''})}/>
      </VStack>
    </HStack>
  )
}
\`\`\``
