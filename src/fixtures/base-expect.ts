import { expect as base } from "@playwright/test";

export const expect = base.extend({
    toBeOneOfValues(received, array) {
        const pass = array.includes(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be one of [${array.join(", ")}]`,
                pass: true
            };
        } else {
            return {
                message: () => `expected ${received} to be one of [${array.join(", ")}]`,
                pass: false
            };
        }
    }
});
