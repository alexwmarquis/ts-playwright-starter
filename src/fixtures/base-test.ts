import { test as base } from "@playwright/test";
import { testSettings } from "../config";

export const test = base.extend<{
    timeBomb: {
        /* eslint-disable-next-line no-unused-vars */
        failAfter: (date: Date) => void;
    };
}>({
    timeBomb: async ({}, use) => {
        await use({
            failAfter: (date: Date) => {
                const todaysDate = new Date();

                if (todaysDate >= date) {
                    throw new Error(
                        `⏰ Test is time-bombed: Stopped passing after ${date.toLocaleDateString()}`
                    );
                }
            }
        }),
            { auto: true };
    },

    page: async ({ page }, use) => {
        const errors: string[] = [];

        page.on("pageerror", (error) => {
            const errorMessage = error.message.replace(/^Error: /, "");
            errors.push(`JAVASCRIPT: ${errorMessage}`);
        });

        page.on("console", async (msg) => {
            if (msg.type() === "error") {
                const consoleArgs = await Promise.all(
                    msg.args().map(async (arg) => arg.jsonValue())
                );
                const message = consoleArgs.join(" ").trim();

                const errorMessage = message.replace(/^Error: /, "");
                errors.push(`CONSOLE: ${errorMessage}`);
            }
        });

        page.on("response", (response) => {
            if (response.status() >= 400) {
                const errorMessage = response.statusText();
                errors.push(`NETWORK: ${errorMessage} ${response.url()}`);
            }
        });

        await use(page);

        if (testSettings.strictErrorModeEnabled && errors.length > 0) {
            throw new Error(errors.join("\n").trim());
        }
    }
});
