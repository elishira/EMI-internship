// works
it('Occo.io Case 6: Date Range -> Last 7 Days', () => {
    cy.authAdminConsole();
    cy.get('#select2-catSelId-container').type('etes{Enter}');
    cy.wait(2000);
    cy.get('#filterDates').click();
    cy.wait(2000);
    cy.get('.ranges > ul > [data-range-key="Last 7 Days"]')
      .click({ multiple: true, force: true });
    cy.contains('Apply').click();
    cy.url().should('contain', 'range=Last7Days');
});