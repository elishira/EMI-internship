it('Occo.io Case 6: Date Range -> Last 7 Days', () => {
  cy.on('uncaught:exception', () => { cy.wait(1000); });
  cy.authAdminConsole();
  const tmout = 25000;
  cy.get('#select2-catSelId-container', { timeout: tmout }).type('etes{Enter}');
  cy.get('#filterDates', { timeout: tmout }).click();
  cy.get('.ranges > ul > [data-range-key="Last 7 Days"]', { timeout: tmout })
    .click({ multiple: true, force: true });
  cy.contains('Apply', { timeout: tmout }).click();
  cy.url().should('contain', 'range=Last7Days', { timeout: tmout });
});
