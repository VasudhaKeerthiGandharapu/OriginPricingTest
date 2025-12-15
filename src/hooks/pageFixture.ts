import { test as base,Page, expect,BrowserContext } from '@playwright/test';
import { OriginPricingPage } from '../pages/originPricingPage'
import { EnergyMadeEasyPage } from '../pages/energyMadeEasyPage'
import { Logger } from "winston";

// export const fixture = base.extend<{
//   originPricingPage: OriginPricingPage;
//   energyMadeEasyPage: EnergyMadeEasyPage;
//   logger:  Logger
// }>({
//   originPricingPage: async ({ page }, use) => {
//     await use(new OriginPricingPage(page));
//   },
//   energyMadeEasyPage: async ({ page }, use) => {
//     await use(new EnergyMadeEasyPage(page));
//   },
// });

// export { expect };
// export class PageManager {
//   originPricingPage: OriginPricingPage;
//   energyMadeEasyPage: EnergyMadeEasyPage;
//   logger:  Logger
  
//   // Add other page objects as needed

//   constructor(public page: Page, public context: BrowserContext) {
//     this.originPricingPage = new OriginPricingPage(page);
//     this.energyMadeEasyPage = new EnergyMadeEasyPage(page);
//     // Initialize other page objects
//   }
// }

// // Export a fixture object that can be updated in hooks
// export const fixture = {} as PageManager;
export const fixture = {
    // @ts-ignore
    page: undefined as pageFixture,
    logger: undefined as Logger
}

// //logger: undefined as Logger


