/**
 * It seems the whole premise of this engine lies in using regex and
 * the String.prototype.replace() function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement
 *
 * There are 2 types of regex string in this file.
 * One for finding blocks. That is:
 *   {{example}}{{/example}}
 *
 * Another for finding values. That is:
 *   {{=example}} // unsanitized
 *   {{%example}} // sanitized
 *
 * Once we've found the matches, we can loop through and match up
 * with the provided data.
 */
const blockRegex = (() => {
  // This concatenation technique is documented on StackOverflow:
  // https://stackoverflow.com/questions/185510/how-can-i-concatenate-regex-literals-in-javascript
  let openingTag = /\{\{(([@!]?)(.+?))\}\}/
  let theMiddle  = /(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)/
  let closingTag = /\{\{\/\1\}\}/
  let flags = 'g'

  return new RegExp(
    openingTag.source +
    theMiddle.source +
    closingTag.source,
    flags
  )
})()

console.log(blockRegex)
const valueRegex = /\{\{([=%])(.+?)\}\}/g;

export default class Template {
  constructor(inputString) {
    this.inputString = inputString
    console.log('constructing template')
  }

  // Pass in the data and get back the result
  render(variables) {
    this.inputString.replace(blockRegex)
  }
}

// No idea why we're using an Option object here.
// There must be some sort of sanitization that the browser
// does that we're taking advantage of.
function sanitize(inputString) {
  return removeQuoteMarks(new Option(inputString).innerHTML)
}

// Replace all double quote marks
function removeQuoteMarks(inputString) {
  return inputString.replace(/"/g, "&quot;")
}
