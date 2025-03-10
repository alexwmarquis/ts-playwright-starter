import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

interface CheckoutForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: string;
    state: string;
    zip: string;
    country: string;
    nameOnCard: string;
    cardNumber: string;
    cardExpiration: string;
    cardCvv: string;
}

export class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly username: Locator;
    readonly email: Locator;
    readonly address: Locator;
    readonly state: Locator;
    readonly zip: Locator;
    readonly country: Locator;
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly cardExpiry: Locator;
    readonly cardCvv: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.firstName = this.page.getByRole("textbox", { name: "First name", exact: true });
        this.lastName = this.page.getByRole("textbox", { name: "Last name", exact: true });
        this.username = this.page.getByRole("textbox", { name: "Username", exact: true });
        this.email = this.page.getByRole("textbox", { name: "Email (Optional)", exact: true });
        this.address = this.page.getByRole("textbox", { name: "Address", exact: true });
        this.state = this.page.getByRole("combobox", { name: "State", exact: true });
        this.zip = this.page.getByRole("textbox", { name: "Zip", exact: true });
        this.country = this.page.getByRole("combobox", { name: "Country", exact: true });
        this.cardName = this.page.getByRole("textbox", { name: "Name on card", exact: true });
        this.cardNumber = this.page.getByRole("textbox", {
            name: "Credit card number",
            exact: true
        });
        this.cardExpiry = this.page.getByRole("textbox", { name: "Expiration", exact: true });
        this.cardCvv = this.page.getByRole("textbox", { name: "CVV", exact: true });
        this.checkoutButton = this.page.getByRole("button", { name: "Continue to checkout" });
    }

    async fillCheckoutForm(params: CheckoutForm) {
        await this.firstName.fill(params.firstName);
        await this.lastName.fill(params.lastName);
        await this.username.fill(params.username);
        await this.email.fill(params.email);
        await this.address.fill(params.address);
        await this.country.selectOption(params.country);
        await this.state.selectOption(params.state);
        await this.zip.fill(params.zip);
        await this.cardName.fill(params.nameOnCard);
        await this.cardNumber.fill(params.cardNumber);
        await this.cardExpiry.fill(params.cardExpiration);
        await this.cardCvv.fill(params.cardCvv);
    }

    async continueToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
