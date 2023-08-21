// @requires chromeWebSecurity = false in cypress.config and last test in file
it ('Task 4 (Christian)', () => {
    const tmout = 15000;
    const id = 'BFSA-FKRK-1189';
    cy.visit('https://dev.storibox.com');
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
    cy.intercept('https://www.sandbox.paypal.com/smart/api/**').as('paypal');
    cy.wait('@paypal', { timeout: tmout }).then((interception) => {
        expect(interception.response.statusCode).to.be.equal(200);
    });
    cy.intercept('**/payment').as('paypCheckout');
    cy.get('iframe', { timeout: tmout }).then((iframe) => {
        cy.wrap(iframe.contents().find('.paypal-button-number-0'))
            .should('be.visible', { timeout: tmout }).click({ multiple: true });
    });
    cy.wait('@paypCheckout', { timeout: tmout });
    cy.get('iframe', { timeout: tmout }).then((iframe) => {
        cy.wrap(iframe.contents().find('.paypal-checkout-close'))
            .should('be.visible', { timeout: tmout }).click({ multiple: true })
            .should('not.be.visible', { timeout: tmout });
    });
    cy.intercept('**/payment').as('visa');
    cy.get('iframe', { timeout: tmout }).then((iframe) => {
        cy.wrap(iframe.contents().find('.paypal-button-card-visa'))
            .should('be.visible', { timeout: tmout }).click({ multiple: true });
    });
    cy.wait('@visa');
    cy.get('iframe', { timeout: tmout }).then((iframe) => {
        cy.wrap(iframe.contents().find('.paypal-checkout-close'))
            .should('be.visible', { timeout: tmout }).click({ multiple: true, force: true })
            .should('not.be.visible', { timeout: tmout });
    });
});