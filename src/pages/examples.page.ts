import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ExamplesPage extends BasePage {
    readonly linkToCheckoutExamplePage: Locator;

    constructor(page: Page) {
        super(page);

        this.linkToCheckoutExamplePage = this.page.getByRole("link", {
            name: "Checkout",
            exact: true
        });
    }

    async goToCheckoutPage() {
        await this.linkToCheckoutExamplePage.click();
    }
}
