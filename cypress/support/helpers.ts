
export const checkIdHasText = (id: string, title: string): Cypress.Chainable => {
    cy.get(`[id=${id}]`)
      .should('exist')
      .should('contain.text', title);
    return cy;
  };


  export const clickDataTestIDByText = (dataTestID: string, text: string): Cypress.Chainable => {
    cy.get(`[data-testid=${dataTestID}]`)
      .should('exist')
      .get('a').contains(text).click()
      return cy
    }

