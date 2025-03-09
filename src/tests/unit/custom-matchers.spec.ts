import { test, expect } from "../../fixtures";

test("should pass when a value exists in an array", () => {
    const arrayOfNumbers = [1, 2, 3];
    const number1 = 2;
    const number2 = 4;

    const arrayOfStrings = ["a", "b", "c"];
    const string1 = "b";
    const string2 = "d";

    // Alternative built-in matcher
    expect(arrayOfNumbers).toContain(number1);
    expect(arrayOfNumbers).not.toContain(number2);

    expect(arrayOfStrings).toContain(string1);
    expect(arrayOfStrings).not.toContain(string2);

    // Custom matcher
    expect(number1).toBeOneOfValues(arrayOfNumbers);
    expect(number2).not.toBeOneOfValues(arrayOfNumbers);

    expect(string1).toBeOneOfValues(arrayOfStrings);
    expect(string2).not.toBeOneOfValues(arrayOfStrings);

    // Built-in matcher
    expect(arrayOfNumbers).toEqual(expect.arrayContaining([number1]));
    expect(arrayOfNumbers).not.toEqual(expect.arrayContaining([number2]));

    expect(arrayOfStrings).toEqual(expect.arrayContaining([string1]));
    expect(arrayOfStrings).not.toEqual(expect.arrayContaining([string2]));
});
