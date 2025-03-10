import dotenv from "dotenv";

dotenv.config();

export const testSettings = {
    axeWcagStandards: process.env.AXE_WCAG_STANDARDS?.split(",") || [
        "wcag2a",
        "wcag2aa",
        "wcag2aaa"
    ],
    axeTestingEnabled: process.env.AXE_TESTING_ENABLED === "true" || false,
    axeReportingEnabled: process.env.AXE_REPORTING_ENABLED === "true" || false,
    strictErrorModeEnabled: process.env.STRICT_ERROR_MODE_ENABLED === "true" || false
};
