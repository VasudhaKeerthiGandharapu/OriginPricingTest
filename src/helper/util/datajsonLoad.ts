import * as fs from 'fs';
import * as path from 'path';

// Define an interface for your test data
interface TestData {
  originPricingPage: OriginPricingPage;
}
interface OriginPricingPage {
  address: string;
  addressText: string;
  expectedTitle: string;
  plan1: string;
  plan2: string;
  newPageName: string;
  newPageURL: string;
}

export const loadTestData = (): TestData => {
  const environment = process.env.ENV || 'qa'; // Default to 'qa' if not specified
  const filePath = path.resolve(__dirname, `../util/test-data/originPricingData_${environment}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found for environment: ${environment}. Looked for: ${filePath}`);
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData) as TestData;
};
