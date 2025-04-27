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

  // By putting the string inside and Option object, we are able
  // to strip <script> tags.
  #sanitize(inputString) {
    return this.#removeQuoteMarks(new Option(inputString).innerHTML)
  }

  // Replace all double quote marks
  #removeQuoteMarks(inputString) {
    return inputString.replace(/"/g, "&quot;")
  }
}

