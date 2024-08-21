# QA Engineer Technical Test for Vertuoza

## Overview

This repository contains the automated end-to-end (E2E) test scripts for the e-commerce website [Sauce Demo](https://www.saucedemo.com/) using Playwright. The purpose of these tests is to ensure the website's functionality and reliability, excluding the "About" section.

## Contents

1. **Playwright Test Scripts**
   - Located in the `./src/tests/steps` directory.
   - Includes scripts for various scenarios as outlined in the Gherkin documentation.

2. **Playwright Visual Test Scripts**
   - Located in the `./src/tests/visual-comparison` directory.
   - Includes scripts for visual comparison with actual display and expected snapshots.

3. **Gherkin Scenarios**
   - Located in the `./src/tests/features` directory.
   - Describes the scenarios tested, including the expected outcomes.

4. **Bug Reports**
   - Located in the `reportBugs` file.
   - Contains detailed documentation of any bugs encountered.

## Recommendations

- **Test Execution**: Due to potential performance issues with `performance_glitch_user`, it is advisable not to execute all the tests simultaneously. Use `npx playwright test [filename]` to run specific tests, or utilize the Playwright extension in Visual Studio Code for better management.
- **Configuration**: Feel free to modify the `playwright.config.ts` file to adjust settings such as browser types or timeouts according to your testing needs.
