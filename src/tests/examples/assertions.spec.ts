import { test, expect } from "../../fixtures";
import { HomePage, ExamplesPage, CheckoutPage } from "../../pages";

test("should use `.toContain()` assertion for evaluating arrays and sets", () => {
    test.info().annotations.push({
        type: "Best Practice",
        description:
            "Use the `.toContain()` assertion to check if an array or set contains a specific value. This is the most expressive and concise way to check for the presence of an item in an array or set. If you must check whether an array contains another array, use the `expect(expected).toEqual(expect.arrayContaining(received))` assertion format."
    });

    const numbers = [1, 2, 3];
    const number1 = 2;
    const number2 = 4;

    const strings = ["a", "b", "c"];
    const string1 = "b";
    const string2 = "d";

    const values = new Set([number1, number2, string1, string2]);
    const value1 = "b";
    const value2 = "c";

    // Prefer:
    expect(numbers).toContain(number1);
    expect(numbers).not.toContain(number2);

    expect(strings).toContain(string1);
    expect(strings).not.toContain(string2);

    expect(values).toContain(value1);
    expect(values).not.toContain(value2);
});

test("should use `.toBeEditable()` assertion for DOM contract testing", async ({ page }) => {
    test.info().annotations.push({
        type: "Best Practice",
        description:
            "Use the `.toBeEditable()` assertion to check if an element is editable. An element is editable if it is a text input, textarea, or contenteditable element. This type of visual contract testing can be valuable for smoke and accessibility testing where quick developer feedback is prioritized."
    });

    const homePage = new HomePage(page);
    const examplesPage = new ExamplesPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goToHomePage();
    await homePage.goToExamplesPage();
    await examplesPage.goToCheckoutPage();

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
    await expect.soft(checkoutPage.checkoutButton).toBeVisible();
});
