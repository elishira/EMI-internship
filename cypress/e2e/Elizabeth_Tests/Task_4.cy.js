it('Task_4 (test print, share, and download, occo.io)', () => {
  cy.on('uncaught:exception', () => { cy.wait(1000); });
  cy.authAdminConsole();
  const tmout = 25000;
  cy.get('#select2-catSelId-container', { timeout: tmout }).click()
  cy.get('.select2-search__field', { timeout: tmout }).type('elizabeth_event (yrpz){enter}')
  cy.get('#filterDates', { timeout: tmout }).clear().type('2023-06-21 13:00 - 2023-06-24  13:00{enter}');
  cy.get('#setFilter', { timeout: tmout }).click();
  cy.get('#item_6114054 > .resize-icon > img', { timeout: tmout }).click();
  cy.get('.lg-next', { timeout: tmout }).click();
  cy.get('.lg-close-custom', { timeout: tmout }).click();

  let printCount;
  cy.get('#item_6114021 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    printCount = parseInt(text);
    printCount = printCount + 1;
  })
  cy.get('.thumbCheck > #\\36 114021', { timeout: tmout }).click();
  cy.get('.print-icon-small', { timeout: tmout }).click();
  cy.get('#print_photo_button', { timeout: tmout }).click();
  cy.wait(2000);
  cy.get('#item_6114021 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    const parsedFinalPrintCount = parseInt(text);
    expect(parsedFinalPrintCount).to.eq(printCount);
  })

  let shareCount;
  cy.get('#item_6114020 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    shareCount = parseInt(text);
    shareCount = shareCount + 1;
  })
  cy.get('.thumbCheck > #\\36 114020').click();
  cy.get('#share > .fas').click();
  cy.reload();
  cy.get('#item_6114020 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    const parsedFinalShareCount = parseInt(text);
    expect(parsedFinalShareCount).to.eq(shareCount);
  })

  let downloadCount;
  cy.get('#item_6114019 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    downloadCount = parseInt(text);
    downloadCount = downloadCount + 1;
  })
  cy.get('.thumbCheck > #\\36 114019').click();
  cy.get('#downloadImage > .fas').click();
  cy.reload();
  cy.get('#item_6114019 > .img-statistic > span > .req_count', { timeout: tmout }).invoke('text').then((text) => {
    const parsedFinalDownloadCount = parseInt(text);
    expect(parsedFinalDownloadCount).to.eq(downloadCount);
  })
});
