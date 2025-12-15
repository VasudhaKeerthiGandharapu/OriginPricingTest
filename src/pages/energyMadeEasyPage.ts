import { expect, Page, Locator } from "@playwright/test";
import HeaderPage from "./headerPage";
import { loadTestData } from "../helper/util/datajsonLoad";

export class EnergyMadeEasyPage {

    readonly page: Page;
  readonly newTabLogo: Locator;
  readonly originSourceLogo: Locator;
  readonly postCodeInput: Locator;
  testData;

  constructor(page: Page) {
    this.page = page;
    // Define locators using getByRole and other built-in methods
    this.newTabLogo = page.locator('#main img');
    this.originSourceLogo = page.getByRole('link', { name: 'Australian government -' });
    this.postCodeInput = page.getByRole('combobox', { name: 'Enter your postcode to view' })
    this.testData = loadTestData()
  }

  //async navigateTo(): Promise<void> {
  //  await this.page.goto('https://example.com/login');
  //}

  async verifyLogoAndPostCodeInput(): Promise<void> {
    await this.newTabLogo.waitFor();
    await expect(this.newTabLogo).toBeVisible();
    await this.originSourceLogo.waitFor();
    await expect(this.originSourceLogo).toBeVisible();
    await this.postCodeInput.waitFor();
    await expect(this.postCodeInput).toBeVisible();
    await expect(this.postCodeInput).toBeEmpty();
    console.log("Navigated to " + this.testData.originPricingPage.newPageName + "page")
  }

  async verifyURL(pageName: string): Promise<void> {
    expect(this.page.url()).toContain(pageName);
    expect(this.page.url()).toContain("/www.energymadeeasy.gov.au");
  }

  async verifyURLParams(pageName: string): Promise<void> {
    const newPageUrlString = this.page.url();

  // Use the built-in URL object to parse the URL string
  const url = new URL(newPageUrlString);
  
  // Use searchParams to easily access query parameters by key
  const sourceValue = url.searchParams.get('utm_source'); // Example of another parameter

  // Perform assertions
  expect(newPageUrlString).toContain(this.testData.originPricingPage.newPageName);
  expect(sourceValue).toBe(this.testData.originPricingPage.newPageURL)
  }

  

  async closeNewTab(): Promise<void> {
    await this.page.close();
  }


}


export const pageElements = {
    name: 'Search Energy Plans',
    elements: {
        searchPlanTitle:{
            elementName: 'Search Plan Title',
            locator: 'h1[name="Search detailed energy plan documents for your area"]'
        }
    }
}