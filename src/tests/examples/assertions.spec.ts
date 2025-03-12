import { test, expect } from "../../fixtures";

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
    const value2 = 2;

    // Prefer:
    expect.soft(numbers).toContain(number1);
    expect.soft(numbers).not.toContain(number2);

    expect.soft(strings).toContain(string1);
    expect.soft(strings).not.toContain(string2);

    expect.soft(values).toContain(value1);
    expect.soft(values).toContain(value2);
});
