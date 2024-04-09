import {buildRule, StylableComponentProps} from "../lib/NoCSS";

export interface GlobalTheme {
  id: string
  appBg: string
  white: string
  black: string
  text: string
  text50: string
  orange: string
  red: string
  blue: string
  pink: string
  purple: string
  code: string
  maxContentWidth: string
}

export class ThemeManager {
  //--------------------------------------
  //  globalTheme
  //--------------------------------------
  private readonly _theme: GlobalTheme
  get theme(): GlobalTheme {
    return this._theme
  }

  constructor() {
    this._theme = this.createDarkTheme()
    this.buildThemeSelectors(this._theme)

    const html = document.querySelector('html')
    if (html) {
      html.style.colorScheme = 'dark'
      html.style.backgroundColor = this.theme.appBg
    }
    window.localStorage.setItem('theme', 'dark')
  }

  /*
  *
  * LIGHT THEME
  *
  * */

  createDarkTheme(): GlobalTheme {
    const black = '#151a1c'
    const white = '#f0f1f2'
    return {
      id: 'dark',
      appBg: black,
      white,
      orange: '#a56a26',
      black,
      text: white,
      text50: white + '50',
      red: '#d05f68',
      blue: '#2b79d7',
      pink: '#9434a6',
      purple: '#551fd9',
      code: '#ccdbe8',
      maxContentWidth: '900px',
    }
  }


  buildThemeSelectors(t: GlobalTheme) {
    const parentSelector = t.id
    const monoFont = 'var(--font-family-mono)'
    const textColor = t.text

    const h1Props: StylableComponentProps = {
      textTransform: 'capitalize',
      fontSize: '2.5rem',
      fontWeight: '700',
      textColor
    }
    buildRule(h1Props, parentSelector, 'h1')

    const h2Props: StylableComponentProps = {
      fontSize: '1.25rem',
      fontWeight: '600',
      textColor
    }
    buildRule(h2Props, parentSelector, 'h2')

    const h3Props: StylableComponentProps = {
      fontSize: '1.25rem',
      fontWeight: '600',
      textColor: t.purple
    }
    buildRule(h3Props, parentSelector, 'h3')

    const h4Props: StylableComponentProps = {
      fontSize: '1.25rem',
      fontWeight: '600',
      textColor: t.pink
    }
    buildRule(h4Props, parentSelector, 'h4')

    const h5Props: StylableComponentProps = {
      fontSize: '1.25rem',
      fontWeight: '500',
      textColor: textColor + '44'
    }
    buildRule(h5Props, parentSelector, 'h5')

    const h6Props: StylableComponentProps = {
      fontSize: '1.25rem',
      fontWeight: '500',
      textColor: textColor + '44'
    }
    buildRule(h6Props, parentSelector, 'h6')

    const pProps: StylableComponentProps = {
      textColor
    }
    buildRule(pProps, parentSelector, 'p')

    const boldProps: StylableComponentProps = {
      fontWeight: '600',
      textColor
    }
    buildRule(boldProps, parentSelector, 'strong')
    buildRule(boldProps, parentSelector, 'b')

    const globalProps: StylableComponentProps = {
      textColor
    }
    buildRule(globalProps, parentSelector, 'i')
    buildRule(globalProps, parentSelector, 'li')

    const inlineCodeProps: StylableComponentProps = {
      fontFamily: monoFont,
      textColor: t.code
    }
    buildRule(inlineCodeProps, parentSelector, 'code')

    const linkProps: StylableComponentProps = {
      textColor: t.blue
    }
    buildRule(linkProps, parentSelector, 'a:link')
    buildRule(linkProps, parentSelector, 'a:visited')
    buildRule(linkProps, parentSelector, 'a:active')
    linkProps.textDecoration = 'underline'
    buildRule(linkProps, parentSelector, 'a:hover')

    const blockquoteProps: StylableComponentProps = {
      padding: '20px',
      borderLeft: ['7px', 'solid', textColor]
    }
    buildRule(blockquoteProps, parentSelector, 'blockquote')
  }
}

export const themeManager = new ThemeManager()
