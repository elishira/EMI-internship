it('Task_7 (add pipeline)', () => {
    cy.authAdminConsoleDevAdmin();
    const tmout = 20000;

    // adding a pipeline
    // @requires these two image files to exist in fixtures folder
    const overlayImg = 'cypress/fixtures/GENTING_TMP_6X8_TINYPLANET_DAY_FG_resize.png';
    const capturedImg = 'cypress/fixtures/ocra2_atag__xxcx-8888-4444-jsjj_y.jpg';
    const mainScript = "convert {captured_img} -geometry x1200 -gravity center -crop 1600x1200+0+0 -normalize \
    {overlay_img} -background none -composite \
    \(  -gravity southeast  -stroke gray85 -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Italic.ttf -fill gray85 -annotate +350+20  '{current_date}' \) \
    -stroke white -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Regular.ttf -fill black -annotate +350+180 '{code_reg_ex0}'  \
    -stroke white -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Regular.ttf -fill black -annotate +350+240 '{code_reg_ex1}'  \
    -strip \
    -quality 90 \
    {generated_img}";
    const tag = Math.floor(Math.random() * 10000);
    const thumbScript = "convert {generated_img} -resize @200000 -quality 75 {generated_thumbnail_img}";
    cy.get('#cloudProcessing > a', { timeout: tmout }).click();
    cy.get('#bg-list', { timeout: tmout })
        .find('tr', { timeout: tmout })
        .its('length')
        .as('rowCount');

    let initialRowCount;
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        initialRowCount = rowCount;
    })

    cy.get('.text-right > .dropdown > .btn', { timeout: tmout }).click();
    cy.get('.text-right > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click();
    // @requires there to not be a pipeline called "00"
    cy.get('#bgName').scrollIntoView().type('00');
    cy.get('#tag').scrollIntoView().type(tag);
    cy.get('#bgRemoveEnabled').scrollIntoView().check();
    cy.get('#cropEmptyPart').scrollIntoView().check();
    cy.get('#dispKioskPostScan').scrollIntoView().check();
    cy.get('#dispKioskPreScan').scrollIntoView().check();
    cy.get('#curationAutoPrint').scrollIntoView().check();
    cy.get('#printable').scrollIntoView().check();
    cy.get('#tag-to-be-added').scrollIntoView().type('XXXXXXXXXX');
    cy.get('#codeRegEx').scrollIntoView().type('-[a-zA-Z]{4}');
    cy.get('#addRegexFieldButton', { timeout: tmout }).scrollIntoView().click();
    cy.get('#regexDivLast > .form-control').scrollIntoView().type('[0-9]{6}');
    cy.get('#dateFormat').scrollIntoView().type('yyyy-mm-dd');
    cy.get('#dateUtcDiffHours').scrollIntoView().select('UTC+04:00');
    cy.get('#fg-upload > .file-upload').scrollIntoView().then((btn) => {
        cy.wrap(btn).selectFile(overlayImg, { timeout: tmout });
    });
    cy.get('#imgPw-upload > .file-upload').scrollIntoView().then((btn) => {
        cy.wrap(btn).selectFile(capturedImg, { timeout: tmout });
    });
    cy.get('#mainSc').scrollIntoView().type(mainScript, { timeout: tmout, parseSpecialCharSequences: false });
    cy.get('#thumbSc').scrollIntoView().type(thumbScript, { timeout: tmout, parseSpecialCharSequences: false });
    cy.get('#addBg', { timeout: tmout }).click();
    cy.wait(2000);
    // checking if pipeline was added correctly
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).scrollIntoView().click();
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).scrollIntoView().click();
    cy.get('#bgName').scrollIntoView().should('have.value', '00', { timeout: tmout });
    cy.get('#tag').scrollIntoView().should('have.value', tag, { timeout: tmout });

    cy.get('.close').click();

    // deleting pipeline
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
    cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(3) > a > .text-danger', { timeout: tmout }).click();
    cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
        expect(initialRowCount + 1).to.equal(rowCount);
    })
})

// it('add pipeline test)', () => {
//     cy.authAdminConsoleDevAdmin();
//     const tmout = 20000;

