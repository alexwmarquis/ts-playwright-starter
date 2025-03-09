import type { Page } from "@playwright/test";

export class BasePage {
    constructor(protected readonly page: Page) {}

    async goto(url: string) {
        await this.page.goto(url);
    }

    async getPageHeadings(): Promise<string[]> {
        const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").all();
        const texts = await Promise.all(headings.map((heading) => heading.textContent()));
        return texts.filter((text): text is string => text !== null);
    }

    async pageHeading() {
        return this.page.getByRole("heading").first();
    }

    async getPageTitle() {
        return await this.page.title();
    }
}
