/**
 * The whole premise of this engine lies in using regex and
 * the String.prototype.replace() function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement
 *
 * There are 2 types of regex string in this file.
 * One for finding blocks. That is:
 *   {{example}} <<if>> {{:example}} <<else>> {{/example}}
 *   {{!example}} <<if not>> {{/!example}}
 *   {{@example}} {{=_key}} {{=_val}} {{/@example}}
 *
 * Another for finding values. That is:
 *   {{=example}} // unsanitized
 *   {{%example}} // sanitized
 *
 * Once we've found the matches, we can loop through and match up
 * with the provided data.
 */

const NEGATABLE = '!'
const SANTIZABLE = '%'
const ITERABLE = '@'
const BLANK = ""

// This matches 7 things:
//   1. Whole tag (modifier + name)
//   2. Modifier (@ or !)
//   3. Name
//   4. Entire content
//   5. True content
//   6. False block
//   7. False content
const blockRegex = (() => {
  let openingTag  = /\{\{(([@!]?)(.+?))\}\}/
  let content = /(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)/
  let closingTag  = /\{\{\/\1\}\}/
  let flags = 'g'

  // This concatenation technique is documented on StackOverflow:
  // https://stackoverflow.com/questions/185510/how-can-i-concatenate-regex-literals-in-javascript
  return new RegExp(
    openingTag.source +
    content.source +
    closingTag.source,
    flags
  )
})()

// This matches 2 things:
//   1. Modifier (= or %)
//   2. Name
const valueRegex = /\{\{([=%])(.+?)\}\}/g;

export default class Template {
  constructor(inputString) {
    this.inputString = inputString
    this.parseBlock = this.parseBlock.bind(this)
    this.parseValue = this.parseValue.bind(this)
  }

  // Pass in the data and get back the result
  // We first parse all the blocks, then parse all the values,
  // each time replacing, and then return the result
  render(variableData) {
    this.variables = new Variables(variableData)
    let string = this.inputString
    string = string.replace(blockRegex, this.parseBlock)
    string = string.replace(valueRegex, this.parseValue)
    return string
  }

  parseBlock(...args) {
    let match = new BlockMatch(...args)
    let string = match.render(this.variables)
    return string
  }

  parseValue(...args) {
    let match = new ValueMatch(...args)
    let string = match.render(this.variables)
    return string
  }

}

// This class exists to handle traversal of the variables
// passed into the template.
class Variables {
  #variables = {}

  constructor(variables) {
    this.#variables = variables
  }

  get toObj() {
    return this.#variables
  }

  fetch(identifier) {
    let result = this.#variables
    let parts = identifier.split('.')

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]
      try {
        result = result[part]
      } catch {
        return undefined
      }
    }
    return result
  }

  hasPart(part) {
    return (part in this.#variables)
  }
}

// Parses the following tags:
//   {{=example}} // unsanitized
//   {{%example}} // sanitized
class ValueMatch {
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
    return this.tagModifier === ITERABLE
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

class BlockMatch {
  constructor(match, tag, tagModifier, tagName,
    content, trueContent, falseBlock, falseContent) {

    this.match = match
    this.tag = tag
    this.tagModifier = tagModifier
    this.tagName = tagName
    this.content = content
    this.trueContent = trueContent
    this.falseBlock = falseBlock
    this.falseContent = falseContent
  }

  render(variables) {
    let result
    let value = variables.fetch(this.tagName)
    switch (this.tagModifier) {
      case NEGATABLE:
        result = this.#parseNegatable(value)
        break

      case ITERABLE:
        result = this.#parseIterable(value, variables.toObj)
        break

      default:
        result = this.#parseDefault(value)
    }
    return  result
  }

  #parseNegatable(value) {
    if (!value) {
      return this.trueContent
    } else {
      return BLANK
    }
  }

  #parseIterable(values, variables = {}) {
    let result = BLANK

    // This works for both arrays and objects.
    for (let key in values) {
      let value = values[key]

      let innerTemplate = new Template(this.content).render({
        ...variables,
        _key: key,
        _val: value
      })

      result += innerTemplate
    }
    return result
  }

  #parseDefault(value) {
    if (!!value) {
      return this.trueContent
    } else if (this.falseBlock) {
      return this.falseContent
    } else {
      return BLANK
    }
  }
}
