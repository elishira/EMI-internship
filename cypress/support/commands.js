/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//-- This is a parent command --
Cypress.Commands.add('authAdminConsole', (event) => {
    const tmout = 15000;
    cy.visit('https://dev-photo.occo.io/');
    cy.get('#username').type(Cypress.env('username'), { log: false });
    cy.get('#password').type(Cypress.env('password'), { log: false });
    cy.get('#login').click();
    cy.url().should('be.equal', 'https://dev-photo.occo.io/index.html#range=Last24Hours', { timeout: tmout });
    cy.get('#galleryCont').should('have.class', 'justified-gallery');

    if (event !==  undefined) {
      cy.get('#select2-catSelId-container', { timeout: tmout }).should('be.visible', { timeout: tmout })
        .type(event + '{Enter}');
    }
});

// Cypress.Commands.add('closeWindow', ()=>{
//     return new Promise(resolve=>{
//       if(window.top.MyAltWindow && window.top.MyAltWindow.close){
//         window.top.MyAltWindow.close() // close popup
//         window.top.MyAltWindow = null
//       }
//       if(originalWindow){
//         cy.state('document', originalWindow.document)
//         cy.state('window', originalWindow)
//       }
//       cy.state('window').focus()  
//       resolve()
//     })
// })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }