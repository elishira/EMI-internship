// works
it('test change photo in kiosk', () => {
    // login
    cy.authAdminConsole();

    cy.get('#select2-catSelId-container').click()
    cy.get('.select2-search__field').type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates').clear().type('2023-06-21 13:00 - 2023-06-22  13:00{enter}');

    cy.get('#setFilter').click();
    cy.wait(10000);

    let testCount;
    let initialCount;
    let finalCount;

    cy.get('#item_6114023 > .img-statistic > span > .req_count').invoke('text').then((text) => {
        testCount = parseInt(text);
    })

    cy.get('#item_6114021 > .img-statistic > span > .req_count').invoke('text').then((text) => {
        initialCount = parseInt(text);
        finalCount = initialCount + 1;
    })

    // go to kiosk website
    cy.visit('https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280')

    cy.origin('https://dev.storibox.com', () => {
        // enter UID
        cy.get('#scanCardInput').type('MOPF-OKLQ-1222')
        // click Done
        cy.get('#dScanning').click()
        cy.wait(10000)
    })
    // now working in new url

    // click 
    cy.get('.print-ad > .btn').click()
    // wait?
    cy.get('#packageBtn_2').click()
    cy.wait(3000)
    cy.get('#customPopUpBody > .btn').click()

    cy.get('#img_6114023').click()

    cy.get('#confirmSelect').click()
    cy.wait(3000)

    // change photo
    cy.get('.change-image-btn__text').click()
    cy.get('#item_6114021 > .thumbCheck').click()
    cy.get('#confirmChange').click()


    cy.get('#openShopifyBusket').click()
    cy.get('#purchaseConfirm').click()
    cy.wait(10000)
    cy.get('#purchaseQR').type('test_test_X99H')
    cy.get('#purchaseApproved').click()
    cy.wait(10000)
    cy.get('#purchaseDone').click()
    cy.log(cy.url())
    //cy.url().should('eq', 'https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280')

    // // Later in your test, you can access the stored value using Cypress.env()
    // const storedValue = Cypress.env('reqCountValue');
    // cy.log(`The stored value is: ${storedValue}`);


    // login
    cy.visit('https://dev-photo.occo.io/')
    
    cy.wait(10000);

    cy.get('#select2-catSelId-container').click()
    cy.get('.select2-search__field').type('elizabeth_event (yrpz){enter}')
    cy.get('#filterDates').clear().type('2023-06-21 13:00 - 2023-06-22  13:00{enter}');

    cy.get('#setFilter').click();
    cy.wait(10000)

    cy.get('#item_6114021 > .img-statistic > span > .req_count').invoke('text').should((finalCountText) => {
        const parsedFinalCount = parseInt(finalCountText);
        expect(parsedFinalCount).to.eq(finalCount);
    });
})
