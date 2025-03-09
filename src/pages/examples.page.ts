import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ExamplesPage extends BasePage {
    private readonly checkoutExampleLink: Locator;

    constructor(page: Page) {
        super(page);

        this.checkoutExampleLink = this.page.getByRole("link", { name: "Checkout", exact: true });
    }

    async goToCheckoutPage() {
        await this.checkoutExampleLink.click();
    }
}
