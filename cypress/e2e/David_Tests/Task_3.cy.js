// Davit Shirakyan
// Album Types Test
// Edited by Christian Tarta

it('Task 3', () => {
  cy.on('uncaught:exception', () => { cy.wait(1000); });
  cy.authAdminConsole('vgsu');

  cy.get('#shareCol > .card-header').click()
  // Select the dropdown and iterate through each option
  cy.get('#albumTypeLinks').then(($dropdown) => {
    const options = $dropdown.find('option');

    for (let i = 0; i < options.length; i++) {
      const url = options[i].value;
      cy.log(url);
      cy.visit(url);
      cy.url().then((currentUrl) => {
        const expectedBaseUrl = url.split('?')[1].trim(); // Extract and trim base URL without the fragment identifier
        const currentBaseUrl = currentUrl.split('?')[1].trim(); // Extract and trim current URL without the fragment identifier
        expect(currentBaseUrl).to.contain(expectedBaseUrl);
      });
      cy.wait(500);
    }
  });
});
