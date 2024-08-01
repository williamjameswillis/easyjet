const teamToAnalyse = 'Tottenham Hotspur';

describe('From the BBC sport website', () => {
  before(() => {
    cy.visit('sport');
    cy.contains('Yes, I agree').click();
  });
  it(`identify the next 5 fixtures for ${teamToAnalyse} and flag the easy and hard ones`, () => {
    let upcomingPremierLeagueFixtures: string = '';
    let fixtureWithSpursStrippedOut: string = '';
    // first find out Tottenham Hotspurs next 5 fixtures
    cy.clickDataTestIDByText('navigation', 'Football');
    cy.checkIdHasText('main-heading', 'Football');

    cy.clickDataTestIDByText('navigation', 'All Teams');
    cy.checkIdHasText('main-heading', 'All Teams');

    cy.contains(teamToAnalyse).click();
    cy.checkIdHasText('main-heading', teamToAnalyse);

    cy.get('[data-testid="carousel-list-wrapper"]')
      .find('ul')
      .find('li')
      // loop through all upcoming games in list carousel
      .each(($listOfGames) => {
        cy.wrap($listOfGames)
          .find('div')
          .find('div')
          .find('span')
          .find('span')
          .each(($TypeOfGame) => {
            // and ignore pre-season friendlies in this list
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
                    teamToAnalyse,
                    'TottenhamTottenham',
                  ];
                  fixtureWithSpursStrippedOut = $MatchParticipant
                    .text()
                    .replace(stripStrings[0], '')
                    .replace(stripStrings[1], '')
                    .replace(stripStrings[2], '')
                    .replace(stripStrings[3], '')
                    .replace(stripStrings[4], '');

                  upcomingPremierLeagueFixtures =
                    upcomingPremierLeagueFixtures + fixtureWithSpursStrippedOut;
                });
            }
          });
      })
      // then get the names of all 20 teams in the league table
      .then(() => {
        cy.clickDataTestIDByText('navigation', 'Table');
        cy.checkIdHasText('main-heading', `${teamToAnalyse} Tables`);

        cy.get('table > tbody > tr td:nth-child(2)').each((row, index) => {
          // and if it includes any of the upcoming fixtures
          if (upcomingPremierLeagueFixtures.includes(row.text())) {
            // then get that teams position in the league
            cy.get(`tbody > :nth-child(${index}) > :nth-child(1)`).then(
              (position) => {
                cy.log(
                  `${row.text()}'s position is ${Number(position.text()) + 1}`
                );
                // write a file detailing who spurs are playing and if they are easy or hard based on league position
                cy.checkTablePositionAndWriteFile(position, row);
              }
            );
          }
        });
      });
  });
});
