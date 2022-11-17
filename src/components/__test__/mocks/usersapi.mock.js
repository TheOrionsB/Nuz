import { rest } from "msw";

export const restHandlers = [
    rest.get('http://example.rest/testingApi/user/exists/:username', (req, res, ctx) => {
        if (req.params.username !== "ExistingUser")
            return res(
                ctx.delay(0),
                ctx.status(200, "OK"),
            )
        return res(
            ctx.delay(0),
            ctx.status(409)
        )
    }),

    rest.post('http://example.rest/testingApi/user', (req, res, ctx) => {
        if (!req.json.username || !req.json.password) return res(ctx.status(400))
        if (!req.json.username === "ExistingUser") return res(ctx.status(403))
        if (req.json.triggerservererror) return res(ctx.status(500))

        return res(
            ctx.status(200),
            ctx.json({ success: true, token: "somevalidtoken" })
        )
    }),

    rest.post('http://example.rest/testingApi/user/authenticate', async (req, res, ctx) => {
        const responseBody = await req.json();
        if (responseBody.username === "correctUser" && responseBody.password === "correctPass")
            return (res(ctx.status(200), ctx.json({ status: "OK", token: "somevalidtoken" })));
        return (res(ctx.status(401), ctx.json({ status: "UNAUTHORIZED" })));
    }),
]