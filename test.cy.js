// Davit Shirakyan
// Test 1
function setupLogin() {
    cy.visit('https://dev-photo.occo.io/login.html')
    cy.get('#username').type('davit_shirakyan@sfu.ca')
    cy.get('#password').type('Davit@2004')
    cy.get('#login').click()
    cy.wait(3000)
    cy.get('#select2-catSelId-container').click()
    cy.get('.select2-search__field').type('vgsu{enter}')
    cy.wait(2000)
}

function testPrint() {
    cy.get('[class^=thumbCheck]').first().click() // Click the first image of the album to select
    cy.get('#printImageList').click() // Click Print
    cy.wait(500)
    cy.get('#print_photo_button').should('be.visible').click() // Check if print dialogue box is opened
    // Check if a number appears on the image that states number of prints
    cy.get('[class^=img-statistic-bg]').first().should('be.visible') 
}

function testExpand(){
    // Click the top-right of the first image of the album to expand
    cy.get('[class^=resize-icon]').first().should('be.visible').click() 
    cy.wait(1000)
    // Check if back to album button is visible and click
    cy.get('.lg-close-custom').should('be.visible').click()
    // Check if back to album homepage by checking if Upload Image element is visible
    cy.get('#addEvent').should('be.visible')
}

function testReset(){
    // Click a checkbox in filters
    cy.wait(1000)
    cy.get('#_vis').click()
    // Click the reset
    cy.get('#resetFilter').click()
    // Check and ensure that the checkbox is deselected
    cy.get('#_vis').should('not.be.checked')
}



it('Google Search', ()=>{
    setupLogin()
    testExpand()
    testPrint()
    testReset()
})
