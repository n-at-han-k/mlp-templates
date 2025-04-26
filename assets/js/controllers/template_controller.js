import { Controller } from '@hotwired/stimulus'
import { Template } from 'mlp-templates'

export default class extends Controller {
  static targets = [
    'template', 'view'
  ]

  connect() {
    let template = this.templateTarget.innerHTML
    console.log(template)
  }
}
