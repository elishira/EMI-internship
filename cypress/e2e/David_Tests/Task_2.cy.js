it('Case: Webapp Selfie Check', () => {
    cy.on('uncaught:exception', () => {cy.wait(1000);});
    const tmout = 15000;
    const file = 'cypress/fixtures/Davit_Selfie.jpg';
    cy.visit('https://dev-webapp.storibox.com?app=webapp&eName=vgsu');
    cy.get('#attendeeName').type('Davit');
    cy.get('#attendeeEmail').type('disposable@gmail.com');
    cy.get('#agree-privacy').then(($checkbox) => {
      if ($checkbox.length > 0) {
        cy.wrap($checkbox).click('left');
      }
    });
    // In Edit Event, set 'Search Selfies Younger Than' and 'Search Images Younger Than' to 48000 hrs
    // for test to remain active for the long term
    cy.get('#createAtt').should('be.visible',{timeout: tmout}).click();
    cy.intercept('**.jpg').as('retrieve');
    cy.get('.add-selfie__btn').then((btn) => {
        cy.wrap(btn).selectFile(file);
    });
    cy.wait('@retrieve', { timeout: tmout });
    cy.get('.gallery__item', { timeout: tmout }).should('be.visible', {timeout: tmout}).then((img) => {
        expect(img).to.have.attr('data-id').eq('6116791');
    });
});