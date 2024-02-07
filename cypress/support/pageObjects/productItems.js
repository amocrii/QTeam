export class ProductItems {

    locators = {
        item: '.product-item',
        item_link: '.product-item-link',
        size_options: '[aria-labelledby*="option-label-size"] [role="option"]',
        color_options: '[aria-labelledby*="option-label-color"] [role="option"]'
    }

    pickRandomItem() {
        cy.get(this.locators.item_link)
          .then((number) => {
            const randomItem = Math.floor(Math.random() * number.length)
            cy.get(this.locators.item_link).eq(randomItem).click()
          })
    }

    chooseRandomSize() {
        cy.get(this.locators.size_options)
          .then((number) => {
            const randomSize = Math.floor(Math.random() * number.length)
            cy.get(this.locators.size_options).eq(randomSize).click()
          })
    }

    chooseRandomColor() {
        cy.get(this.locators.color_options)
          .then((number) => {
            const randomColor = Math.floor(Math.random() * number.length)
            cy.get(this.locators.color_options).eq(randomColor).click()
          })
    }
}