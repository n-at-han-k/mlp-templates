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
  }

  get blocks() {
    let matches = [...this.inputString.matchAll(blockRegex)]
    return matches.map(results => new BlockMatch(...results))
  }

  parseBlock(...args) {
    let match = new BlockMatch(...args)
    let string = match.render()
    return string
  }

  parseValue(...args) {
    let match = new ValueMatch(...args)
    let string = match.render()
    return string
  }

  // Pass in the data and get back the result
  // We first parse all the blocks, then parse all the values,
  // each time replacing, and then return the result
  render(variables) {
    let string = this.inputString
    string = string.replace(blockRegex, this.parseBlock)
    string = string.replace(valueRegex, this.parseValue)
    return string
  }
}

class ValueMatch {
  constructor(match, tagModifier, tagName) {
    this.match = match
    this.tagModifier = tagModifier
    this.tagName = tagName
  }

  render() {
    return 'fucking hell, man!'
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

  hasFalseBlock() {
    this.falseBlock ? true : false
  }

  render() {
    return 'fuck this shit, bro!'
  }
}
