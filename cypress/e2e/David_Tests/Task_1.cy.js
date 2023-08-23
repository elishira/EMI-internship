// Davit Shirakyan
// Test 1
// Edited by Christian Tarta

function testPrint() {
    cy.get('[class^=thumbCheck]').first().click() // Click the first image of the album to select
    cy.get('#printImageList').click() // Click Print
    cy.get('#print_photo_button').should('be.visible', { timeout: 15000 }).click() // Check if print dialogue box is opened
    // Check if a number appears on the image that states number of prints
    cy.get('[class^=img-statistic-bg]').first().should('be.visible') 
}

function testExpand(){
    // Click the top-right of the first image of the album to expand
    cy.get('[class^=resize-icon]').first().should('be.visible').click() 
    // Check if back to album button is visible and click
    cy.get('.lg-close-custom').should('be.visible', { timeout: 15000 }).click()
    // Check if back to album homepage by checking if Upload Image element is visible
    cy.get('#addEvent').should('be.visible')
}

function testReset(){
    // Click a checkbox in filters
    cy.get('#_vis', { timeout: 15000 }).click()
    // Click the reset
    cy.get('#resetFilter').click()
    // Check and ensure that the checkbox is deselected
    cy.get('#_vis').should('not.be.checked')
}



it('Task 1', ()=>{
    cy.authAdminConsole('vgsu');
    testExpand();
    testPrint();
    testReset();
})
