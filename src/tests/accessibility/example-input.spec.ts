import { test, expect } from "../../fixtures";
import type { Page, Locator } from "@playwright/test";
import { AxeAuditor } from "../../helpers";

interface InputParams {
    email: string;
}

class ExamplePage {
    readonly email: Locator;
    readonly submit: Locator;
    readonly alert: Locator;

    constructor(page: Page) {
        this.email = page.getByLabel("Email Address");
        this.submit = page.getByRole("button", { name: "Submit" });
        this.alert = page.getByRole("alert");
    }

    async fillForm(params: InputParams) {
        await this.email.fill(params.email);
    }

    async submitForm() {
        await this.submit.click();
    }
}

const html = `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Input Example</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <form novalidate>
    <label for="email">Email Address <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required aria-required="true" aria-describedby="emailHint" aria-errormessage="emailError">
    <span id="emailHint" class="hint">Please enter a valid email address.</span>
    <span id="emailError" class="error" role="alert" hidden>Invalid email address.</span>
    <button type="submit">Submit</button>
  </form>

  <script>
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', (event) => {
      if (!emailInput.checkValidity()) {
        event.preventDefault();
        emailInput.setAttribute('aria-invalid', 'true');
        emailError.hidden = false;
      } else {
        emailInput.setAttribute('aria-invalid', 'false');
        emailError.hidden = true;
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.checkValidity()) {
        emailInput.setAttribute('aria-invalid', 'false');
        emailError.hidden = true;
      }
    });
  </script>
</body>
</html>`;

test("should pass an accessibility audit", async ({ page }) => {
    await page.setContent(html);

    const axeAuditor = new AxeAuditor(page);
    const violations = await axeAuditor.runAxeAndSaveViolations();

    expect.soft(violations.length).toBe(0);
});

test("should allow using expressive accessibility assertions", async ({ page }) => {
    await page.setContent(html);

    const examplePage = new ExamplePage(page);

    await expect.soft(examplePage.email).toBeVisible();
    await expect.soft(examplePage.submit).toBeVisible();
    await expect.soft(examplePage.alert).toBeHidden();

    await expect.soft(examplePage.email).toHaveAttribute("required");
    await expect.soft(examplePage.email).toHaveAttribute("aria-required", "true");
    await expect
        .soft(examplePage.email)
        .toHaveAccessibleDescription("Please enter a valid email address.");

    await examplePage.fillForm({ email: "test@example.com" });

    await expect.soft(examplePage.email).toHaveAttribute("aria-invalid", "false");
    await expect.soft(examplePage.email).toHaveValue("test@example.com");
    await expect.soft(examplePage.alert).toBeHidden();

    await examplePage.fillForm({ email: "invalid-email" });

    await examplePage.submitForm();

    await expect.soft(examplePage.email).toHaveAttribute("aria-invalid", "true");
    await expect.soft(examplePage.email).toHaveAccessibleErrorMessage("Invalid email address.");
    await expect.soft(examplePage.alert).toBeVisible();
});
