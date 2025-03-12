import { test, expect } from "../../fixtures";
import { HomePage, ExamplesPage, CheckoutPage } from "../../pages";

test("should allow writing contract tests for DOM elements", async ({ page }) => {
    test.info().annotations.push({
        type: "Best Practice",
        description:
            "Use the `.toBeEditable()` assertion to check if an element is editable. An element is editable if it is a text input, textarea, or contenteditable element. This type of contract testing can be valuable for smoke and accessibility testing where quick developer feedback is prioritized."
    });

    const homePage = new HomePage(page);
    const examplesPage = new ExamplesPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goToHomePage();
    await homePage.goToExamplesPage();
    await examplesPage.goToCheckoutPage();

    expect.soft(await checkoutPage.getPageTitle()).toContain("Checkout example");
    await expect.soft(await checkoutPage.pageHeading()).toHaveText("Checkout form");

    await expect.soft(checkoutPage.firstName).toBeEditable();
    await expect.soft(checkoutPage.lastName).toBeEditable();
    await expect.soft(checkoutPage.username).toBeEditable();
    await expect.soft(checkoutPage.email).toBeEditable();
    await expect.soft(checkoutPage.address).toBeEditable();
    await expect.soft(checkoutPage.zip).toBeEditable();
    await expect.soft(checkoutPage.cardName).toBeEditable();
    await expect.soft(checkoutPage.cardNumber).toBeEditable();
    await expect.soft(checkoutPage.cardExpiry).toBeEditable();
    await expect.soft(checkoutPage.cardCvv).toBeEditable();

    await expect.soft(checkoutPage.state).toBeVisible();
    await expect.soft(checkoutPage.country).toBeVisible();

    await expect.soft(checkoutPage.checkoutButton).toBeEnabled();
});
