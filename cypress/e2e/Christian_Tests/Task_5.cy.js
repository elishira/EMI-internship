import { getDateNow } from './funcs.js' ;

// @requires img file folder and chromeWebSecurity = false in cypress.config
it('Task 5 (Christian)', () => {
    const tmout = 15000;
    const file = 'cypress/fixtures/count_dooku.jpg';
    cy.visit('https://dev-webapp.storibox.com?app=webapp&eName=rnsw&opts=1/');
    cy.get('#attendeeName').type('Bob');
    cy.get('#attendeeEmail').type('foo@bar.com');
    cy.on('window:alert', (message) => {
        expect(message).to.contain('Terms and Conditions');
        cy.on('window:confirm', () => true);
        cy.url().should('contain', 'new-reg');
    });
    cy.wait(500);
    cy.get('#createAtt').click();
    cy.wait(500); 
    cy.get('#agree-privacy').click('left').then(() => {
        cy.get('#createAtt').click();
    });
    cy.get('#uploadPhotoBtn').should('be.visible', { timeout: tmout }).click();
    let dateNow;
    cy.intercept('**.jpg').as('upload');
    cy.get(':nth-child(1) > .btn').selectFile(file).then(() => {
        dateNow = getDateNow(new Date()); // look at ./funcs.js file
    });
    cy.wait('@upload', { timeout: tmout });
    cy.get('.gallery__item-img', { timeout: tmout }).then((img) =>  {
        expect(img).to.have.attr('src').contains(dateNow);
    });
    cy.get('#customPopUp > .modal-dialog > .modal-content > .modal-header > .close', { timeout: tmout })
        .should('be.visible', { timeout: tmout }).wait(500).click()
        .should('not.be.visible', { timeout: tmout });
});