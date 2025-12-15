import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import { helper } from "../../helper/util/helper"
import { OriginPricingPage } from '../../pages/originPricingPage';
import { EnergyMadeEasyPage } from '../../pages/energyMadeEasyPage';

//setDefaultTimeout(60 * 1000 * 2)
let originPricingPage: OriginPricingPage;
let energyMadeEasyPage: EnergyMadeEasyPage;

Given('User navigates to application page', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
})

Given('User should be on Origin page', async function () {
    // const{
    //     screen:{ page }
    // } = this;
    //getByRole('heading', { name: 'Search detailed energy plan' })
    //const selector = await helper.getElementLocator('Search Plan Title');
    //await expect(fixture.page.locator('heading')).toHaveText(expectedTitle);
    //  const address = fixture.page.locator("");
    // await expect(address).toBeVisible();
    await expect(fixture.page.locator('h1')).toBeVisible();//this.testData.originPricingPage.expectedTitle
    //await expect(fixture.page.locator('h1')).toContainText(expectedTitle);
    await expect(fixture.page.locator('h1')).toContainText(this.testData.originPricingPage.expectedTitle);
  
});

Given('User enter the address as {string}', async function (string) {
    // await expect(fixture.page.getByRole('tab', { name: 'Address' })).toBeVisible();
    // await fixture.page.getByRole('combobox', { name: 'Your address' }).click();
    // await fixture.page.getByRole('combobox', { name: 'Your address' }).fill(string);
    originPricingPage = new OriginPricingPage(fixture.page)
    originPricingPage.selectAddress(this.testData.originPricingPage.address)
  
});

Given('User select the address as {string} from dropdown', async function (string) {  
    await fixture.page.getByText(this.testData.originPricingPage.addressText).waitFor();
    await fixture.page.getByText(this.testData.originPricingPage.addressText).click();
});

Given('User should be on {string} and {string} plans page', async function (string, string2) {
    await fixture.page.getByRole('columnheader', { name: 'Plan BPID/EFS' }).waitFor();
    await expect(fixture.page.getByRole('columnheader', { name: 'Plan BPID/EFS' })).toBeVisible();
    await expect(fixture.page.getByRole('checkbox', { name: string })).toBeVisible();
    await expect(fixture.page.getByRole('checkbox', { name: string2 })).toBeVisible();
  
});

 When('User uncheck on the {string} button', async function (string) {
    
  await fixture.page.getByRole('checkbox', { name: string }).uncheck();
  await expect(fixture.page.getByRole('cell', { name: 'Natural gas' }).first()).toBeVisible();
  await expect(fixture.page.getByRole('table')).toContainText('Natural gas');
});


Then('User should not see any {string} plans', async function (string) {
    await expect(fixture.page.getByRole('cell', { name: 'Electricity' }).first()).not.toBeVisible();
});

Then('User should see all {string} plans', async function (string) {
    await expect(fixture.page.getByRole('cell', { name: 'Natural gas' }).first()).toBeVisible();
    await expect(fixture.page.getByRole('table')).toContainText('Natural gas');
});     

 When('User click on the {string} plan link', async function (string) {
    //energyMadeEasyPage = await originPricingPage.clickLinkToNewTab(string);
    energyMadeEasyPage = await originPricingPage.ClickAndVerifyNetworkActivity(string);
     //const page1Promise = fixture.page.waitForEvent('popup');
    //  await fixture.page.getByRole('link', { name: 'Origin Basic', exact: true }).click();
    //  const page1Promise = fixture.page.waitForEvent('popup');
     //const page1 = await page1Promise;
     //await fixture.page.getByRole('link', { name: 'Origin Basic' }).first().click();
     //const page1 = await page1Promise;
});

Then('User redirects to new page', async function () {
    await energyMadeEasyPage.verifyLogoAndPostCodeInput();
  // Optionally close the new tab
    //await newTabPage.closeNewTab();
    //await fixture.page.locator('#main img').waitFor();
    //const energyMadeEasyPage = new EnergyMadeEasyPage(fixture.page)
    //energyMadeEasyPage.VerifyLogo(string)
    //await expect(fixture.page.locator('#main img')).toBeVisible();
});

Then('User can see OriginSoure referral in url', async function () {
    await energyMadeEasyPage.verifyURL(this.testData.originPricingPage.newPageName);
    await energyMadeEasyPage.verifyURLParams(this.testData.originPricingPage.newPageURL);
    await energyMadeEasyPage.closeNewTab();
    await fixture.page.bringToFront();
});

