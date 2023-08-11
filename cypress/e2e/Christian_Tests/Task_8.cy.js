// @requires chromeWebSecurity = false and an image file
it ('Task 8 (Christian)', () => {
    const tmout = 15000;
    const file = 'cypress/fixtures/count_dooku.jpg';
    cy.visit('https://dev-webapp.storibox.com?app=webapp&eName=rnsw&opts=1/');
    cy.get('#attendeeName').type('Bob');
    cy.get('#attendeeEmail').type('foo@bar.com');
    cy.on('window:alert', (message) => {
        expect(message).to.contain('Terms and Conditions');
        cy.on('window:confirm', () => true);
        cy.url().should('contain', 'new-reg');
    });
    cy.get('#createAtt').click();
    cy.get('#agree-privacy').click('left').then(() => {
        cy.get('#createAtt').click();
    });
    for (let i = 0; i < 4; i++) { // number of uploads
        cy.get('#uploadPhotoBtn').should('be.visible', { timeout: tmout }).click();
        let dateNow;
        cy.intercept('**.jpg').as('upload_' + i);
        cy.get(':nth-child(1) > .btn').should('be.visible', { timeout: tmout }).selectFile(file);
        cy.wait('@upload_' + i, { timeout: tmout });
        cy.get('#customPopUp > .modal-dialog > .modal-content > .modal-header > .close', { timeout: tmout })
            .should('be.visible', { timeout: tmout }).wait(500).click()
            .should('not.be.visible', { timeout: tmout });
    }
    cy.get('.button').should('be.enabled', { timeout: tmout }).click();
    cy.get('[data-id="gid://shopify/Collection/439015899426"]').should('be.visible', { timeout: tmout })
        .click();
    cy.get('#openShopifyBusket', { timeout: tmout }).wait(750).should('be.enabled', { timeout: tmout })
        .and('be.visible', { timeout: tmout }).click();
    // cy.get('#maybeLaterBtn').should('be.enabled', { timeout: tmout }).click();

    cy.get('#email').should('be.visible', { timeout: tmout }).type('chris.j.tarta@gmail.com'); // email can be changed
    cy.get('#Select0').should('be.visible', { timeout: tmout }).then($country => {$country.val('US')}); // Country
    cy.get('#TextField1').should('be.visible', { timeout: tmout }).type('Ken'); // First Name
    cy.get('#TextField2').should('be.visible', { timeout: tmout }).type('Albak'); // Last Name
    cy.get('#address1').should('be.visible', { timeout: tmout }).type('8035 Yates Rd');
    cy.get('#TextField5').should('be.visible', { timeout: tmout }).type('Orlando'); // City
    cy.get('#Select1').should('be.visible', { timeout: tmout }).select('Florida'); // State
    cy.get('#TextField6').should('be.visible', { timeout: tmout }).type('32807'); // ZIP code
    cy.get('.oQEAZ > div > .QT4by').should('be.enabled', { timeout: tmout }).click();
    cy.get('.oQEAZ > :nth-child(1) > .QT4by').should('be.enabled', { timeout: tmout }).click();
    cy.get('.os-order-number').should('be.visible', { timeout: tmout });
    cy.get('.thank-you__additional-content > a').should('be.visible', { timeout: tmout }).click();
    cy.get('.button').should('be.visible', { timeout: tmout });

    cy.wait(1000).authAdminConsole('rnsw'); // there is a security error here: sometimes it logs into the dev-photo without authentication
    cy.get('.last').should('be.visible', { timeout: tmout }).click();
    cy.get('#searchAttendeePhotos > .fas').click();
    cy.get('#setFilter', { timeout: tmout }).click();

    const numMinutesToWait = 5;
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