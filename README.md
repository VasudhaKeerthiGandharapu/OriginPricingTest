# Playwright (TS binding) + Cucumber (BDD)

Cucumber is a popular behavior-driven development (BDD) tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. 
TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

## Features

1. Awesome report with screenshots, videos & logs
2. Execute tests on multiple environments 
3. Parallel execution
4. Rerun only failed features
5. Retry failed tests on CI
6. Github Actions integrated with downloadable report
7. Page object model

## Sample report



## Project structure

- .github -> yml file to execute the tests in GitHub Actions
- src -> Contains all the features & Typescript code
- test-results -> Contains all the reports related file

## Reports

1. [Mutilple Cucumber Report](https://github.com/WasiqB/multiple-cucumber-html-reporter)
2. Default Cucumber report
3. [Logs](https://www.npmjs.com/package/winston)
4. Screenshots of failure
5. Test videos of failure
6. Trace of failure

## Get Started

### Setup:

1. Clone or download the project
2. Extract and open in the VS-Code
3. `npm i` to install the dependencies
4. `npx playwright install` to install the browsers
5. `npm run test:prod` to execute the tests
6. ` $env:ENV="qa"; npm test` to run on specific environment
7. To run a particular test change  
```
  paths: [
            "src/test/features/featurename.feature"
         ] 
```
8. Use tags to run a specific or collection of specs
```
npm run test:smoke 
```

### Folder structure
0. `src\pages` -> All the page (UI screen)
1. `src\test\features` -> write your features here
2. `src\test\steps` -> Your step definitions goes here
3. `src\hooks\hooks.ts` -> Browser setup and teardown logic
4. `src\hooks\pageFixture.ts` -> Simple way to share the page objects to steps
5. `src\helper\env` -> Multiple environments are handled
6. `src\helper\types` -> To get environment code suggestions
7. `src\helper\report` -> To generate the report
8. `cucumber.js` -> One file to do all the magic
9. `package.json` -> Contains all the dependencies
10. `src\helper\auth` -> Storage state (Auth file)
11. `src\helper\util` -> Read test data from json & logger

## Tool Rationale Details to Include
Project Context/Motivation: "This framework is designed for robust, scalable end-to-end (E2E) testing of our web application using Behavior-Driven Development (BDD) principles".

1. Playwright Rationale:
Reasoning: Open Source, Scalability and long-term maintenance goals . Also cross browser supported. the below benefits are the reason why its better than the older frameworks.
Key Benefits: Mention its ability to support multiple browsers (Chromium, Firefox, WebKit) with a single API, fast and reliable execution, auto-wait mechanisms (reducing flaky tests), powerful tooling (like Codegen, Trace Viewer), and support for modern web features.


2. Cucumber Rationale:
Reasoning: Scalability and long-term maintenance goals . Also cross browser supported
Key Benefits: Highlight how it enables collaboration between technical and non-technical team members (using plain English Gherkin syntax), improves test readability, and ensures that the automation aligns directly with business requirements.



3. Page Object Model (POM) Rationale:
Reasoning: Scalability and long-term maintenance goals. primarily driven by the need for enhanced code maintainability, reusability, and readability
Key Benefits: Emphasize benefits such as code reusability, reduced code duplication, enhanced maintainability (if UI changes, only the page object needs updating), and keeping test scenarios cleaner and easier to understand.
4. Supporting Tools (TypeScript, Reporting Library, CI/CD Integration):

TypeScript: Chosen for type safety, improved code quality, and better maintainability of the framework.
Reporting (e.g., Allure or built-in HTML reporter): Selected to provide detailed test reports including screenshots and videos for failed tests, which is crucial for debugging and maintenance.


CI/CD Integration: Mention how the framework is designed to integrate easily into the CI/CD pipeline (e.g., Jenkins, GitLab CI) for automated execution on every build.


## Limitations:

Loss of Native Playwright Features: By using Cucumber as the test runner instead of Playwright's native npx playwright test, you lose out on built-in capabilities like the UI Mode, custom fixtures, and advanced sharding.

Weak IDE Integration: While Playwright has first-class VS Code support, the Cucumber runner lacks native support for "Run single test" or "Debug single step" directly from the editor without manual configuration.

## Hardening strategies:

Independence from CucumberJS: Modern wrappers are moving away from Cucumber’s internal functions to prevent breakage during npm updates, shifting toward a model where Playwright acts as the primary runner while still parsing Gherkin.

Better BDD Reporting: New reporters are being developed to explicitly show "Background" steps and "Scenario Outlines" in the Playwright HTML report, which previously hid these details in beforeHooks.

