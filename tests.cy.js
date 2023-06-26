
describe('template spec', () => {

    // it('passcode test', () => {
    //     // login
    //     cy.visit('https://dev-photo.occo.io/')
    //     cy.get('#username').type("eliziko@hotmail.com");
    //     cy.get('#password').type("shirakian19");
    //     cy.get('#login').click();
    //     cy.wait(4000);

    //     // click on passcode tab
    //     cy.get('#templateEventTab > :nth-child(4) > .nav-link').click();
    //     // get initial row count
    //     cy.get('#passCodes_table').find('tr').its('length').as('initialRowCount')
    //     // click generate passcode
    //     cy.get('#generatePassCodesButton').click();
    //     // fill in event name
    //     cy.get('.placeholder').type('Event1 (etes)');
    //     // checkbox select event name from dropdown
    //     cy.get('ul > :nth-child(1) > label').click();
    //     // click out of dropdown
    //     cy.get('.icon-caret').click();
    //     // fill in email address to receive passcode
    //     cy.get('#genAttEmail').type("eliziko@hotmail.com");
    //     // fill in the number of passcode to generate
    //     cy.get('#genAttCount').type(10);
    //     // fill in album access url
    //     cy.get('#pcUrlPrefix').type("https://dev/storibox.com");
    //     // click generate
    //     cy.get('#genAttendeeAct').click();
    //     cy.wait(4000);
    //     // close pop up
    //     cy.get('#messagePopUp > .modal-dialog > .modal-content > .modal-footer > .btn').click();

    //     // click on event
    //     cy.get('#templateEventTab > :nth-child(1) > .nav-link').click();
    //     // clikc back to passcode
    //     cy.get('#templateEventTab > :nth-child(4) > .nav-link').click();

    //     // makes sure an item was added to the table 
    //     cy.get('@initialRowCount').then((initialRowCount) => {
    //         cy.get('#passCodes_table')
    //           .find('tr')
    //           .should('have.length', initialRowCount + 1)
    //       })

    // })

    // it('edit photo range test', () => {
    //     // login
    //     cy.visit('https://dev-photo.occo.io/')
    //     cy.get('#username').type("eliziko@hotmail.com");
    //     cy.get('#password').type("shirakian19");
    //     cy.get('#login').click();
    //     cy.wait(4000);

    //     cy.get('#select2-catSelId-container').click();
    //     cy.get('.select2-search__field').type('Event1 (etes){enter}');
    //     cy.get('#filterDates').clear().type('2023-06-21 13:00 - 2023-06-22  13:00{enter}');
    //     // cy.get('#filterDates').click();

    //     // cy.get('[style="display: block; top: 192.6px; left: 427.462px; right: auto;"] > .ranges > ul > [data-range-key="Last 7 Days"]').click();
    //     cy.get('#setFilter').click()
    //     // .my-link not working
    //     cy.get('.my-link').should('have.attr', 'href', 'https://dev-photo.occo.io/index.html#d1=2023-06-21%2013:00#d2=2023-06-22%2013:00')


    // })

    it('case 4 (test in the kiosk)', () => {
        // go to kiask website
        cy.visit('https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280')

        // enter UID
        cy.get('#scanCardInput').type('MOPF-OKLQ-1222')
        // click Done
        cy.get('#dScanning').click()
        cy.wait(4000)
        // now working in new url
        cy.origin('https://dev-events.occo.io', () => {
            // click 
            cy.get('.print-ad > .btn').click()
            // wait?
            cy.get('#packageBtn_2').click()
            cy.wait(3000)
            cy.get('#customPopUpBody > .btn').click()

            cy.get('#img_6114023').click()
            // cy.get('#img_6114009').click()
            // cy.get('#img_6113994').click()

            cy.get('#confirmSelect').click()
            cy.wait(3000)
            cy.get('#openShopifyBusket').click()
            cy.get('#purchaseConfirm').click()
            cy.wait(3000)
            cy.get('#purchaseQR').type('test_test_X99H')
            cy.get('#purchaseApproved').click()
            cy.wait(4000)
            cy.get('#purchaseDone').click()
        })

        cy.url().should('eq', 'https://dev.storibox.com/kiosk/index.html?kType=evSB4&eId=ecd3cc00-dcd9-11ec-bfc4-89990b079b6d&pvId=ecd3cc02-dcd9-11ec-bfc4-89990b079b6d&title=Test&kioskId=devtest&formPos=50&pageTimeoutInterval=0&kps=280')

    })


})