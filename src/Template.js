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
import BlockMatch from './BlockMatch.js'
import ValueMatch from './ValueMatch.js'
import Variables from './Variables.js'
import { blockRegex, valueRegex } from './constants.js'

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
