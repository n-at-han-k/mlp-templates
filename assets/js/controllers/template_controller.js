import { Controller } from '@hotwired/stimulus'
import { Template } from 'mlp-templates'

export default class extends Controller {
  static targets = [
    'template', 'view'
  ]

  connect() {
    let inputString = this.templateTarget.innerHTML
    let template = new Template(inputString)
    let variables = {}
    console.log(template.render(variables))
  }
}
