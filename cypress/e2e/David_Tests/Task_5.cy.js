it('Webapp Case X: Checks for valid email and terms and conditions', () => {
    cy.visit("https://dev-webapp.storibox.com?app=webapp&eName=vgsu");
    cy.get('#attendeeName').type('Davit');
    // Enter the email into the input field
    cy.get("#attendeeEmail").type("@example.com");
    cy.get('#agree-privacy').then(($checkbox) => {
        if ($checkbox.length > 0) {
            cy.wrap($checkbox).click('left');
        }
    });
    cy.get("#createAtt").click();
    cy.url().should('equal', 'https://dev-webapp.storibox.com/new-reg-id-first.html?app=webapp&eName=vgsu')
    cy.get("#attendeeEmail").clear().type("example@.com");
    cy.get("#createAtt").click();
    cy.url().should('equal', 'https://dev-webapp.storibox.com/new-reg-id-first.html?app=webapp&eName=vgsu')
    cy.get("#attendeeEmail").clear().type("example@example.c");
    cy.get("#createAtt").click();
    cy.url().should('equal', 'https://dev-webapp.storibox.com/new-reg-id-first.html?app=webapp&eName=vgsu')
    cy.get("#attendeeEmail").clear().type("exampleexample.ca");
    cy.get("#createAtt").click();
    cy.url().should('equal', 'https://dev-webapp.storibox.com/new-reg-id-first.html?app=webapp&eName=vgsu')
    cy.get("#attendeeEmail").clear().type("example@example");
    cy.get("#createAtt").click();
    cy.url().should('equal', 'https://dev-webapp.storibox.com/new-reg-id-first.html?app=webapp&eName=vgsu')
})