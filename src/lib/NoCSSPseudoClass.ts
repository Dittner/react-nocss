import { abbreviations, type RulePriority } from './NoCSS'

export class StyleSheetProcessor {
  private readonly hash = new Map<PseudoClassType, PseudoClass>()
  private readonly list = Array.of<PseudoClass>()

  constructor(styleSheet: CSSStyleSheet) {
    this.list.push(new NoPseudoClass(styleSheet))
    this.list.push(new HoverPseudoClass(styleSheet))
    this.list.push(new FocusPseudoClass(styleSheet))
    this.list.push(new PlaceholderPseudoClass(styleSheet))
    this.list.forEach(c => this.hash.set(c.type, c))
  }

  setValue(to: PseudoClassType, key: string, value: string, priority: RulePriority, appendToClassName: boolean = true) {
    const pseudoClass = this.hash.get(to)
    if (pseudoClass) {
      pseudoClass.setValue(key, value, priority, appendToClassName)
    } else {
      throw new Error('PseudoClassProcessor:setValue, PseudoClassType <' + to + '> not added to PseudoClassProcessor')
    }
  }

  valuesToHashSum() {
    return this.list.reduce((res, pseudoClass) => (res + (pseudoClass.isEmpty() ? '' : pseudoClass.hashSum)), '')
  }

  insertRule(className: string, tag: string) {
    this.list.forEach(c => { c.insertRule(className, tag) })
  }

  clearValues() {
    this.list.forEach(c => { c.clear() })
  }
}

export type PseudoClassType = 'none' | 'hover' | 'focus' | 'placeholder'
export class PseudoClass {
  readonly type: PseudoClassType
  readonly styleSheet: CSSStyleSheet
  style: string
  hashSum: string
  constructor(type: PseudoClassType, styleSheet: CSSStyleSheet) {
    this.type = type
    this.styleSheet = styleSheet
    this.style = ''
    this.hashSum = ''
  }

  insertRule(className: string, tag: string) {
    throw new Error('Abstract method PseudoClass:insertRule should be overwritten')
  }

  setValue(key: string, value: string, priority: RulePriority, appendToClassName: boolean = true) {
    if (value === undefined) return

    this.style += key + ':' + value + (priority === 'high' ? ' !important;' : ';')

    if (appendToClassName) {
      if (!(key in abbreviations)) { throw new Error('SelectorRuleBuilder.setValue:: No abbreviation for tag: ' + key) }
      this.hashSum += abbreviations[key] + value
    }
  }

  isEmpty(): boolean {
    return this.style.length === 0
  }

  clear() {
    this.hashSum = this.type !== 'none' ? this.type.toUpperCase() : ''
    this.style = ''
  }
}

class NoPseudoClass extends PseudoClass {
  constructor(styleSheet: CSSStyleSheet) {
    super('none', styleSheet)
  }

  insertRule(className: string, tag: string) {
    if (this.style) {
      const rule = tag + '.' + className + '{' + this.style + '}'
      this.styleSheet.insertRule(rule)
    }
  }
}

class HoverPseudoClass extends PseudoClass {
  readonly isMobileDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

  constructor(styleSheet: CSSStyleSheet) {
    super('hover', styleSheet)
  }

  insertRule(className: string, tag: string) {
    if (this.style) {
      const rule = tag + '.' + className + (this.isMobileDevice ? ':active{' : ':hover{') + this.style + '}'
      this.styleSheet.insertRule(rule)
    }
  }
}

class FocusPseudoClass extends PseudoClass {
  constructor(styleSheet: CSSStyleSheet) {
    super('focus', styleSheet)
  }

  insertRule(className: string, tag: string) {
    if (this.style) {
      const rule = tag + '.' + className + ':focus{' + this.style + '}'
      this.styleSheet.insertRule(rule)
    }
  }
}

class PlaceholderPseudoClass extends PseudoClass {
  constructor(styleSheet: CSSStyleSheet) {
    super('placeholder', styleSheet)
  }

  insertRule(className: string, tag: string) {
    if (this.style) {
      this.styleSheet.insertRule(tag + '.' + className + '::placeholder{' + this.style + '}')
    }
  }
}
