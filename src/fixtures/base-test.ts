import { test as base } from "@playwright/test";

export const test = base.extend<{
    timeBomb: {
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

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors, null, 2));
        }
    }
});
