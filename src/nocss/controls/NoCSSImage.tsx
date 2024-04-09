import * as React from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import {GlobalTheme, themeManager} from "../ThemeManager";
import {MarkdownBlock, NoCSSControlView} from "./NoCSSControlView";
import {Label} from "../../lib/controls/Label";
import {Image} from "../../lib/controls/Image";
import {HStack, VStack} from "../../lib/controls/Container";
import {Spacer} from "../../lib/controls/Spacer";
import {NoCSSLink} from "../../lib/controls/Link";

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

        <NoCSSLink title='Read more'
                   link={person.wikiLink}
                   textColor='#6679d7'
                   hoverState={state => {
                     state.textDecoration = 'underline'
                   }}/>

      </VStack>
    </HStack>
  )
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

        <NoCSSLink title='Read more'
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
