it('Task 6 (Christian)', () => {
    const tmout = 15000;
    cy.authAdminConsole('rnsw');
    cy.get('#editEvent', { timeout: tmout }).click();
    cy.get('#photoconf-tab', { timeout: tmout }).click();

    let minCheck = false;
    let photoDeloayCheck = false;

    cy.get('#stAvMinCheck').then($checkbox => {
        if ($checkbox.is(':checked')) {
            minCheck = true;
        }

        cy.get('#isPhotoDelayCheckVip').then($checkbox => {
            if ($checkbox.is(':checked')) {
                photoDeloayCheck = true;
            }

            if (minCheck) {
                cy.get('#stAvMinCheck').should('be.visible', { timeout: tmout })
                    .and('be.checked', { timeout: tmout }).uncheck();
                cy.get('#stAvMin');
            } else {
                cy.get('#stAvMinCheck').should('be.visible').and('not.be.checked').check();
                cy.get('#stAvMin').clear().type('10');
            }

            if (photoDeloayCheck) {
                cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout })
                    .and('be.checked', { timeout: tmout }).uncheck();
                cy.get('#photoDelayVipMinutes');
            } else {
                cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout }).and('not.be.checked').check();
                cy.get('#photoDelayVipMinutes').clear().type('11');
            }
            // cy.intercept('**/ppt/list/retrieve').as('load');
            cy.get('#editEventAction').click();
            cy.wait(2000);
            // cy.wait('@load', { timeout: tmout });
            cy.get('#editEvent').click();
            cy.get('#photoconf-tab', { timeout: tmout }).should('be.visible', { timeout: tmout }).click();

            if (minCheck) {
                cy.get('#stAvMinCheck').should('be.visible').and('not.be.checked');
            } else {
                cy.get('#stAvMinCheck').should('be.visible', { timeout: tmout }).and('be.checked', { timeout: tmout });
            }

            if (photoDeloayCheck) {
                cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout }).and('not.be.checked');
            } else {
                cy.get('#isPhotoDelayCheckVip').should('be.visible', { timeout: tmout }).and('be.checked', { timeout: tmout });
            }
            cy.get('#editEventAction').click();
            cy.get('#photoconf-tab', { timeout: tmout }).should('not.be.visible', { timeout: tmout });
        })


    });

});
