import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme, themeManager} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {HStack, Image, Label, LinkButton, Spacer, StackProps, VStack} from "../../lib/components";

class Person {
  readonly name: string
  readonly description: string
  readonly photo: string
  readonly wikiLink: string

  constructor(name: string, description: string, photo: string, wikiLink: string) {
    this.name = name
    this.description = description
    this.photo = photo
    this.wikiLink = wikiLink
  }
}

const chaplin = new Person(
  'Charlie Chaplin',
  'British comedian, producer, writer, director, and composer who is widely regarded as the greatest comic artist of the screen and one of the most important figures in motion-picture history.',
  'chaplin.jpg',
  'https://en.wikipedia.org/wiki/Charlie_Chaplin')

export const NoCSSImage = ({theme}: { theme: GlobalTheme }) => {
  return <NoCSSControlView controlLink='image'
                           theme={theme}
                           title='Image'
                           subTitle='<img>, <nav>'>
    <MarkdownBlock title="Сard, Image and Link"
                   markdown1={markdown1}
                   markdown2={markdown2}
                   theme={theme}>
      <PersonCard person={chaplin}/>
    </MarkdownBlock>

    <MarkdownBlock title="Background-image"
                   markdown1={markdown3}
                   theme={theme}>
      <BgImageDemo/>
    </MarkdownBlock>
  </NoCSSControlView>
}

interface CardProps {
  person: Person
}

const PersonCard = (props: CardProps) => {
  const person = props.person
  const theme = themeManager.theme

  return (
    <HStack width="600px" height='300px'
            padding='20px' gap="20px"
            borderColor={theme.text50}
            marginBottom='40px'
            shadow={'5px 5px 0 0 ' + theme.text50}>

      <Image src={person.photo}
             alt="Person photo"
             height='100%'/>

      <VStack width='100%' height='100%'
              halign='center'>
        <Label width='100%' textAlign='center'
               textColor={theme.white}
               text={person.name}
               fontWeight='bold'
               fontSize='1.25rem'/>

        <Label width='100%'
               textColor={theme.text + 'cc'}
               fontSize='0.9rem'
               text={person.description}/>

        <Spacer/>

        <LinkButton title='Read more'
                    link={person.wikiLink}
                    textColor='#6679d7'
                    hoverState={state => {
                      state.textDecoration = 'underline'
                    }}/>
      </VStack>
    </HStack>
  )
}

const BgImageDemo = () => {
  const theme = themeManager.theme

  return (
    <VStack>
      <SimpleStack bgImageSrc='chaplin.jpg'>
        <Label text='default'
               bgColor={theme.pink}
               textColor={theme.text}/>
      </SimpleStack>
      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'>
        <Label text='no-repeat'
               bgColor={theme.pink}
               textColor={theme.text}/>
      </SimpleStack>

      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'
                   bgImageSize='contain'>
        <Label text='no-repeat contain'
               bgColor={theme.pink}
               textColor={theme.text}/>
      </SimpleStack>

      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'
                   bgImageSize='cover'>
        <Label text='no-repeat cover'
               bgColor={theme.pink}
               textColor={theme.text}/>
      </SimpleStack>
    </VStack>
  )
}

const SimpleStack = (props: StackProps) => {
  return <HStack width="600px" height='300px'
                 halign='center' valign='center'
                 padding='20px' gap="20px"
                 borderColor={themeManager.theme.text50}
                 marginBottom='40px'
                 {...props}>
    {props.children}
  </HStack>
}

const markdown1 = `\`\`\`ts
class Person {
  readonly name: string
  readonly description: string
  readonly photo: string
  readonly wikiLink: string

  constructor(name: string, description: string, photo: string, wikiLink: string) {
    this.name = name
    this.description = description
    this.photo = photo
    this.wikiLink = wikiLink
  }
}

const chaplin = new Person(
  'Charlie Chaplin',
  'British comedian, producer, writer, director ... in motion-picture history.',
  'chaplin.jpg',
  'https://en.wikipedia.org/wiki/Charlie_Chaplin')
\`\`\``


const markdown2 = `\`\`\`tsx
const App = () => {
  return (
    <PersonCard person={chaplin}/>
  )
}

interface CardProps {
  person: Person
}

const PersonCard = (props: CardProps) => {
  const person = props.person
  const theme = themeManager.theme

  return (
    <HStack width="600px" height='300px'
            padding='20px' gap="20px"
            borderColor={theme.text50}
            marginBottom='40px'
            shadow={'5px 5px 0 0 ' + theme.text50}>

      <Image src={person.photo}
             alt="Person photo"
             height='100%'/>

      <VStack width='100%' height='100%'
              halign='center'>
        <Label width='100%' textAlign='center'
               textColor={theme.white}
               text={person.name}
               fontWeight='bold'
               fontSize='1.25rem'/>

        <Label width='100%'
               textColor={theme.text + 'cc'}
               fontSize='0.9rem'
               text={person.description}/>

        <Spacer/>

        <LinkButton title='Read more'
                    link={person.wikiLink}
                    textColor='#6679d7'
                    hoverState={state => {
                      state.textDecoration = 'underline'
                    }}/>
      </VStack>
    </HStack>
  )
}
\`\`\``


const markdown3 = `\`\`\`tsx
const App = () => {
  const theme = themeManager.theme

  return (
    <VStack>
      <SimpleStack bgImageSrc='chaplin.jpg'>
        <Label text='default' 
               bgColor={theme.pink} 
               textColor={theme.text}/>
      </SimpleStack>
      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'>
        <Label text='no-repeat' 
               bgColor={theme.pink} 
               textColor={theme.text}/>
      </SimpleStack>

      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'
                   bgImageSize='contain'>
        <Label text='no-repeat contain' 
               bgColor={theme.pink} 
               textColor={theme.text}/>
      </SimpleStack>

      <SimpleStack bgImageSrc='chaplin.jpg'
                   bgImageRepeat='no-repeat'
                   bgImageSize='cover'>
        <Label text='no-repeat cover' 
               bgColor={theme.pink} 
               textColor={theme.text}/>
      </SimpleStack>
    </VStack>
  )
}

const SimpleStack = (props: StackProps) => {
  return <HStack width="600px" height='300px'
                 halign='center' valign='center'
                 padding='20px' gap="20px"
                 borderColor={themeManager.theme.text50}
                 marginBottom='40px'
                 {...props}>
    {props.children}
  </HStack>
}
\`\`\``
