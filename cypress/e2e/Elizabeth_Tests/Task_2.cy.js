it('case 4 (test in the kiosk)', () => {
    cy.on('uncaught:exception', () => { cy.wait(1000); });
    cy.authAdminConsole();
    const tmout = 25000;
    cy.visit('https://dev-photo.occo.io/', { timeout: tmout })
    cy.get('#select2-catSelId-container', { timeout: tmout }).click()
    cy.get('.select2-search__field', { timeout: tmout }).type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates', { timeout: tmout }).clear().type('2023-06-21 13:00 - 2023-06-24  13:00{enter}');
    cy.get('#setFilter', { timeout: tmout }).click();
    let initialCount;
    let finalCount;
    cy.get('#item_6114023 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
        initialCount = parseInt(text);
        finalCount = initialCount + 1;
    })
    cy.visit('https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280', { timeout: tmout });
    cy.origin('https://dev.storibox.com', () => {
        cy.get('#scanCardInput').type('MOPF-OKLQ-1222')
        cy.get('#dScanning').click()
    })
    cy.wait(2000)
    cy.get('.print-ad > .btn').click();
    cy.get('#packageBtn_2', { timeout: tmout }).click()
    cy.get('#customPopUpBody > .btn', { timeout: tmout }).click()
    cy.get('#img_6114023', { timeout: tmout }).click()
    cy.get('#confirmSelect', { timeout: tmout }).click()
    cy.get('#openShopifyBusket', { timeout: tmout }).click()
    cy.get('#purchaseConfirm', { timeout: tmout }).click()
    cy.get('#purchaseQR', { timeout: tmout }).type('test_test_X99H')
    cy.get('#purchaseApproved', { timeout: tmout }).click()
    cy.get('#purchaseDone', { timeout: tmout }).click()
    cy.log(cy.url())
    cy.visit('https://dev-photo.occo.io/', { timeout: tmout })
    cy.get('#select2-catSelId-container', { timeout: tmout }).click()
    cy.get('.select2-search__field', { timeout: tmout }).type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates', { timeout: tmout }).clear().type('2023-06-21 13:00 - 2023-06-24  13:00{enter}');
    cy.get('#setFilter', { timeout: tmout }).click();
    cy.get('#item_6114023 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').should((finalCountText) => {
        const parsedFinalCount = parseInt(finalCountText);
        expect(parsedFinalCount).to.eq(finalCount);
    });
})
