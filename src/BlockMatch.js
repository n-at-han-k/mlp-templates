import Template from './Template.js'
import { NEGATABLE, ITERABLE, BLANK } from './constants.js'

export default class BlockMatch {
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
