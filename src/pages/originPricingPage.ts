import { expect, Page, Locator } from "@playwright/test";
import { EnergyMadeEasyPage } from "./energyMadeEasyPage";
//import HeaderPage from "./headerPage";


export class OriginPricingPage {

  readonly page: Page;
  readonly addressTab: Locator;
  readonly addressInput: Locator;
  readonly planPageTab: Locator;
  readonly originBasicLink: Locator;
  readonly originEveryDayLink: Locator;
  link: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators using getByRole and other built-in methods
    this.addressTab = page.getByRole('tab', { name: 'Address' });
    this.addressInput = page.getByRole('combobox', { name: 'Your address' });
    this.planPageTab = page.getByRole('columnheader', { name: 'Plan BPID/EFS' });
    this.originBasicLink = page.getByRole('link', { name: 'Origin Basic', exact: true });
    this.originEveryDayLink = page.getByRole('link', { name: 'Origin Everyday Rewards Variable' , exact: true });
    this.link = page.getByRole('link', { name: 'Origin Basic', exact: true });

  }

  async navigateTo(): Promise<void> {
   await this.page.goto(process.env.BASEURL);
  }

  async selectAddress(address: string): Promise<void> {
    await expect(this.addressTab).toBeVisible();
    await this.addressInput.click();
    await this.addressInput.fill(address);
  }

  public async clickLinkToNewTab(string): Promise<EnergyMadeEasyPage> {
    // Start waiting for the popup event before clicking the element
    //this.link=this.originBasicLink
    if (string=='First'){
        this.link=this.originBasicLink
    }
    if (string=='Second'){
        this.link=this.originEveryDayLink
    }
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.link.click(),
      
    ]);

    // Wait for the new page to finish loading
    await newPage.waitForLoadState('domcontentloaded');

    // Initialize and return a new instance of the NewTabPage POM
    return new EnergyMadeEasyPage(newPage);
  }

public async ClickAndVerifyNetworkActivity(string): Promise<EnergyMadeEasyPage> {
    // Start waiting for the popup event before clicking the element
    if (string=='First'){
        this.link=this.originBasicLink
    }
    if (string=='Second'){
        this.link=this.originEveryDayLink
    }
    console.log("PageURL in network verification: ",this.page.url())
    // 1. Start waiting for the new page event
    const newPagePromise = this.page.context().waitForEvent('page');

    // 2. Perform the action that opens the new tab
    await this.link.click();

    // 3. Await the new page object once it opens
    const newPage = await newPagePromise;
    await newPage.waitForLoadState(); // Ensure the new page is loaded

    // 4. Now, wait for a specific network response within the *new* page's context
    // Use Promise.all() to wait for the response and any subsequent actions if necessary
    const [apiResponse] = await Promise.all([
        newPage.waitForResponse(response => 
        response.url().includes('energymadeeasy.gov.au')
        ),
        // You might need another action here that triggers the API call within the new page
        // e.g., newPage.getByRole('button', { name: 'Load Data' }).click(), 
        // or the page navigation itself triggers the API call.
    ]);

    // 5. Perform assertions
    expect(apiResponse.ok()).toBeTruthy();
    console.log(`Successfully captured API response from new tab: ${apiResponse.url()}`);
    
    return new EnergyMadeEasyPage(newPage); // Return the new page reference for further interaction
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