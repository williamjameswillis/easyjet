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
  checkTableRankAndWriteFile,
  validateFileLength,
} from './helpers';

declare global {
  namespace Cypress {
    interface Chainable {
      checkIdHasText: typeof checkIdHasText;

      clickDataTestIDByText: typeof clickDataTestIDByText;

      checkTableRankAndWriteFile: typeof checkTableRankAndWriteFile;

      validateFileLength: typeof validateFileLength;
    }
  }
}

Cypress.Commands.add('checkIdHasText', checkIdHasText);

Cypress.Commands.add('clickDataTestIDByText', clickDataTestIDByText);

Cypress.Commands.add('checkTableRankAndWriteFile', checkTableRankAndWriteFile);

Cypress.Commands.add('validateFileLength', validateFileLength);
