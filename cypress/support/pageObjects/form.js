export class Form {

    locators = {
        email_field: '#customer-email-fieldset [type="email"]',
        firstname_field: 'input[name="firstname"]',
        lastname_field: 'input[name="lastname"]',
        street_field_first_line: 'input[name="street[0]"]',
        city_field: 'input[name="city"]',
        state_field: '[name="shippingAddress.region_id"]',
        state_dropdown: '[name="shippingAddress.region_id"] select',
        state_options: '[name="shippingAddress.region_id"] select option',
        zip_code_field: 'input[name="postcode"]',
        country_field: '[name="shippingAddress.country_id"]',
        country_dropdown: '[name="shippingAddress.country_id"] select',
        country_options: '[name="shippingAddress.country_id"] select option',
        phone_field: 'input[name="telephone"]',
        submit_button: '[data-role="opc-continue"]',
        shipping_method: '#checkout-shipping-method-load [data-bind="click: element.selectShippingMethod"]'
    } 

    chooseRandomCountry() {
        cy.get(this.locators.country_field).click()
        cy.get(this.locators.country_options)
          .then((options) => {
            const randomCountry = Math.floor(Math.random() * options.length) + 1
            cy.get(this.locators.country_dropdown).select(randomCountry)
          })
    }

    chooseRandomState() {
        cy.get(this.locators.state_field)
          .then((options) => {
            if(options.hasClass('_required')) {
                cy.get(this.locators.state_field).click()
                const randomState = Math.floor(Math.random() * options.length) + 1
                cy.get(this.locators.state_dropdown).select(randomState)
            }
          })
    } 

    selectShippingMethod() {
        cy.get(this.locators.shipping_method)
          .then((methods) => {
            if(methods.length > 1) {
                const randomSMethod = Math.floor(Math.random() * methods.length)
                cy.get(this.locators.shipping_method).eq(randomSMethod).click()
            }
          })
    }
}