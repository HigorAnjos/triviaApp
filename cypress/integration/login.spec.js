/// <reference types="Cypress" />

describe('Login', () => {
  it('Conseguir efetuar login', () => {
    const email = 'higorc.anjos@gmail.com';
    const name = 'Higor';

    cy.visit('http://localhost:3000/triviaApp');

    cy.get('[data-testid=input-gravatar-email]').type(email);
    cy.get('[data-testid=input-gravatar-email]').should('have.value', email);

    cy.get('#name').type(name);
    cy.get('#name').should('have.value', name);

    cy.get('[data-testid=btn-play]').click();

    cy.url().should('eq', 'http://localhost:3000/trivia');
  })
});

// https://www.youtube.com/watch?v=gTRMuWCp8mE 23 minutos
