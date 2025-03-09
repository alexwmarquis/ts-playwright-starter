import { AxeAuditor } from "../../helpers";
import { test, expect } from "../../fixtures";
import { testSettings } from "../../types";

let axeAuditor: AxeAuditor;

test.skip(!testSettings.axeTestingEnabled);
test.use({ video: "off", screenshot: "off" });

test.beforeEach(async ({ page }) => {
    await page.setContent(
        `<html>
            <head>
                <!-- Serious violation: Page without a title -->
                <title></title>
            </head>
            <body>
                <h1 style="color: #555; background-color: #fff;">Welcome</h1>
                <!-- Critical violation: Image without alt attribute -->
                <img src="test-image.jpg">

                <a href="about.html">Click here</a>
        
                <!-- Critical violation: Button without accessible text -->
                <button></button>
            </body>
        </html>`,
        { waitUntil: "domcontentloaded" }
    );
});

test(`should return serious and critical violations for a mock page`, async ({ page }) => {
    axeAuditor = new AxeAuditor(page, "serious");
    const violations = await axeAuditor.runAxeAndSaveViolations();

    expect.soft(violations.length).toBeGreaterThan(2);

    for (const violation of violations) {
        expect.soft(violation.impact).toBeOneOfValues(["serious", "critical"]);
    }
});

test(`should return critical violations for a mock page`, async ({ page }) => {
    axeAuditor = new AxeAuditor(page);
    const violations = await axeAuditor.runAxeAndSaveViolations();

    expect.soft(violations.length).toBeGreaterThan(1);

    for (const violation of violations) {
        expect.soft(violation.impact).toBeOneOfValues(["critical"]);
    }
});
