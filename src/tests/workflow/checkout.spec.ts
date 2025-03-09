import { expect, test } from "../../fixtures";
import { HomePage, ExamplesPage, CheckoutPage } from "../../pages";

let homePage: HomePage;
let examplesPage: ExamplesPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    examplesPage = new ExamplesPage(page);
    checkoutPage = new CheckoutPage(page);
});

test("should be able to checkout", { tag: "@regression" }, async () => {
    await homePage.goToHomePage();
    await homePage.goToExamplesPage();
    await examplesPage.goToCheckoutPage();
    await checkoutPage.fillCheckoutForm({
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        address: "123 Main St",
        state: "California",
        zip: "12345",
        country: "United States",
        nameOnCard: "John Doe",
        cardNumber: "1234567890123456",
        cardExpiration: "12/2024",
        cardCvv: "123"
    });

    await checkoutPage.firstNameInput.fill("");

    await checkoutPage.continueToCheckout();

    expect.soft(await checkoutPage.validationErrors()).toContain("Valid first name is required.");

    await checkoutPage.firstNameInput.fill("John");

    await checkoutPage.continueToCheckout();

    expect.soft(await checkoutPage.validationErrors()).toHaveLength(0);
});
