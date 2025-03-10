import { test } from "../../fixtures";
import { testSettings } from "../../config";

/* eslint-disable playwright/expect-expect */
test.skip(!testSettings.strictErrorModeEnabled);

test("should pass when a page loads successfully", async ({ page }) => {
    await page.goto("https://httpstat.us/200");
});

test.fail("should fail when a page throws a bad request error", async ({ page }) => {
    await page.goto("https://httpstat.us/400");
});

test.fail("should fail when a page throws an internal server error", async ({ page }) => {
    await page.goto("https://httpstat.us/500");
});

test.fail("should fail when a page throws an uncaught JavaScript error", async ({ page }) => {
    await page.goto("https://microsoftedge.github.io/Demos/devtools-console/error.html");
});

test.fail("should fail when a page throws a console error", async ({ page }) => {
    await page.goto("https://microsoftedge.github.io/Demos/devtools-console/logging-examples.html");
});
