describe('From the BBC sport website', () => {
  before(() => {
    cy.visit('sport');
    cy.contains('Yes, I agree').click(); // click the cookies consent
  });
  it('identify Tottenham Hotspurs next 5 fixtures and flag the easy ones', () => {
    let upcomingPremierLeagueFixtures: string = '';
    let fixtureWithSpursStrippedOut: string = '';
    // first find out Tottenham Hotspurs next 5 fixtures
    cy.clickDataTestIDByText('navigation', 'Football');
    cy.checkIdHasText('main-heading', 'Football');

    cy.clickDataTestIDByText('navigation', 'Tables');
    cy.checkIdHasText('main-heading', 'Premier League Table');

    cy.contains('Tottenham Hotspur').click();
    cy.checkIdHasText('main-heading', 'Tottenham Hotspur');

    cy.get('[data-testid="carousel-list-wrapper"]')
      .find('ul')
      .find('li')
      .each(($listOfGames) => {
        cy.wrap($listOfGames)
          .find('div')
          .find('div')
          .find('span')
          .find('span')
          .each(($TypeOfGame) => {
            if ($TypeOfGame.text() === 'Premier League') {
              cy.log(`This game is ${$TypeOfGame.text()}`);
              cy.wrap($listOfGames)
                .find('div')
                .find('div')
                .eq(1)
                .find('div')
                .first()
                .find('div')
                .each(($MatchParticipant) => {
                  const stripStrings: string[] = [
                    ' Tottenham',
                    'Tottenham',
                    'Hotspur',
                    'Tottenham Hotspur',
                    'TottenhamTottenham',
                  ];
                  fixtureWithSpursStrippedOut = $MatchParticipant
                    .text()
                    .replace(stripStrings[0], '')
                    .replace(stripStrings[1], '')
                    .replace(stripStrings[2], '')
                    .replace(stripStrings[3], '')
                    .replace(stripStrings[4], '');

                  cy.log(fixtureWithSpursStrippedOut);
                  upcomingPremierLeagueFixtures =
                    upcomingPremierLeagueFixtures + fixtureWithSpursStrippedOut;
                });
              cy.log(upcomingPremierLeagueFixtures.toString());
            }
          });
      })
      // then get a list of all 20 teams in the table and their positions
      .then(() => {
        cy.log(upcomingPremierLeagueFixtures.toString());

        cy.clickDataTestIDByText('navigation', 'Table');
        cy.checkIdHasText('main-heading', 'Tottenham Hotspur Tables');

        cy.get('table > tbody > tr td:nth-child(2)').each((row, index) => {
          if (upcomingPremierLeagueFixtures.includes(row.text())) {
            cy.get(`tbody > :nth-child(${index}) > :nth-child(1)`).then(
              (position) => {
                cy.log(
                  `${row.text()}'s position is ${Number(position.text()) + 1}`
                );
                if (Number(position.text()) + 1 > 10) {
                  cy.log(`Fixture against ${row.text()} is easy`);
                }
              }
            );
          }
        });
      });
  });
});
