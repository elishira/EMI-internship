it('case 1 (dev-admin.occo)', () => {
    cy.authAdminConsoleDevAdmin();
    const tmout = 20000;
    cy.get('#cloudProcessing > a', { timeout: tmout }).click()
    cy.get('#deleteBg_196', { timeout: tmout }).click()
    // get rid of this hardcoded value
    cy.get(':nth-child(53) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()
    let activated = false;
    cy.get('#useRemoveBgBackup').then($checkbox => {
        if ($checkbox.is(':checked')) {
            activated = true;
            cy.log('Checkbox is checked.');
            cy.log(activated)
        } else {
            cy.log('not checked')
        }
        cy.get('#useRemoveBgBackup', { timeout: tmout }).click()
        cy.get('#updateBg', { timeout: tmout }).click()
        cy.get('#deleteBg_196', { timeout: tmout }).click()
        cy.get(':nth-child(53) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()


        if (activated) {
            cy.get('#useRemoveBgBackup').should('not.be.checked', { timeout: tmout })
        } else {
            cy.get('#useRemoveBgBackup').should('be.checked', { timeout: tmout })
        }
    });
})
