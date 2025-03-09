import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    private readonly examplesNavLink: Locator;

    constructor(page: Page) {
        super(page);

        this.examplesNavLink = this.page
            .getByLabel("Main navigation")
            .getByRole("link", { name: "Examples" });
    }

    async goToHomePage() {
        await this.page.goto("/");
    }

    async goToExamplesPage() {
        await this.examplesNavLink.click();
    }
}
