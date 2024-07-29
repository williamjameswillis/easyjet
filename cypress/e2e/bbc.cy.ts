// interface PremierLeagueTable {
//   team: {
//   position: number;
//   teamName: string;
//   }
// }

// const table: PremierLeagueTable = {
//   team:
//   {
//   position: 0,
//   teamName: ""
//   }
// }

// const PremierLeagueTablePositionAndName:string[][] = []

describe('From the BBC sport website', () => {
  before(() => {
    cy.visit('sport');
    cy.contains('Yes, I agree').click(); // click the cookies consent
  })
  it('identify Tottenham Hotspurs next 5 fixtures and flag the easy ones', () => {
    // first find out Tottenham Hotspurs next 5 fixtures
    cy.clickDataTestIDByText('navigation', 'Football')
    cy.checkIdHasText('main-heading', 'Football')

    cy.clickDataTestIDByText('navigation', 'Tables')
    cy.checkIdHasText('main-heading', 'Premier League Table');

    cy.contains('Tottenham Hotspur').click();
    cy.checkIdHasText('main-heading', 'Tottenham Hotspur')

    // cy.clickDataTestIDByText('navigation', 'Scores & Fixtures')
    // cy.checkIdHasText('main-heading', 'Tottenham Hotspur Scores & Fixtures')


    // cy.get('[data-testid="datepicker-date-link-2024-08"]').click()
    // cy.wait(500)

    // cy.get('[data-testid="carousel-list-wrapper"]')
    // .find('ul li').then(listing => {
    //   const listingCount = Cypress.$(listing).length;
    //   cy.log(listingCount.toString())
    //   for (let index = 0; index < listingCount; index++) {
        cy.get('[data-testid="carousel-list-wrapper"]')
          .find('ul').find('li').each(($li) => {
            cy.wrap($li).find('div').find('div').find('span').find('span').each(($span) => {
            if($span.text() === 'Premier League'){
              cy.log('this is prem')
            }
          })
          })
          
        
      // }
    // });
    // then get a list of all 20 teams in the table and their positions
})
})