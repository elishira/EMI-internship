it('Task_5 (edit pipeline test)', () => {
    cy.authAdminConsoleDevAdmin();
    const tmout = 20000;
    cy.get('#cloudProcessing > a', { timeout: tmout }).click()
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()
    
    let activated = false;
    let pipelineName;
    cy.get('#bgName').invoke('val').then((text) => {
        pipelineName = text;
        cy.get('#useRemoveBgBackup').then($checkbox => {
            if ($checkbox.is(':checked')) {
                activated = true;
            }
            cy.get('#useRemoveBgBackup', { timeout: tmout }).click()
            cy.get('#bgName', { timeout: tmout }).type('1')
            cy.get('#updateBg', { timeout: tmout }).click()
            cy.get('#deleteBg_196', { timeout: tmout }).click()
            cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
            cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()
            
            cy.get('#bgName').invoke('val').should('eq', pipelineName + '1');
            if (activated) {
                cy.get('#useRemoveBgBackup').should('not.be.checked', { timeout: tmout })
            } else {
                cy.get('#useRemoveBgBackup').should('be.checked', { timeout: tmout })
            }
        });
    });


})
