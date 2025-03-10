import { test, expect } from "../../fixtures";

interface User {
    id: number;
    name: string;
    company: string;
    username: string;
    email: string;
    address: string;
    zip: string;
    state: string;
    country: string;
    phone: string;
    photo?: string;
}

test("should allow writing contract tests for an API response", async ({ request }) => {
    const endpoint = "https://json-placeholder.mock.beeceptor.com/users";
    const response = await request.get(endpoint);

    await expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const body = await response.json();

    body.forEach((user: User) => {
        expect.soft(user.id).toEqual(expect.any(Number));
        expect.soft(user.name).toEqual(expect.any(String));
        expect.soft(user.email).toEqual(expect.any(String));
        expect.soft(user.phone).toEqual(expect.any(String));
        expect.soft(user.address).toEqual(expect.any(String));
        expect.soft(user.state).toEqual(expect.any(String));
        expect.soft(user.zip).toEqual(expect.any(String));
        expect.soft(user.country).toEqual(expect.any(String));

        if (user.photo) expect.soft(user.photo).toEqual(expect.any(String));
    });
});
