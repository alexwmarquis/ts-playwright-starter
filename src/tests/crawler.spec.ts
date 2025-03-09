import { baseURL } from "../../playwright.config";
import { test, expect } from "../fixtures";

test(
    "should crawl all top-level discoverable pages and verify they load successfully",
    { tag: "@smoke" },
    async ({ page }) => {
        const baseOrigin = new URL(baseURL).origin;
        const errorLog: Array<{ url: string; status: number }> = [];

        console.log(`Checking homepage: ${baseOrigin}`);
        const homeResponse = await page.goto(baseOrigin, { waitUntil: "domcontentloaded" });

        if (!homeResponse) {
            errorLog.push({ url: baseOrigin, status: 500 });
        } else if (homeResponse.status() >= 400) {
            errorLog.push({ url: baseOrigin, status: homeResponse.status() });
        }

        const mainNavLinks = await page.getByRole("navigation").getByRole("link").all();
        const mainUrls = new Set<string>();

        for (const link of mainNavLinks) {
            const href = await link.getAttribute("href");
            if (!href || href.startsWith("#")) continue;

            try {
                const urlObj = new URL(href, baseOrigin);
                if (urlObj.origin === baseOrigin) {
                    mainUrls.add(urlObj.href);
                }
            } catch (error) {
                console.warn(`Invalid URL: ${href}`);
            }
        }

        for (const url of mainUrls) {
            console.log(`Checking main page: ${url}`);
            const response = await page.goto(url, { waitUntil: "domcontentloaded" });

            if (!response) {
                errorLog.push({ url, status: 500 });
            } else if (response.status() >= 400) {
                errorLog.push({ url, status: response.status() });
            }
        }

        if (errorLog.length > 0) {
            console.error("Pages with errors:", errorLog);
        }
        expect(errorLog).toHaveLength(0);
    }
);
