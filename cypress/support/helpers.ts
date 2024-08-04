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

export const checkTableRankAndWriteFile = (
  fixture: string,
  rank: JQuery<HTMLElement>
) => {
  // if its in the bottom half of the table then add it to the file as easy
  if (Number(rank.text()) > 10) {
    cy.log(`Fixture against ${fixture} is easy`);

    // write a file with the team in it if one doesnt exist or just append the team to the file if it does
    cy.task(
      'readFileMaybe',
      `${Cypress.config('downloadsFolder')}/fixtures.txt`
    ).then((textOrNull) => {
      if (!textOrNull) {
        cy.writeFile(
          `${Cypress.config('downloadsFolder')}/fixtures.txt`,
          `Fixture against ${fixture} is easy\n`
        );
      } else
        cy.readFile(`${Cypress.config('downloadsFolder')}/fixtures.txt`).then(
          (fixtures) => {
            cy.writeFile(
              `${Cypress.config('downloadsFolder')}/fixtures.txt`,
              `${fixtures}Fixture against ${fixture} is easy\n`
            );
          }
        );
    });
  }
  // but if its in the top half of the table then add it to the file as hard
  else {
    cy.log(`Fixture against ${fixture} is hard`);

    // write a file with the team in it if one doesnt exist or just append the team to the file if it does
    cy.task(
      'readFileMaybe',
      `${Cypress.config('downloadsFolder')}/fixtures.txt`
    ).then((textOrNull) => {
      if (!textOrNull) {
        cy.writeFile(
          `${Cypress.config('downloadsFolder')}/fixtures.txt`,
          `Fixture against ${fixture} is hard\n`
        );
      } else
        cy.readFile(`${Cypress.config('downloadsFolder')}/fixtures.txt`).then(
          (fixtures) => {
            cy.writeFile(
              `${Cypress.config('downloadsFolder')}/fixtures.txt`,
              `${fixtures}Fixture against ${fixture} is hard\n`
            );
          }
        );
    });
  }
};

export const validateFileLength = (
  fileContents: string,
  expectedLength: number
) => {
  const lines = fileContents.split('\n').length;
  expect(lines).to.equal(expectedLength);
  return cy;
};

const upcomingPremierLeagueFixtures: string[] = [''];
let fixtureWithSpursStrippedOut: string = '';

export const getUpcomingFixtures = (): Cypress.Chainable => {
  cy.get('[data-testid="carousel-list-wrapper"]')
    .find('ul > li')
    // loop through all games in list carousel
    .each((listOfGames) => {
      cy.wrap(listOfGames)
        .find('div > div > span > span')
        .each((TypeOfGame) => {
          // ignore the pre-season friendlies and add them to a array of strings then strip Tottenham out
          if (TypeOfGame.text() === 'Premier League') {
            cy.log(`This game is ${TypeOfGame.text()}`);
            cy.wrap(listOfGames)
              .find('div > div')
              .eq(1)
              .find('div')
              .first()
              .find('div > div > div:nth-child(2)')
              .then((Player) => {
                fixtureWithSpursStrippedOut = Player.text().replace(
                  'Tottenham',
                  ''
                );

                upcomingPremierLeagueFixtures.push(fixtureWithSpursStrippedOut);
              });
          }
        });
    });
  return cy.wrap(upcomingPremierLeagueFixtures);
};
