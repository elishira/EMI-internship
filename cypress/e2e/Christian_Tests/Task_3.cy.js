import { getDateNow } from './funcs.js' ;

// @requires img file folder and chromeWebSecurity = false in cypress.config
it('Task 3 (Christian)', () => {
    const tmout = 15000;
    const id = 'abcd-efgh-0123';
    const file = 'cypress/fixtures/count_dooku.jpg';
    cy.visit('https://dev.storibox.com');
    cy.get('#scanCardInput').type(id + '{Enter}');
    cy.url().should('contain', 'attId=' + id, { timeout: tmout });
    let dateNow;
    cy.get('#labelUploadImage', { timeout: tmout }).selectFile(file).then(() => {
        dateNow = getDateNow(new Date());
    }).then(() => {cy.intercept('**.jpg').as('upload')});
    cy.wait('@upload', { timeout: tmout });
    cy.get('.last', { timeout: tmout }).click().should((img) => {
        expect(img).to.have.attr('src').contains(dateNow);
    }, { timeout: tmout });
});