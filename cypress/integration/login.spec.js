/// <reference types="Cypress" />

describe('Login', () => {
  it('should login', () => {
    cy.visit('/triviaApp')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#login-button').click()
    cy.url().should('include', '/home')
  })
});
// https://www.youtube.com/watch?v=gTRMuWCp8mE 23 minutos
