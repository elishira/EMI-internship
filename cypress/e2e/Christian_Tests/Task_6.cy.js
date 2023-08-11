it ('Task 6 (Christian)', () => {
    const tmout = 15000;
    cy.authAdminConsole('rnsw');
    cy.get('#editEvent', { timeout: tmout }).click();
    cy.get('#photoconf-tab', { timeout: tmout }).click();
    cy.get('#stAvMinCheck').should('be.visible').and('not.be.checked').check();
    cy.get('#stAvMin').clear().type('10');
    cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout }).and('not.be.checked').check();
    cy.get('#photoDelayVipMinutes').clear().type('11');
    cy.intercept('**/ppt/list/retrieve').as('load');
    cy.get('#editEventAction').click();
    cy.wait('@load', { timeout: tmout });
    cy.get('#editEvent').click();
    cy.get('#photoconf-tab', { timeout: tmout }).should('be.visible', { timeout: tmout })
        .click();
    cy.get('#stAvMinCheck').should('be.visible', { timeout: tmout })
        .and('be.checked', { timeout: tmout }).uncheck();
    cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout })
        .and('be.checked', { timeout: tmout }).uncheck();
    cy.get('#editEventAction').click();
    cy.get('#photoconf-tab', { timeout: tmout }).should('not.be.visible', { timeout: tmout });
});