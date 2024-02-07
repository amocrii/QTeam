/// <reference types="cypress" />

import { Search } from "../support/pageObjects/search";
import { ProductItems } from "../support/pageObjects/productItems";
import { Cart } from "../support/pageObjects/cart";
import { Form } from "../support/pageObjects/form";
import { faker } from "@faker-js/faker";

const search = new Search();
const items = new ProductItems();
const cart = new Cart();
const form = new Form();

const email = faker.internet.email()
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const city = faker.location.city()
const street = faker.location.street()
const zipcode = faker.location.zipCode()
const phoneNumber = faker.phone.number()

describe('Flow for order processing', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('https://magento.softwaretestingboard.com/')
  })

  it('Search for an item', () => {
    search.searchKeyword('tank')
    cy.wait(1000)
  })

  it('Make sure that the results are relavant', () => {
    cy.log('As the default sorting is by relevance, only the first page is checked')
    cy.get(items.locators.item_link).each((element) => {
      expect(element).to.contain.text('Tank')
    })
  })

  it('Check the cart quantity', () => {
    cy.get(cart.locators.cart_quantity).should('have.class', 'empty')
  })

  it('Place an item to the cart', () => {
    cy.log('Select an item from the resulted list')
    items.pickRandomItem()
    cy.log('The item cannot be added to the cart if the size and color are not selected')
    cy.get(cart.locators.add_to_cart_button).click()
    cy.get(cart.locators.required_fields_error).should('have.length', 2)
    cy.log('Choose random size and color')
    items.chooseRandomSize()
    items.chooseRandomColor()
    cy.get(cart.locators.add_to_cart_button).click()
  })

  it('Check the cart quantity again', () => {
    cy.get(cart.locators.cart_quantity_number).should('have.text', '1')
  })

  it('Proceed to checkout', () => {
    cy.get(cart.locators.cart_quantity_number).click()
    cy.wait(500)
    cy.get(cart.locators.checkout_button).click()
    cy.url().should('include', '/checkout')
  })

  it('Fill the required fields and submit the form', () => {
    cy.get(form.locators.email_field).click().type(`${email}`, {delay: 100})
    cy.get(form.locators.firstname_field).click().type(`${firstName}`, {delay: 100})
    cy.get(form.locators.lastname_field).click().type(`${lastName}`, {delay: 100})
    cy.get(form.locators.street_field_first_line).click().type(`${street}`, {delay: 100})
    cy.get(form.locators.city_field).click().type(`${city}`, {delay: 100})
    form.chooseRandomCountry()
    form.chooseRandomState()
    cy.get(form.locators.zip_code_field).click().type(`${zipcode}`, {delay: 100})
    cy.get(form.locators.phone_field).click().type(`${phoneNumber}`, {delay: 100})
    cy.get(form.locators.submit_button).click()
  })

  it('Place the order', () => {
    cy.get(cart.locators.order_button).click()
    cy.get(cart.locators.order_confirmation).should('be.visible')
  })
})