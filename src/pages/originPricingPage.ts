import { expect, Page, Locator } from "@playwright/test";
import { EnergyMadeEasyPage } from "./energyMadeEasyPage";
const { AxeBuilder } = require('@axe-core/playwright');


export class OriginPricingPage {

  readonly page: Page;
  readonly addressTab: Locator;
  readonly addressInput: Locator;
  readonly planPageTab: Locator;
  readonly originBasicLink: Locator;
  readonly originEveryDayLink: Locator;
  readonly electricityCheckBox : Locator;
  readonly gasCheckBox : Locator;
  tableLinks: Locator;
  link: Locator;
  energyMadeEasyPage: EnergyMadeEasyPage;

  constructor(page: Page) {
    this.page = page;
    // Define locators using getByRole and other built-in methods
    this.addressTab = page.getByRole('tab', { name: 'Address' });
    this.addressInput = page.getByRole('combobox', { name: 'Your address' });
    this.planPageTab = page.getByRole('columnheader', { name: 'Plan BPID/EFS' });
    this.originBasicLink = page.getByRole('link', { name: 'Origin Basic', exact: true });
    this.originEveryDayLink = page.getByRole('link', { name: 'Origin Everyday Rewards Variable' , exact: true });
    this.link = page.getByRole('link', { name: 'Origin Basic', exact: true });
    this.tableLinks = page.getByRole('table').locator('a'); 
    this.electricityCheckBox = page.getByRole('checkbox', { name: 'Electricity' }); 
    this.gasCheckBox = page.getByRole('checkbox', { name: 'Natural gas' }); 

  }

  async navigateTo(): Promise<void> {
   await this.page.goto(process.env.BASEURL);
  }

  async selectAddress(address: string): Promise<void> {
    await this.addressTab.waitFor();
    await expect(this.addressTab).toBeVisible();
    await this.addressInput.click();
    await this.addressInput.fill(address);
  }

  async selectAddressFromDropDown(address: string): Promise<void> {
    await this.page.getByText(address).waitFor();
    await this.page.getByText(address).click();
  }

  async verifyEnergyPlansPage(): Promise<void> {
      await this.planPageTab.waitFor();
      await expect(this.planPageTab).toBeVisible();
      await expect(this.electricityCheckBox).toBeVisible();
      await expect(this.gasCheckBox).toBeVisible();
  }

  public async clickLinkToNewTab(string): Promise<EnergyMadeEasyPage> {
    if (string=='originBasic'){
        this.link=this.originBasicLink
    }
    if (string=='originEveryDay'){
        this.link=this.originEveryDayLink
    }
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      await this.link.click(),
      
    ]);

    // Wait for the new page to finish loading
    await newPage.waitForLoadState('domcontentloaded');

    // Initialize and return a new instance of the NewTabPage POM
    return new EnergyMadeEasyPage(newPage);
  }

  public async clickLink(string): Promise<void> {
    if (string=='originBasic'){
        this.link=this.originBasicLink
    }
    if (string=='originEveryDay'){
        this.link=this.originEveryDayLink
    }
    await this.link.click()
      
  }

public async clickAndVerifyNetworkActivity(string): Promise<EnergyMadeEasyPage> {
    if (string=='originBasic'){
        this.link=this.originBasicLink
    }
    if (string=='originEveryDay'){
        this.link=this.originEveryDayLink
    }
    console.log("PageURL in network verification: ",this.page.url())
    // 1. Start waiting for the new page event
    const newPagePromise = this.page.context().waitForEvent('page');

    // 2. Perform the action that opens the new tab
    
    await this.link.waitFor();
    await this.link.click();

    // 3. Await the new page object once it opens
    const newPage = await newPagePromise;
    await newPage.waitForLoadState(); // Ensure the new page is loaded

    // 4. Now, wait for a specific network response within the *new* page's context
    const [apiResponse] = await Promise.all([
        newPage.waitForResponse(response => 
        response.url().includes('energymadeeasy.gov.au')
        ),
    ]);

    // 5. Perform assertions
    expect(apiResponse.ok()).toBeTruthy();
    console.log(`Successfully captured API response from new tab: ${apiResponse.url()}`);
    
    return new EnergyMadeEasyPage(newPage); // Return the new page reference for further interaction
  }
public async loopThroughAndClickLinks() {
    const linksCount = await this.tableLinks.count();
    console.log(`Found ${linksCount} links in the table.`);

    for (let i = 0; i < linksCount; i++) {
      const link = this.tableLinks.nth(i);
      const linkText = await link.textContent();
      const linkHref = await link.getAttribute('href');

      console.log(`Link ${i + 1}: Text - ${linkText}, URL - ${linkHref}`);
  
      // Perform actions on each link, e.g., click it and assert
      const newPagePromise = this.page.context().waitForEvent('page');

      // 2. Perform the action that opens the new tab
      await link.click();

      // 3. Await the new page object once it opens
      const newPage = await newPagePromise;
      await newPage.waitForLoadState(); // Ensure the new page is loaded

      // 4. Now, wait for a specific network response within the *new* page's context
      const [apiResponse] = await Promise.all([
          newPage.waitForResponse(response => 
          response.url().includes('energymadeeasy.gov.au')
          ),
      ]);

      // 5. Perform assertions
      expect(apiResponse.ok()).toBeTruthy();
      console.log(`Successfully captured API response from new tab: ${apiResponse.url()}`);

      //6. verify other assertion by calling EnergyMadeEasy page object methods
      this.energyMadeEasyPage = new EnergyMadeEasyPage(newPage)
      await this.energyMadeEasyPage.verifyLogoAndPostCodeInput();
      await this.energyMadeEasyPage.verifyURLParams();
      await this.energyMadeEasyPage.verifyPageHeading(linkText);
      
      // If you are navigating away, you will need to re-initialize locators or handle context switching
      await this.energyMadeEasyPage.closeNewTab();
      //await this.page.goBack();
      await this.page.bringToFront(); // Example: navigate back to the original page to continue the loop
    }
  }

  async checkAccessibility() {
    // AxeBuilder scans the current state of the page
    const results = await new AxeBuilder({ page: this.page })
      .withTags([ "cat.semantics", "best-practice", "RGAAv4", "RGAA-9.2.1"]) // Standard WCAG tags
      .analyze();
    console.log("accessibility results: " +results.violations)
    return results;
  }

  async mockApiErrorforURLNavigation(apiurl : string) {
    await this.page.route(apiurl, route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
        contentType: 'application/json',
      });
    });
  }

}