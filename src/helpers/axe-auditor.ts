import AxeBuilder from "@axe-core/playwright";
import { type Page, test, type TestInfo } from "@playwright/test";
import axe from "axe-core";
import { createHtmlReport } from "axe-html-reporter";

import fs from "node:fs/promises";
import console from "node:console";
import { v4 as uuidv4 } from "uuid";

import { testSettings } from "../config/test-settings";

export type Impact = "critical" | "serious" | "moderate" | "minor" | "potential";
export const impactScale = {
    potential: 0,
    minor: 1,
    moderate: 2,
    serious: 3,
    critical: 4
} as const;

export class AxeAuditor {
    private page: Page;
    private impact: Impact;
    private wcagStandards: string[];
    private testInfo: TestInfo;

    constructor(
        page: Page,
        impact: Impact = "potential",
        wcagStandards: string[] = testSettings.axeWcagStandards,
        testInfo: TestInfo = test.info()
    ) {
        this.page = page;
        this.impact = impact;
        this.wcagStandards = wcagStandards;
        this.testInfo = testInfo;
    }

    public async runAxeAndSaveViolations(): Promise<axe.Result[]> {
        if (!testSettings.axeTestingEnabled) {
            return [];
        } else {
            return await test.step("run axe and identify accessibility violations", async () => {
                const axeResults = await new AxeBuilder({ page: this.page })
                    .withTags(this.wcagStandards)
                    .analyze();

                const violations = axeResults.violations.filter((violation) => {
                    const violationImpactIndex = impactScale[violation.impact as Impact];
                    const selectedImpactIndex = impactScale[this.impact];

                    return selectedImpactIndex <= violationImpactIndex;
                });

                if (violations.length > 0) {
                    const screenshot = await this.page.screenshot();
                    await this.testInfo.attach("screenshot", {
                        body: screenshot,
                        contentType: "image/png"
                    });
                }

                if (testSettings.axeReportingEnabled) {
                    try {
                        await this.generateAxeHtmlReport(violations, this.testInfo);
                    } catch (error) {
                        console.error(
                            `Report failed to generate. See error log for more details.`,
                            error
                        );
                    }
                }

                return violations;
            });
        }
    }

    private async generateAxeHtmlReport(
        axeResults: axe.Result[],
        testInfo: TestInfo
    ): Promise<void> {
        if (axeResults.length === 0) {
            console.log("There were no accessibility violations identified.");
            return;
        } else {
            const reportFileName = `${uuidv4()}--accessibility-report.html`;
            const outputDir = "./axe-reports";
            const path = `${outputDir}/${reportFileName}`;

            createHtmlReport({
                results: {
                    violations: axeResults
                },
                options: {
                    outputDir,
                    reportFileName
                }
            });

            await testInfo.attach(reportFileName, { path });

            await fs.unlink(path);
        }
    }
}
