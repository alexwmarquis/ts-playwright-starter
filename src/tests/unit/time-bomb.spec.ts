import dayjs from "dayjs";
import { test, expect } from "../../fixtures";

test.fail("should fail when the time bomb goes off", async ({ timeBomb }) => {
    timeBomb.failAfter(dayjs().subtract(1, "day").toDate());
    expect(true).toBe(true);
});

test("should pass when the time bomb does not go off", async ({ timeBomb }) => {
    timeBomb.failAfter(dayjs().add(1, "day").toDate());
    expect(true).toBe(true);
});
