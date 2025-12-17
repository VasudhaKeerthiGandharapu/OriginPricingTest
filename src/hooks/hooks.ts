import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getBrowser, getEnv, getHead, getTags } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import { loadTestData } from '../helper/util/datajsonLoad';
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let testData;

BeforeAll(async function () {
    getEnv();
    getBrowser();
    getTags();
    getHead();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    testData = loadTestData();
    // You might store this in the Cucumber World object or a global variable if needed
    this.testData = testData; 
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});




After(async function ({ pickle, result }) {
    try{
        let videoPath: string;
        let img: Buffer;
        const path = `./test-results/trace/${pickle.id}.zip`;
        if (result?.status == Status.PASSED) {
            img = await fixture.page.screenshot(
                { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
            videoPath = await fixture.page.video().path();
        }
        await context.tracing.stop({ path: path });
        //await fixture.page.close();
        //await context.close();
        if (result?.status == Status.PASSED) {
            await this.attach(
                img, "image/png"
            );
            await this.attach(
                fs.readFileSync(videoPath),
                'video/webm'
            );
            const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
            await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

        }
    }catch (error) {
        console.error("Error during failure cleanup:", error);
    } finally {
        // 2. CRITICAL: Always close the page and context
        // Closing context automatically closes all pages within it
        if (fixture.page) await fixture.page.close();
        if (context) await context.close();
        
        console.log(`Resources cleaned up for scenario: ${pickle.name}`);
    }
    

});


AfterAll(async function () {
    await browser.close();
})



