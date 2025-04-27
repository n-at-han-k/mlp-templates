import { SANITIZABLE } from './constants.js'

// Parses the following tags:
//   {{=example}} // unsanitized
//   {{%example}} // sanitized
export default class ValueMatch {
  constructor(match, tagModifier, tagName) {
    this.match = match
    this.tagModifier = tagModifier
    this.tagName = tagName
  }

  render(variables) {
    let value = variables.fetch(this.tagName)
    if (this.sanitizable) {
      return this.#sanitize(value)
    } else {
      return value
    }
  }

  get sanitizable() {
    return this.tagModifier === SANITIZABLE
  }

  // No idea why we're using an Option object here.
  // There must be some sort of sanitization that the browser
  // does that we're taking advantage of.
  #sanitize(inputString) {
    return this.#removeQuoteMarks(new Option(inputString).innerHTML)
  }

  // Replace all double quote marks
  #removeQuoteMarks(inputString) {
    return inputString.replace(/"/g, "&quot;")
  }
}

