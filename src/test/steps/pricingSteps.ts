import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import { helper } from "../../helper/util/helper"
import { OriginPricingPage } from '../../pages/originPricingPage';
import { EnergyMadeEasyPage } from '../../pages/energyMadeEasyPage';

setDefaultTimeout(60 * 1000 * 2)
let originPricingPage: OriginPricingPage;
let energyMadeEasyPage: EnergyMadeEasyPage;

Given('User navigates to application page', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
})

Given('User should be on Origin page', async function () {
    await expect(fixture.page.locator('h1')).toBeVisible();
    await expect(fixture.page.locator('h1')).toContainText(this.testData.originPricingPage.expectedTitle);
  
});

Given('User enter the address', async function () {
    originPricingPage = new OriginPricingPage(fixture.page)
    await originPricingPage.selectAddress(this.testData.originPricingPage.address)
  
});

Given('User select the address from dropdown', async function () {  
    await originPricingPage.selectAddressFromDropDown(this.testData.originPricingPage.addressText)
});

Given('User should be on Electricity and Natural Gas plans page', async function () {
    await originPricingPage.verifyEnergyPlansPage();
  
});

 When('User uncheck on the {string} button', async function (string) {
  await fixture.page.getByRole('checkbox', { name: string }).uncheck();
});


Then('User should not see any {string} plans', async function (string) {
    await expect(fixture.page.getByRole('cell', { name: string }).first()).not.toBeVisible();
});

Then('User should see all {string} plans', async function (string) {
    await expect(fixture.page.getByRole('cell', { name: string }).first()).toBeVisible();
    await expect(fixture.page.getByRole('table')).toContainText(string);
});     

 When('User click on the {string} plan link', async function (string) {
    energyMadeEasyPage = await originPricingPage.clickAndVerifyNetworkActivity(string);
});

Then('User redirects to new page',{timeout: 10000}, async function () {
    await energyMadeEasyPage.verifyLogoAndPostCodeInput();
});

Then('User can see OriginSoure referral in url', async function () {
    await energyMadeEasyPage.verifyURL(this.testData.originPricingPage.newPageName);
    await energyMadeEasyPage.verifyURLParams();
    await energyMadeEasyPage.closeNewTab();
    await fixture.page.bringToFront();
});

Then('User click on all the plans link', async function () {
    await originPricingPage.loopThroughAndClickLinks();
});

Then('the page should be accessible', async function () {
  const results = await originPricingPage.checkAccessibility();
  
  // Fail the test if there are any violations
  expect(results.violations).not.toEqual([]); 
});



