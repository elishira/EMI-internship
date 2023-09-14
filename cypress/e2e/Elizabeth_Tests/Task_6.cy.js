it('Task_6 (duplicate pipeline)', () => {
    cy.authAdminConsoleDevAdmin();
    const tmout = 20000;
    cy.get('#cloudProcessing > a', { timeout: tmout }).click()
    cy.get('#bg-list', { timeout: tmout })
        .find('tr', { timeout: tmout })
        .its('length')
        .as('rowCount');
    let initialRowCount;
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        initialRowCount = rowCount;
    })

    cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()
    let pipelineName;
    cy.get('#bgName').invoke('val').then((text) => {
        pipelineName = text;
        cy.log(pipelineName);
        cy.get('.close').click();
        cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
        cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(2) > a', { timeout: tmout }).click()
        cy.get('#updateBg').scrollIntoView().click();
        cy.reload();
        cy.wait(2000)
        cy.get(':nth-child(2) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
        cy.get(':nth-child(2) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click()

        cy.get('#bgName').invoke('val').should('eq', pipelineName + '_copy');
        cy.get('.close').click();
    });
    cy.reload();
    cy.get(':nth-child(2) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(2) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(3) > a > .text-danger', { timeout: tmout }).click()
    cy.wait(2000);
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        expect(initialRowCount).to.equal(rowCount, { timeout: tmout });
    })
})
