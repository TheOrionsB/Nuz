import { rest } from 'msw'

export const restShortenHandlers = [
    rest.get('http://example.rest/testingApi/shorten/new', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ success: true, shortened: '489aze' }));
    }),
    rest.post('http://example.rest/testingApi/shorten', async (req, res, ctx) => {
        const jsonRequest = await req.json();
        if (!jsonRequest.username ||
            !jsonRequest.toshorten ||
            !jsonRequest.toshorten.name ||
            !jsonRequest.toshorten.source ||
            !jsonRequest.toshorten.target) return res(ctx.status(400));
        return res(
            ctx.status(200),
            ctx.json({success: true})
        )
    })
]