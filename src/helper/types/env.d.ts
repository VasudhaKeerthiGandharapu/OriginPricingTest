export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "qa" | "ci",
            BASEURL: string,
            HEADLESS: "true" | "false",
            TAGS: "@regression" | "@accessibility"| "@smoke"| "@netWorkmocking"
        }
    }
}