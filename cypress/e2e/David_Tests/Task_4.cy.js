it('Album: Case 4 (Generate Passcodes)', () => {
    // login
    cy.authAdminConsole();
    // click on passcode tab
    cy.get('#templateEventTab > :nth-child(4) > .nav-link',{ timeout: 10_000 }).should("be.visible").click();
    // get initial row count
    cy.get('#passCodes_table').find('tr').its('length').as('initialRowCount')
    // click generate passcode
    cy.get('#generatePassCodesButton',{ timeout: 10_000 }).should("be.visible").click();
    // fill in event name
    cy.get('.placeholder').type('Event1 (etes)');
    // checkbox select event name from dropdown
    cy.get('ul > :nth-child(1) > label').click();
    // click out of dropdown
    cy.get('.icon-caret').click();
    // fill in email address to receive passcode
    cy.get('#genAttEmail').type("eliziko@hotmail.com");
    // fill in the number of passcode to generate
    cy.get('#genAttCount').type(10);
    // fill in album access url
    cy.get('#pcUrlPrefix').type("https://dev/storibox.com");
    // click generate
    cy.get('#genAttendeeAct',{ timeout: 10_000 }).should("be.visible").click();
    // close pop up
    cy.get('#messagePopUp > .modal-dialog > .modal-content > .modal-footer > .btn').click();
    
    // click on event
    cy.get('#templateEventTab > :nth-child(1) > .nav-link',{ timeout: 10_000 }).should("be.visible").click();
    // clikc back to passcode
    cy.get('#templateEventTab > :nth-child(4) > .nav-link',{ timeout: 10_000 }).should("be.visible").click();

    // makes sure an item was added to the table 
    cy.get('@initialRowCount').then((initialRowCount) => {
        cy.get('#passCodes_table')
            .find('tr')
            .should('have.length', initialRowCount + 1)
    });
})