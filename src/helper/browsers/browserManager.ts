import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const head : boolean = process.env.HEADLESS === 'false';  
const options: LaunchOptions = {
      headless : head
}
export const invokeBrowser = () => {
    console.log("browser data from env file"+ process.env.BROWSER)
    const browserType = process.env.BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}