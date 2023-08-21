it('case 1 (dev-admin.occo)', () => {
    cy.authAdminConsole();
    cy.get('#cloudProcessing > a').click()
    cy.get('#deleteBg_196').click()
    cy.get(':nth-child(42) > :nth-child(5) > .dropdown > .dropdown-menu > :nth-child(1) > a').click()
    cy.get('#bgRemoveCont > :nth-child(1) > :nth-child(1) > input').click()
    cy.get('#useRemoveBgBackup').click()
    cy.get('#useAsSelfie').click()
    cy.get('#updateBg').click()

    cy.get('#deleteBg_196').click()
    cy.get(':nth-child(42) > :nth-child(5) > .dropdown > .dropdown-menu > :nth-child(1) > a').click()
    cy.get('#bgRemoveCont > :nth-child(1) > :nth-child(1) > input').should('have.class', 'selected');

    // @requires chromeWebSecurity = false in cypress.config
    it('Storibox Case 1: Maximize and cycle images', () => {
        cy.visit('https://dev.storibox.com/');
        cy.get('#scanCardInput').type('abcd-efgh-0123{Enter}');
        cy.wait(4000);
        cy.url().should('contain', 'attId=abcd-efgh-0123');
        cy.wait(500);
        cy.get('#item_6114092 > .resize-icon').click();
        cy.wait(500);
        cy.get('.lg-object').should((img) => {
            expect(img).to.have.attr('src').contains('iamyourfather');
        });
        cy.get('.lg-next').click();
        cy.wait(1500);
        cy.get('.lg-next-slide > .lg-img-wrap > .lg-object').should((img) => {
            expect(img).to.have.attr('src').contains('luke_and_vader');
        });
        cy.get('.lg-close-custom').click();
    });

    // @requires img file folder && chromeWebSecurity = false
    it('Storibox Case 2: Upload and Print', () => {
        cy.authAdminConsole();
        cy.get('#select2-catSelId-container').type('dohx{Enter}');
        cy.wait(2000);
        let dateNow;
        cy.get('#labelUploadImage').selectFile('cypress/fixtures/final_battle_abcd-efgh-0123.jpg').then(() => {
            const now = new Date();
            dateNow = `${now.getUTCFullYear()}_${
                ((now.getUTCMonth() + 1) % 12).toLocaleString('en-us', {minimumIntegerDigits: 2})
            }_${
                now.getUTCDate().toLocaleString('en-us', {minimumIntegerDigits: 2})
            }_${
                ((now.getUTCHours() + 11) % 12 + 1).toLocaleString('en-us', {minimumIntegerDigits: 2})
            }_${
                now.getUTCMinutes().toLocaleString('en-us', {minimumIntegerDigits: 2})
            }`;
        });
        cy.wait(5000);
        cy.get('.last').click().should((img) => {
            expect(img).to.have.attr('src').contains(dateNow);
        });
        cy.get('#attachAttendeeToImageList > .fas').click();
        cy.get('#attach-attendee-guid').type('abcd-efgh-0123');
        cy.get('#attachAttendeeAction').click();

        cy.visit('https://dev.storibox.com');
        cy.get('#scanCardInput').type('abcd-efgh-0123{Enter}');
        cy.wait(4000);
        cy.get('.last').click().should((img) => {
            expect(img).to.have.attr('src').contains(dateNow);
        });
    });

})

