import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import process from "node:process";

export const baseURL = "http://getbootstrap.com";

const config: PlaywrightTestConfig = {
    testDir: "./src/tests",
    timeout: 10000,
    fullyParallel: true,
    expect: { timeout: 5000 },
    reporter: [["list"], ["html", { open: "on-failure" }]],
    workers: process.env.CI ? 1 : undefined,
    use: {
        baseURL,
        video: "on",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        headless: true
    },
    projects: [
        {
            name: "desktop-chromium",
            use: { ...devices["Desktop Chrome"] }
        }
    ]
};

export default config;
