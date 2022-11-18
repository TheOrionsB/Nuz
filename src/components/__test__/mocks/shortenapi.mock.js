import { rest } from 'msw'

export const restShortenHandlers = [
    rest.get('http://example.rest/testingApi/shorten/new', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ success: true, shortened: '489aze' }));
    })
]