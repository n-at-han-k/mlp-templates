// This class exists to handle traversal of the variables
// passed into the template.
export default class Variables {
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
