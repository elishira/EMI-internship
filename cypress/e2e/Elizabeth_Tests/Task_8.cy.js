it('Task 8 (get kiosk link with QR, occo-photo album)', () => {
    cy.authAdminConsole();
    const tmout = 20000;
    cy.get('#shareCol > .card-header', { timeout: tmout }).click();
    cy.get('#genKioskWithQRLink').click();
    cy.get('#kioskQRphotoTag').type('5577');
    cy.get('#enableQRForWebapp').scrollIntoView().check();
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('#getKioskQRLink').click();
    cy.get('@windowOpen').should('be.calledWithMatch', /https:\/\/dev-events\.occo\.io\?.*kType=evSB3.*pId=f0400d71-4594-11ee-aa64-0135c0c70ae8.*kioskMode=true.*qrShow=true.*getFromTmp=true.*photoTag=5577.*rTime=30000.*kioskPreviewSize=400.*qrPreviewSize=150.*qrType=webapp.*qrEName=zfcu/);
})