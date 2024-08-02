const teamToAnalyse = 'Tottenham Hotspur';
const numberOfGamesToAnalyse = 5;

describe('From the BBC sport website', () => {
  before(() => {
    cy.visit('sport');
    cy.contains('Yes, I agree').click();
  });
  it(`identify the next 5 fixtures for ${teamToAnalyse} and flag the easy and hard ones`, () => {
    const upcomingPremierLeagueFixtures: string[] = [''];
    let fixtureWithSpursStrippedOut: string = '';
    // first find out Tottenham Hotspurs upcoming fixtures
    cy.clickDataTestIDByText('navigation', 'Football');
    cy.checkIdHasText('main-heading', 'Football');

    cy.clickDataTestIDByText('navigation', 'All Teams');
    cy.checkIdHasText('main-heading', 'All Teams');

    cy.contains(teamToAnalyse).click();
    cy.checkIdHasText('main-heading', teamToAnalyse);

    cy.get('[data-testid="carousel-list-wrapper"]')
      .find('ul > li')
      // loop through all games in list carousel
      .each(($listOfGames) => {
        cy.wrap($listOfGames)
          .find('div > div > span > span')
          .each(($TypeOfGame) => {
            // ignore the pre-season friendlies and add them to a array of strings then strip Tottenham out
            if ($TypeOfGame.text() === 'Premier League') {
              cy.log(`This game is ${$TypeOfGame.text()}`);
              cy.wrap($listOfGames)
                .find('div > div')
                .eq(1)
                .find('div')
                .first()
                .find('div > div > div:nth-child(2)')
                .then((Player) => {
                  fixtureWithSpursStrippedOut = Player.text()
                    .replace('Tottenham', '')

                  upcomingPremierLeagueFixtures.push(
                    fixtureWithSpursStrippedOut
                  );
                });
            }
          });
      })
      .then(() => {
        cy.log(upcomingPremierLeagueFixtures.toString());
        cy.clickDataTestIDByText('navigation', 'Table');
        cy.checkIdHasText('main-heading', `${teamToAnalyse} Tables`);
        upcomingPremierLeagueFixtures.forEach((fixture, index)=> {
          if (!fixture) return // this is to return out of the loop when in the array where Tottenham was stripped out
          if (index > numberOfGamesToAnalyse) return // this is to return out once we have analysed more than the required number of games
        cy.get(`[data-900="${fixture}"]`).then((row) => {
            // then get that teams rank in the league
            cy.wrap(row).parents('[class*="-TableRow"]').find('td').first().then((rank) => {
                cy.log(
                  `${fixture}'s rank is ${Number(rank.text())}`
                );
                // write a file detailing who Tottenham are playing and if they are easy or hard based on league rank
                cy.checkTableRankAndWriteFile(fixture, rank);
              }
            );
        });
      })
      });
  });
});
