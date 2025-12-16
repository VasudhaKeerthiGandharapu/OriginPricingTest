import { expect, Page, Locator } from "@playwright/test";
import { loadTestData } from "../helper/util/datajsonLoad";
import { TIMEOUT } from "node:dns";

export class EnergyMadeEasyPage {

  readonly page: Page;
  readonly newTabLogo: Locator;
  readonly originSourceLogo: Locator;
  readonly postCodeInput: Locator;
  readonly pageHeading: Locator
  testData;

  constructor(page: Page) {
    this.page = page;
    // Define locators using getByRole and other built-in methods
    this.newTabLogo = page.locator('#main img');
    this.originSourceLogo = page.getByRole('link', { name: 'Australian government -' });
    this.postCodeInput = page.getByRole('combobox', { name: 'Enter your postcode to view' });
    this.pageHeading = page.locator('h1');
    this.testData = loadTestData();
  }

  async verifyLogoAndPostCodeInput(): Promise<void> {
    await this.newTabLogo.waitFor({ timeout: 1000000 });
    await expect(this.newTabLogo).toBeVisible();
    await this.originSourceLogo.waitFor();
    await expect(this.originSourceLogo).toBeVisible();
    await this.postCodeInput.waitFor();
    await expect(this.postCodeInput).toBeVisible();
    await expect(this.postCodeInput).toBeEmpty();
    console.log("Navigated to " + this.testData.originPricingPage.newPageName + "page")
  }

  async verifyPageHeading(newPageHeading :string): Promise<void> {
    await this.pageHeading.waitFor({ timeout: 5000 })
    const headername = await this.pageHeading.textContent();
    console.log(`The tag name is: ${headername}`);
    expect(headername).toContain(newPageHeading);
    console.log("Verified Page Heading" + newPageHeading + "for new page")
  }

  async verifyURL(pageName: string): Promise<void> {
    expect(this.page.url()).toContain(pageName);
    expect(this.page.url()).toContain("/www.energymadeeasy.gov.au");
  }

  async verifyURLParams(): Promise<void> {
    const newPageUrlString = this.page.url();

  // Use the built-in URL object to parse the URL string
  const url = new URL(newPageUrlString);
  
  // Use searchParams to easily access query parameters by key
  const sourceValue = url.searchParams.get('utm_source'); // Example of another parameter

  // Perform assertions
  expect(newPageUrlString).toContain(this.testData.originPricingPage.newPageName);
  expect(sourceValue).toBe(this.testData.originPricingPage.newPageURL)
  }

  async VerifyServerError(errorMessage : string): Promise<void> {
    // Perform assertions on the newTab object, not the original page
    await this.page.waitForLoadState('load');
    const errorText = await this.page.locator('#error-message');
    await expect(errorText).toContainText('500');
    await expect(errorText).toContainText(errorMessage);
  }

  

  async closeNewTab(): Promise<void> {
    await this.page.close();
  }


}