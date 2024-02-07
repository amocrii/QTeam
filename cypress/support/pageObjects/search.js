export class Search {

    locators = {
        search_box: '#search',
        search_button: '[title="Search"]',
        search_results: '[data-ui-id="page-title-wrapper"]'
    }

    searchKeyword(key){
        cy.log("Search for a specific keyword")
        cy.get(this.locators.search_box).click().type(`${key}`, {delay: 100})
        cy.get(this.locators.search_button).click()
    }
}