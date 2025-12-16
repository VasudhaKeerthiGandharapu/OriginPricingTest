@regression @pricingFlow
Feature:Origin Pricing tests

  Background:
    Given User navigates to application page
    And User should be on Origin page

  @smoke
  Scenario: Origin Pricing workflow
    And User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    When User uncheck on the "Electricity" button
    Then User should not see any "Electricity" plans
    And User should see all "Natural gas" plans
    When User click on the "originBasic" plan link
    And User redirects to new page
    Then User can see OriginSoure referral in url
    When User click on the "originEveryDay" plan link
    And User redirects to new page
    Then User can see OriginSoure referral in url

  

  Scenario: Origin Pricing workflow verifying all the gas plan links
    And User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    When User uncheck on the "Electricity" button
    Then User should not see any "Electricity" plans
    And User should see all "Natural gas" plans
    And User click on all the plans link

@accessibility
Scenario: Origin Pricing workflow verifying accessibility issues
    And User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    And the page should be accessible

@netWorkmocking
Scenario: Origin Pricing workflow verifying accessibility issues
    And User enter the address
    And User select the address from dropdown
    And User should be on Electricity and Natural Gas plans page
    When User uncheck on the "Electricity" button
    And the server returns a error for the originBasicLink request
    Then user should not be able to see "Origin Basic" any plan Link

