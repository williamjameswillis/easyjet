export const checkIdHasText = (
  id: string,
  title: string
): Cypress.Chainable => {
  cy.get(`[id=${id}]`).should('exist').should('contain.text', title);
  return cy;
};

export const clickDataTestIDByText = (
  dataTestID: string,
  text: string
): Cypress.Chainable => {
  cy.get(`[data-testid=${dataTestID}]`)
    .should('exist')
    .get('a')
    .contains(text)
    .click();
  return cy;
};

const filePath = 'cypress/downloads/fixtures.txt';

export const checkTablePositionAndWriteFile = (
  position: JQuery<HTMLElement>,
  fixture: string
) => {
  // if its in the bottom half of the table then add it to the file as easy
  if (Number(position.text()) > 10) {
    cy.log(`Fixture against ${fixture} is easy`);

    // write a file with the team in it if one doesnt exist or just append the team to the file if it does
    cy.task('readFileMaybe', filePath).then((textOrNull) => {
      if (!textOrNull) {
        cy.writeFile(filePath, `Fixture against ${fixture} is easy\n`);
      } else
        cy.readFile(filePath).then((fixtures) => {
          cy.writeFile(
            filePath,
            `${fixtures}Fixture against ${fixture} is easy\n`
          );
        });
    });
  }
  // but if its in the top half of the table then add it to the file as hard
  else {
    cy.log(`Fixture against ${fixture} is hard`);

    // write a file with the team in it if one doesnt exist or just append the team to the file if it does
    cy.task('readFileMaybe', filePath).then((textOrNull) => {
      if (!textOrNull) {
        cy.writeFile(filePath, `Fixture against ${fixture} is hard\n`);
      } else
        cy.readFile(filePath).then((fixtures) => {
          cy.writeFile(
            filePath,
            `${fixtures}Fixture against ${fixture} is hard\n`
          );
        });
    });
  }
};
