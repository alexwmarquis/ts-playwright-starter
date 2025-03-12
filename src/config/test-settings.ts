import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

export const testSettings = {
    axeWcagStandards: process.env.AXE_WCAG_STANDARDS?.split(",") || [
        "wcag21a",
        "wcag21aa",
        "wcag21aaa",
        "best-practice"
    ],
    axeTestingEnabled: process.env.AXE_TESTING_ENABLED === "true" || false,
    axeReportingEnabled: process.env.AXE_REPORTING_ENABLED === "true" || false,
    strictErrorModeEnabled: process.env.STRICT_ERROR_MODE_ENABLED === "true" || false
};
