/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import {
  checkIdHasText,
  clickDataTestIDByText,
  writeFixtureAnalysisFile,
  validateFileLength,
  getUpcomingFixtures,
} from './helpers';

declare global {
  namespace Cypress {
    interface Chainable {
      checkIdHasText: typeof checkIdHasText;

      clickDataTestIDByText: typeof clickDataTestIDByText;

      writeFixtureAnalysisFile: typeof writeFixtureAnalysisFile;

      validateFileLength: typeof validateFileLength;

      getUpcomingFixtures: typeof getUpcomingFixtures;
    }
  }
}

Cypress.Commands.add('checkIdHasText', checkIdHasText);

Cypress.Commands.add('clickDataTestIDByText', clickDataTestIDByText);

Cypress.Commands.add('writeFixtureAnalysisFile', writeFixtureAnalysisFile);

Cypress.Commands.add('validateFileLength', validateFileLength);

Cypress.Commands.add('getUpcomingFixtures', getUpcomingFixtures)