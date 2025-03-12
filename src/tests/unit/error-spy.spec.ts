import { test, expect } from "../../fixtures";
import { testSettings } from "../../config";

test.skip(!testSettings.strictErrorModeEnabled);

test("should pass when a page loads successfully", async ({ page }) => {
    await page.goto("https://httpstat.us/200");
    expect(true).toBe(true);
});

test.fail("should fail when a page throws a bad request error", async ({ page }) => {
    await page.goto("https://httpstat.us/400");
    expect(true).toBe(true);
});

test.fail("should fail when a page throws an internal server error", async ({ page }) => {
    await page.goto("https://httpstat.us/500");
    expect(true).toBe(true);
});

test.fail("should fail when a page throws an uncaught JavaScript error", async ({ page }) => {
    await page.goto("https://microsoftedge.github.io/Demos/devtools-console/error.html");
    expect(true).toBe(true);
});

test.fail("should fail when a page throws a console error", async ({ page }) => {
    await page.goto("https://microsoftedge.github.io/Demos/devtools-console/logging-examples.html");
    expect(true).toBe(true);
});