//     // adding a pipeline
//     // @requires these two image files to exist in fixtures folder
//     const overlayImg = 'cypress/fixtures/GENTING_TMP_6X8_TINYPLANET_DAY_FG_resize.png';
//     const capturedImg = 'cypress/fixtures/ocra2_atag__xxcx-8888-4444-jsjj_y.jpg';
//     const mainScript = "convert {captured_img} -geometry x1200 -gravity center -crop 1600x1200+0+0 -normalize \
//     {overlay_img} -background none -composite \
//     \(  -gravity southeast  -stroke gray85 -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Italic.ttf -fill gray85 -annotate +350+20  '{current_date}' \) \
//     -stroke white -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Regular.ttf -fill black -annotate +350+180 '{code_reg_ex0}'  \
//     -stroke white -strokewidth 1 -pointsize 32  -font /var/task/fonts/OpenSans-Regular.ttf -fill black -annotate +350+240 '{code_reg_ex1}'  \
//     -strip \
//     -quality 90 \
//     {generated_img}";
//     const thumbScript = "convert {generated_img} -resize @200000 -quality 75 {generated_thumbnail_img}";
//     cy.get('#cloudProcessing > a', { timeout: tmout }).click();
//     cy.get('#bg-list', { timeout: tmout })
//         .find('tr', { timeout: tmout })
//         .its('length')
//         .as('rowCount');

//     let initialRowCount;
//     cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
//         initialRowCount = rowCount;
//     })

//     cy.get('.text-right > .dropdown > .btn', { timeout: tmout }).click();
//     cy.get('.text-right > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).click();
//     // @requires there to not be a pipeline called "00"
//     cy.get('#bgName').scrollIntoView().type('00');
//     cy.get('#tag').scrollIntoView().type('5577');
//     cy.get('#bgRemoveEnabled').scrollIntoView().check();
//     cy.get('#cropEmptyPart').scrollIntoView().check();
//     cy.get('#dispKioskPostScan').scrollIntoView().check();
//     cy.get('#dispKioskPreScan').scrollIntoView().check();
//     cy.get('#curationAutoPrint').scrollIntoView().check();
//     cy.get('#printable').scrollIntoView().check();
//     cy.get('#tag-to-be-added').scrollIntoView().type('XXXXXXXXXX');
//     cy.get('#codeRegEx').scrollIntoView().type('-[a-zA-Z]{4}', { parseSpecialCharSequences: false });
//     cy.get('#addRegexFieldButton', { timeout: tmout }).scrollIntoView().click();
//     cy.get('#regexDivLast > .form-control').scrollIntoView().type('[0-9]{6}', { parseSpecialCharSequences: false });
//     cy.get('#dateFormat').scrollIntoView().type('yyyy-mm-dd');
//     cy.get('#dateUtcDiffHours').scrollIntoView().select('UTC+04:00');
//     cy.get('#fg-upload > .file-upload').scrollIntoView().then((btn) => {
//         cy.wrap(btn).selectFile(overlayImg, { timeout: tmout });
//     });
//     cy.get('#imgPw-upload > .file-upload').scrollIntoView().then((btn) => {
//         cy.wrap(btn).selectFile(capturedImg, { timeout: tmout });
//     });
//     cy.get('#mainSc').scrollIntoView().type(mainScript, { timeout: tmout, parseSpecialCharSequences: false });
//     cy.get('#thumbSc').scrollIntoView().type(thumbScript, { timeout: tmout, parseSpecialCharSequences: false });
//     cy.get('#addBg', { timeout: tmout }).click();

//     // // checking if pipeline was added correctly
//     // cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).scrollIntoView().click();
//     // cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(1) > a', { timeout: tmout }).scrollIntoView().click();
//     // cy.get('#bgName').scrollIntoView().should('have.value', '00', { timeout: tmout });
//     // cy.get('#tag').scrollIntoView().should('have.value', '5577', { timeout: tmout });
//     // cy.get('#bgRemoveEnabled').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#cropEmptyPart').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#dispKioskPostScan').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#dispKioskPreScan').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#curationAutoPrint').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#printable').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#tag-to-be-added').scrollIntoView().should('have.value', 'XXXXXXXXXX', { timeout: tmout });
//     // cy.get('#codeRegEx').scrollIntoView().should('have.value', '-[a-zA-Z]{4}', { timeout: tmout, parseSpecialCharSequences: false });
//     // cy.get('#addRegexFieldButton').scrollIntoView().should('be.checked', { timeout: tmout });
//     // cy.get('#regexDivLast > .form-control').scrollIntoView().should('have.value', '[0-9]+{6}', { timeout: tmout, parseSpecialCharSequences: false });
//     // cy.get('#dateFormat').scrollIntoView().should('have.value', 'yyyy-mm-dd', { timeout: tmout });
//     // cy.get('#dateUtcDiffHours').scrollIntoView().should('have.value', 'UTC+04:00', { timeout: tmout });

//     // deleting pipeline
//     cy.get(':nth-child(1) > :nth-child(6) > .dropdown', { timeout: tmout }).click()
//     cy.get(':nth-child(1) > :nth-child(6) > .dropdown > .dropdown-menu > :nth-child(3) > a > .text-danger', { timeout: tmout }).click();
//     cy.reload();
//     cy.get('@rowCount', { timeout: tmout }).then((rowCount) => {
//         expect(initialRowCount).to.equal(rowCount);
//     })
// })