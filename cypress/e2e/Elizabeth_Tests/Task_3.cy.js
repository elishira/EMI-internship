it('Task_3 (test change photo in kiosk)', () => {
    cy.on('uncaught:exception', () => { cy.wait(1000); });
    cy.authAdminConsole();
    const tmout = 15000;
    cy.get('#select2-catSelId-container', { timeout: tmout }).click()
    cy.get('.select2-search__field', { timeout: tmout }).type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates', { timeout: tmout }).clear().type('2023-06-21 13:00 - 2023-06-24  13:00{enter}');
    cy.get('#setFilter', { timeout: tmout }).click();
    let initialCount;
    let finalCount;
    cy.get('#item_6114021 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
        initialCount = parseInt(text);
        finalCount = initialCount + 1;
    })
    cy.visit('https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280', { timeout: tmout })
        cy.get('#scanCardInput').type('MOPF-OKLQ-1222')
        
        cy.get('#dScanning').click()
        cy.get('.kiosk-action-buttons', { timeout: tmout }).click()
            .get('#packageBtn_2', { timeout: tmout }).click()
            .get('#customPopUpBody > .btn', { timeout: tmout }).click()
            .get('#img_6114023', { timeout: tmout }).click()
            .get('#confirmSelect', { timeout: tmout }).click()
            .get('.change-image-btn__text', { timeout: tmout }).click()
            .get('#item_6114021 > .thumbCheck', { timeout: tmout }).click()
            .get('#confirmChange', { timeout: tmout }).click()
            .get('#openShopifyBusket', { timeout: tmout }).click()
            .get('#purchaseConfirm', { timeout: tmout }).click()
            .get('#purchaseQR', { timeout: tmout }).type('test_test_X99H')
            .get('#purchaseApproved', { timeout: tmout }).click()
            .get('#purchaseDone', { timeout: tmout }).click()
    cy.visit('https://dev-photo.occo.io/', { timeout: tmout })
    cy.get('#select2-catSelId-container', { timeout: tmout }).click()
    cy.get('.select2-search__field', { timeout: tmout }).type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates', { timeout: tmout }).clear().type('2023-06-21 13:00 - 2023-06-24  13:00{enter}');

    cy.get('#setFilter', { timeout: tmout }).click();

    cy.get('#item_6114021 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').should((finalCountText) => {
        const parsedFinalCount = parseInt(finalCountText);
        expect(parsedFinalCount).to.eq(finalCount);
    });
})
