import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

export const baseURL = "http://getbootstrap.com";

const config: PlaywrightTestConfig = {
    testDir: "./src/tests",
    timeout: 10000,
    fullyParallel: true,
    expect: {
        timeout: 5000
    },
    reporter: [["list"], ["html", { open: "on-failure" }]],
    use: {
        baseURL,
        video: "retain-on-failure",
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
