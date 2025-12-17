@regression @pricingFlow
Feature:Origin Pricing tests

  Background:
    Given User navigates to application page
    And User should be on Origin page

  @smoke
  Scenario: Origin Pricing workflow
    When User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    And User uncheck on the "Electricity" button
    Then User should not see any "Electricity" plans
    And User should see all "Natural gas" plans
    And User click on the "originBasic" plan link
    And User redirects to new page
    And User can see OriginSoure referral in url
    And User click on the "originEveryDay" plan link
    And User redirects to new page
    And User can see OriginSoure referral in url

  

  Scenario: Origin Pricing workflow verifying all the gas plan links
    When User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    And User uncheck on the "Electricity" button
    Then User should not see any "Electricity" plans
    And User should see all "Natural gas" plans
    And User click on all the plans link

@accessibility
Scenario: Origin Pricing workflow verifying accessibility issues
    When User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    Then the page has accessible issue

@netWorkmocking
Scenario: Origin Pricing workflow verifying network mocking
    When User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    And User uncheck on the "Electricity" button
    And the server returns a error for the originBasicLink request
    Then user should not be able to see "Origin Basic" any plan Link

