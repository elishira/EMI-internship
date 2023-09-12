it('passcode test', () => {
    cy.authAdminConsole();
    const tmout = 25000;
    cy.get('#templateEventTab > :nth-child(4) > .nav-link', { timeout: tmout }).click();
    cy.get('#passCodes_table', { timeout: tmout })
        .find('tr', { timeout: tmout })
        .its('length')
        .as('rowCount');

    let initialRowCount;
    cy.get('#templateEventTab > :nth-child(1) > .nav-link', { timeout: tmout }).click();
    cy.get('#templateEventTab > :nth-child(4) > .nav-link', { timeout: tmout }).click();
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        initialRowCount = rowCount;
    })

    cy.get('#generatePassCodesButton', { timeout: tmout }).click();
    cy.get('.placeholder', { timeout: tmout }).type('Event1 (etes)');
    cy.get('ul > :nth-child(1) > label', { timeout: tmout }).click();
    cy.get('.icon-caret', { timeout: tmout }).click();
    cy.get('#genAttEmail', { timeout: tmout }).type("andranik@occo.io");
    cy.get('#genAttCount', { timeout: tmout }).type(10);
    cy.get('#pcKioskExpMin', { timeout: tmout }).type(10);
    cy.get('#pcUrlPrefix', { timeout: tmout }).type("https://dev/storibox.com");
    cy.get('#genAttendeeAct', { timeout: tmout }).click();
    cy.get('#messagePopUp > .modal-dialog > .modal-content > .modal-footer > .btn', { timeout: tmout }).click();
    cy.get('#templateEventTab > :nth-child(1) > .nav-link', { timeout: tmout }).click();
    cy.get('#templateEventTab > :nth-child(4) > .nav-link', { timeout: tmout }).click();
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        expect(initialRowCount + 1).to.equal(rowCount);
    })

})
