# QA Engineer Technical Test for Vertuoza

This repository contains automated end-to-end (E2E) test scripts for the e-commerce website [Sauce Demo](https://www.saucedemo.com/) using the Playwright framework. These tests ensure the website's functionality and reliability, excluding the "About" section.

## Contents

1. **Playwright Test Scripts:**
   - Located in the `./src/tests/steps` directory.
   - Includes scripts for various scenarios as outlined in the Gherkin syntax.

2. **Playwright Visual Test Scripts:**
   - Located in the `./src/tests/visual-comparison` directory.
   - Includes scripts for comparing actual and expected visual states of the website.

3. **Gherkin Scenarios:**
   - Located in the `./src/tests/features` directory.
   - Describes the tested scenarios and their expected outcomes.

4. **Bug Reports:**
   - Located in the `reportBugs` file.
   - Contains detailed documentation of any encountered bugs.

## Installation

To set up the project, first install the necessary dependencies using npm: `npm install`

This will install all required packages for running the Playwright tests.

## Recommendations

- **Test Execution:** Due to potential performance issues with the `performance_glitch_user`, avoid running all tests simultaneously. 
Use `npx playwright test [filename]` to run specific tests, or utilize the Playwright extension in Visual Studio Code for better management.

- **Configuration:** Modify the `playwright.config.ts` file to adjust settings like browser types or timeouts according to your testing needs.

## Project Structure Note

Please note that this project prioritizes functionality over adhering strictly to best practices or project structure patterns. I am open to any advice or suggestions on how to enhance the structure or organization of the code.
