import { AxeAuditor } from "../../helpers";
import { test, expect } from "../../fixtures";
import { testSettings } from "../../config";

let axeAuditor: AxeAuditor;

test.skip(!testSettings.axeTestingEnabled);
test.use({ video: "off", screenshot: "off" });

test.beforeEach(async ({ page }) => {
    await page.setContent(
        `<html lang="">
            <head>
                <!-- Serious violation: Empty title -->
                <title></title>
                <!-- Missing viewport meta tag -->
            </head>
            <body>
                <!-- Color contrast issues -->
                <h1 style="color: #999; background-color: #eee;">Welcome to Our Site</h1>
                
                <!-- Missing landmark regions -->
                <div>
                    <!-- Critical violation: Image without alt attribute -->
                    <img src="test-image.jpg">
                    
                    <!-- Image with meaningless alt text -->
                    <img src="banner.jpg" alt="image">
                    
                    <!-- Critical violation: Button without accessible text -->
                    <button></button>
                    
                    <!-- Link with non-descriptive text -->
                    <a href="page1.html">Click here</a>
                    
                    <!-- Duplicate IDs -->
                    <div id="content">First content area</div>
                    <div id="content">Second content area</div>
                    
                    <!-- Form fields without labels -->
                    <input type="text" placeholder="Name">
                    <input type="email" placeholder="Email">
                    
                    <!-- Missing form label association -->
                    <label>Password</label>
                    <input type="password">
                    
                    <!-- Empty table headers -->
                    <table>
                        <tr><th></th><th></th></tr>
                        <tr><td>Data 1</td><td>Data 2</td></tr>
                    </table>
                    
                    <!-- Heading level skipping -->
                    <h1>Main Heading</h1>
                    <h3>Subheading (skipped h2)</h3>
                </div>
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
        expect.soft(violation.impact).toMatch(/serious|critical/);
    }
});

test(`should return critical violations for a mock page`, async ({ page }) => {
    axeAuditor = new AxeAuditor(page, "critical");
    const violations = await axeAuditor.runAxeAndSaveViolations();

    expect.soft(violations.length).toBeGreaterThan(1);

    for (const violation of violations) {
        expect.soft(violation.impact).toMatch(/critical/);
    }
});

test(`should return all violations for a mock page`, async ({ page }) => {
    axeAuditor = new AxeAuditor(page);
    const violations = await axeAuditor.runAxeAndSaveViolations();

    expect.soft(violations.length).toBeGreaterThan(1);
    for (const violation of violations) {
        expect.soft(violation.impact).toMatch(/minor|moderate|serious|critical/);
    }
});
