// @requires chromeWebSecurity = false in cypress.config
it('Task 2 (Christian)', () => {
    const tmout = 15000;
    const id = 'abcd-efgh-0123';
    cy.visit('https://dev.storibox.com/');
    cy.get('#scanCardInput').type(id + '{Enter}');
    cy.wait(1000);
    cy.get('body').then((body) => {
        if (body.find('#attendeeName').length > 0) {
            cy.get('#attendeeName').then((name) => {
                if (name.is(':visible')) {
                    cy.wrap(name).type('Bob');
                    cy.get('#attendeeEmail').type('foo@bar.com');
                    cy.get('#saveAttEmail').click();
                }
            });
        }
    });
    cy.url().should('contain', 'attId=' + id, { timeout: tmout });
    cy.get('#item_6114092 > .resize-icon', { timeout: tmout }).click();
    cy.get('.lg-object', { timeout: tmout }).should((img) => {
        expect(img).to.have.attr('src').contains('iamyourfather');
    });
    cy.get('.lg-next', { timeout: tmout }).click();
    cy.get('.lg-next-slide > .lg-img-wrap > .lg-object', { timeout: tmout }).should((img) => {
        expect(img).to.have.attr('src').contains('luke_and_vader');
    });
    cy.get('.lg-close-custom', { timeout: tmout }).click();
    cy.get('.lg-close-custom', { timeout: tmout }).should('not.be.visible');
});