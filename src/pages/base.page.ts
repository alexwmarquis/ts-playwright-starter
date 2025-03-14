import type { Page, Locator } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly mainNavigation: Locator;
    readonly linkToHomePage: Locator;
    readonly linkToExamplesPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainNavigation = this.page.getByLabel("Main navigation");
        this.linkToHomePage = this.mainNavigation.getByLabel("Bootstrap");
        this.linkToExamplesPage = this.mainNavigation.getByRole("link", { name: "Examples" });
    }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async goToHomePage(): Promise<void> {
        await this.goTo("/");
    }

    async goToExamplesPage(): Promise<void> {
        await this.linkToExamplesPage.click();
    }

    async pageHeadings(): Promise<string[]> {
        const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").all();
        const texts = await Promise.all(headings.map((heading) => heading.textContent()));
        return texts.filter((text): text is string => text !== null);
    }

    async pageHeading(): Promise<Locator> {
        return this.page.getByRole("heading").first();
    }

    async pageTitle(): Promise<string> {
        return await this.page.title();
    }

    async validationErrors(): Promise<string[]> {
        const errors = this.page.locator(".invalid-feedback:visible");
        const errorElements = await errors.all();
        const visibleTexts = await Promise.all(
            errorElements
                .filter(async (element) => await element.isVisible())
                .map(async (element) => ((await element.textContent()) || "").trim())
        );
        return visibleTexts.filter((text) => text !== "");
    }
}
