# easyJet Technical Interview

## Requirement

Create an automation test against the https://www.bbc.co.uk/sport  website that determines what the next 5 premier league fixtures are for Tottenham Hotspur, and in the results highlight any games that are easy based on the team being in the bottom half of the premier league table.

## Approach and Tooling

Since the requirement specified a test I decided to use Cypress test tool as I have recent experience with this test tool. 

See file: cypress/e2e/bbc.cy.ts

In this file you can change the team name and number of games to analyse at the top of the file with the following constants:

teamToAnalyse
numberOfGamesToAnalyse

This means you can use this script to analyse any premier league teams upcoming fixtures.

## How to guide

Install node version 18.18.2 or higher. Run yarn to install dependencies and then use the scripts defined in package.json to either run the test headed cy-open or headless cy-run. 

Note that previous runs of the script will have left a fixtures.txt file in cypress/downloads and only cy-run will automatically delete this file at the start of execution. If you use cy-open you will need to manually delete the txt file.

## Improvements to make 

If I was working at the BBC i would be working with the developers of the BBC Sport website and adding far more data-test selectors to make the script i have written more resistant to changes. Some of the selectors i have used are brittle.

Build ci/cd pipelines that executes this test automatically in a docker job on push up.

Use a Page Object Model with inheritance to define each page we need to deal with on the BBC Sport page, this would improve readability and maintainability.
