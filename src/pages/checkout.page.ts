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
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly addressInput: Locator;
    readonly stateCombobox: Locator;
    readonly zipInput: Locator;
    readonly countryCombobox: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cardExpirationInput: Locator;
    readonly cardCvvInput: Locator;
    readonly continueToCheckoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = this.page.getByRole("textbox", { name: "First name", exact: true });
        this.lastNameInput = this.page.getByRole("textbox", { name: "Last name", exact: true });
        this.usernameInput = this.page.getByRole("textbox", { name: "Username", exact: true });
        this.emailInput = this.page.getByRole("textbox", { name: "Email (Optional)", exact: true });
        this.addressInput = this.page.getByRole("textbox", { name: "Address", exact: true });
        this.stateCombobox = this.page.getByRole("combobox", { name: "State", exact: true });
        this.zipInput = this.page.getByRole("textbox", { name: "Zip", exact: true });
        this.countryCombobox = this.page.getByRole("combobox", { name: "Country", exact: true });
        this.nameOnCardInput = this.page.getByRole("textbox", {
            name: "Name on card",
            exact: true
        });
        this.cardNumberInput = this.page.getByRole("textbox", {
            name: "Credit card number",
            exact: true
        });
        this.cardExpirationInput = this.page.getByRole("textbox", {
            name: "Expiration",
            exact: true
        });
        this.cardCvvInput = this.page.getByRole("textbox", { name: "CVV", exact: true });
        this.continueToCheckoutButton = this.page.getByRole("button", {
            name: "Continue to checkout"
        });
    }

    async fillCheckoutForm(params: CheckoutForm) {
        await this.firstNameInput.fill(params.firstName);
        await this.lastNameInput.fill(params.lastName);
        await this.usernameInput.fill(params.username);
        await this.emailInput.fill(params.email);
        await this.addressInput.fill(params.address);
        await this.countryCombobox.selectOption(params.country);
        await this.stateCombobox.selectOption(params.state);
        await this.zipInput.fill(params.zip);
        await this.nameOnCardInput.fill(params.nameOnCard);
        await this.cardNumberInput.fill(params.cardNumber);
        await this.cardExpirationInput.fill(params.cardExpiration);
        await this.cardCvvInput.fill(params.cardCvv);
    }

    async continueToCheckout(): Promise<void> {
        await this.continueToCheckoutButton.click();
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
