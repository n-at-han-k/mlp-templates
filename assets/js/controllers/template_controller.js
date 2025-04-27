import { Controller } from '@hotwired/stimulus'
import { Template } from 'mlp-templates'

export default class extends Controller {
  static targets = ['template', 'view']

  connect() {
    let inputString = this.templateTarget.innerHTML
    this.template = new Template(inputString)
    this.render()
  }

  render() {
    let variables = {
      example: 'Example123!',
			greeting: "Welcome!",
			user: {
				display_name: "Jason",
				address: "111 State St, Ithaca,<script>alert(1);<\/script> NY 14853",
				friends: [
					{name: "Kunal", url: "http://whatspop.com"},
					{name: "Francisco", url: "http://smalldemons.com"},
					{name: "Nick", url: "http://milewise.com"}
				],
				prefs: {
					Notifications: "Yes!",
					"Stay logged in": "No"
				}
			},
			test_values: {
				"true": true,
				"false": false,
				"zero": 0,
				"string_zero": "0",
				"null": null
			}
		}
    this.viewTarget.innerHTML = this.template.render(variables)
  }
}
