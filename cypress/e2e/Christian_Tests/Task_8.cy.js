// @requires chromeWebSecurity = false and an image file
it ('Task 8 (Christian)', () => {
    cy.on('uncaught:exception', () => {cy.wait(1000);});
    const tmout = 15000;
    const file = 'cypress/fixtures/count_dooku.jpg';
    const event = 'rnsw';
    cy.visit('https://dev-webapp.storibox.com?app=webapp&eName=' + event + '&opts=1/');
    cy.get('#attendeeName').type('Bob');
    cy.get('#attendeeEmail').type('foo@bar.com');
    cy.on('window:alert', (message) => {
        expect(message).to.contain('Terms and Conditions');
        cy.on('window:confirm', () => true);
        cy.url().should('contain', 'new-reg');
    });
    cy.wait(500);
    cy.get('#createAtt').click();
    cy.wait(500); 
    cy.get('#agree-privacy').click('left').then(() => {
        cy.get('#createAtt').click();
    });
    for (let i = 0; i < 3; i++) { // number of uploads
        cy.get('#uploadPhotoBtn').should('be.visible', { timeout: tmout }).click();
        cy.intercept('**.jpg').as('upload_' + i);
        cy.get(':nth-child(1) > .btn').should('be.visible', { timeout: tmout }).selectFile(file);
        cy.wait('@upload_' + i, { timeout: tmout }); // make conditional
        cy.get('#customPopUp > .modal-dialog > .modal-content > .modal-header > .close', { timeout: tmout }).then((closeBtn) => {
            if (closeBtn.is(':visible')) {
                cy.wait(500).wrap(closeBtn).click().should('not.be.visible', { timeout: tmout });
            }
        });
    }
    cy.get('.button').should('be.enabled', { timeout: tmout }).click();
    cy.get('[data-id="gid://shopify/Collection/439015899426"]').should('be.visible', { timeout: tmout })
        .click();
    cy.get('#openShopifyBusket', { timeout: tmout }).wait(750).should('be.enabled', { timeout: tmout })
        .and('be.visible', { timeout: tmout }).click();
    cy.wait(500);
    cy.get('body').then((body) => {
        if (body.find('#maybeLaterBtn').length > 0) {
            cy.get('#maybeLaterBtn').click();
        }
    });
    cy.get('#email').should('be.visible', { timeout: tmout }).type('chris.j.tarta@gmail.com'); // email can be changed
    cy.get('[name="countryCode"]').should('be.visible', { timeout: tmout }).then($country => {$country.val('US')}); // Country
    cy.get('[placeholder="First name (optional)"]').should('be.visible', { timeout: tmout }).type('Ken'); // First Name
    cy.get('[placeholder="Last name"]').should('be.visible', { timeout: tmout }).type('Albak'); // Last Name
    cy.get('#address1').should('be.visible', { timeout: tmout }).type('8035 Yates Rd');
    cy.get('[placeholder="City"]').should('be.visible', { timeout: tmout }).type('Orlando'); // City
    cy.get('select[name="zone"]').should('be.visible', { timeout: tmout }).select('Florida'); // State
    cy.get('[placeholder="ZIP code"]').should('be.visible', { timeout: tmout }).type('32807'); // ZIP code
    cy.contains('Complete order').should('be.visible', { timeout: tmout }).click();
    cy.get('.os-order-number').should('be.visible', { timeout: 25000 });
    cy.get('.thank-you__additional-content > a').should('be.visible', { timeout: tmout }).click();
    cy.get('.button').should('be.visible', { timeout: tmout });

    cy.wait(1000).authAdminConsole(event); // there is a security error here: sometimes it logs into the dev-photo without authentication
    cy.get('.last').should('be.visible', { timeout: tmout }).click();
    cy.get('#searchAttendeePhotos > .fas').click();
    cy.get('#setFilter', { timeout: tmout }).click();

    const numMinutesToWait = 6;
    const refreshIntervalMilliseconds = 15000;
    const targetText = 'lock album';
    let timeWaited = 0;
    cy.reload();
    while (timeWaited < numMinutesToWait * 60 * 1000) {
        cy.get('.badge').then((badge) => {
            const currText = badge.text();
            if (currText !== targetText) {
                cy.wait(refreshIntervalMilliseconds);
                cy.reload();
            }
        });
        timeWaited += refreshIntervalMilliseconds;
    }
    cy.get('.badge').then((badge) => {
        expect(badge).to.have.text(targetText);
    });
});