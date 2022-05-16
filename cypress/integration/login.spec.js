/// <reference types="Cypress" />

// Variables
const USER_EMAIL = 'higorc.anjos@gmail.com';
const USER_NAME = 'Higor';

describe('Login', () => {
  it('Conseguir efetuar login', () => {

    cy.visit('http://localhost:3000/triviaApp');

    cy.get('[data-testid=input-gravatar-email]').type(USER_EMAIL);
    cy.get('[data-testid=input-gravatar-email]').should('have.value', USER_EMAIL);

    cy.get('#name').type(USER_NAME);
    cy.get('#name').should('have.value', USER_NAME);

    cy.get('[data-testid=btn-play]').click();

    cy.url().should('eq', 'http://localhost:3000/trivia');
  })
});

describe('Jogo trivia', () => {
  it('Nome digitado esteja visivel na pagina', () => {
    cy.get('[data-testid=header-player-name]').should('have.text', USER_NAME);
  });

  it('Pontuação inicial de 0', () => {
    cy.get('.player-score').should('have.text', 'Pontuação atual: 0');
  });
});

// https://www.youtube.com/watch?v=gTRMuWCp8mE 23 minutos
