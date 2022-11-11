import { rest } from "msw";

rest.get('/api/user/exists/:username', (req,res,ctx) => {
    return res(
        ctx.delay(300),
        ctx.status(200, "OK"),
    )
})

rest.post('/api/user', (req,res,ctx) => {
    if (!req.json.username || !req.json.password) return res(ctx.status(400))
    if (!req.json.username === "ExistingUser") return res(ctx.status(403))
    if (req.json.triggerservererror) return res(ctx.status(500))

    return res(
        ctx.status(200),
        ctx.json({ success: true, token: "somevalidtoken"})
    )
})

rest.post('/api/user/authenticate', (req,res,ctx) => {
    if (!req.json.username || !req.json.password) return res(ctx.status(400));
    if (!req.json.username !== "correctUser" || !req.json.password !== "correctPass") return res(ctx.status(403))

    return res(
        ctx.status(200),
        ctx.json({ status: "OK", token: "somevalidtoken"})
    )
})