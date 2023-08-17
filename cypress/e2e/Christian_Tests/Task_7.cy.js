// @requires chromeWebSecurity = false and a locked image in the album of person with id below within last 30 days
it ('Task 7 (Christian)', () => {
    const tmout = 15000;
    const id = 'zyxw-abcd-6789';
    const file = 'cypress/fixtures/count_dooku.jpg';
    let numReqs;
    cy.visit('https://dev.storibox.com/kiosk/index.html?kType=evSB2&eId=a7e4ec20-1a8e-11ee-bdfc-5328cc576ba2&pvId=a7e51331-1a8e-11ee-bdfc-5328cc576ba2&kioskId=ks01&formPos=50&pageTimeoutInterval=0&kps=280&0p-buttonText=%7BNUM_SELECTED%7D+prints+for+only+%7BFINAL_AMOUNT%7D&0p-priceFormula=10%2B%28%28%7BNUM_SELECTED%7D-1%29*8%29&0p-digitals=true&0p-prints=true&0p-printsPool=AndranikPool');
    cy.get('#scanCardInput').type(id);
    cy.get('#dScanning').click();
    cy.get('.last', { timeout: tmout }).should('be.visible', { timeout: tmout }).then((img) => {
        numReqs = Number.parseInt(img.find('.req_count').text());
        numReqs = isNaN(numReqs) ? 1 : numReqs + 1;
        cy.wrap(img).click();
    });

    cy.get('#kioskActionsCont > .btn').click();
    cy.get('#purchaseConfirm').should('be.enabled', { timeout: tmout }).click();
    cy.wait(500);
    cy.get('#purchaseQR').should('be.visible', { timeout: tmout }).type('Foo_Bar_36HM');
    cy.get('#purchaseApproved').click();
    cy.get('#purchaseDone').should('be.visible', { timeout: tmout }).click();

    cy.wait(1000).authAdminConsole('rnsw');
    cy.get('#filterByAttID').type(id);
    cy.get('#filterDates', { timeout: tmout }).click().then(() => {
        cy.intercept('**/retrieve').as('load');
        cy.get('.ranges > ul > [data-range-key="Last 30 Days"]', { timeout: tmout })
        .click({ multiple: true, force: true }).then(() => {
            cy.get('#setFilter', { timeout: tmout }).click();
        });
    });
    cy.wait(`@load`);
    cy.url().should('contain', 'range=Last30Days', { timeout: tmout });

    cy.get('.last', { timeout: tmout }).should('be.visible', { timeout: tmout }).then((img) => {
        expect(img.find('.req_count')).to.have.text(numReqs);
    });


    cy.get('.badge').click(); // locks album again
});