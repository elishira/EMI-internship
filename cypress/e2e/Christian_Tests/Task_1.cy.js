it('Task 1 (Christian)', () => {
    const tmout = 15000;
    cy.authAdminConsole('etes');
    cy.get('#f_printed', { timeout: tmout }).click();
    cy.get('#filterDates', { timeout: tmout }).click().then(() => {
        cy.intercept('**/retrieve').as('load');
        cy.get('.ranges > ul > [data-range-key="Last 30 Days"]', { timeout: tmout })
        .click({ multiple: true, force: true }).then(() => {
            cy.get('#setFilter', { timeout: tmout }).click();
        });
    });       
    cy.wait(`@load`);
    cy.url().should('contain', 'range=Last30Days', { timeout: tmout })
            .and('contain', 'pd=1', { timeout: tmout });
    cy.get('.item', { timeout: tmout, multiple: true }).each((img) => {
        expect(img.children('.img-statistic').children()).to.exist;
    });
});