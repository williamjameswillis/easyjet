const teamToAnalyse = 'Tottenham Hotspur';
const numberOfGamesToAnalyse = 5;

describe('From the BBC sport website', () => {
  before(() => {
    cy.visit('sport');
    cy.contains('Yes, I agree').click();
  });
  it(`identify the next 5 fixtures for ${teamToAnalyse} and flag the easy and hard ones`, () => {
    // first find out Tottenham Hotspurs upcoming fixtures
    cy.getUpcomingFixtures(teamToAnalyse)
      // then go to the table and loop though 5 of these upcoming fixtures and find that teams league rank
      .then((upcomingPremierLeagueFixtures) => {
        cy.clickDataTestIDByText('navigation', 'Table');
        cy.checkIdHasText('main-heading', `${teamToAnalyse} Tables`);

        upcomingPremierLeagueFixtures.forEach((fixture: string, index: number) => {
          if (!fixture) return; // this is to return out of the loop when in the array where Tottenham was stripped out
          if (index > numberOfGamesToAnalyse) return; // this is to return out once we have analysed more than the required number of games
          cy.get(`[data-900="${fixture}"]`).then(($row) => {
            // then get that teams rank in the league
            cy.wrap($row)
              .parents('[class*="-TableRow"]')
              .find('td')
              .first()
              .then(($rank) => {
                cy.log(`${fixture}'s rank is ${Number($rank.text())}`);
                // write a file detailing who Tottenham are playing and if they are easy or hard based on league rank
                cy.checkTableRankAndWriteFile(fixture, $rank);
              });
          });
        });
        // now assert we end up with a file with the specified number of fixtures analysed
        cy.readFile(`${Cypress.config('downloadsFolder')}/fixtures.txt`)
          .should('have.length.gt', 0)
          .then((fileContents: string) => {
            cy.validateFileLength(fileContents, numberOfGamesToAnalyse + 1); // +1 is for the trailing empty line
          });
      });
  });
});
