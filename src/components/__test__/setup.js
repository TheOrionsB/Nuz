import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node'
import { fetch } from 'cross-fetch';
import { restUserHandlers } from './mocks/usersapi.mock';
import { restShortenHandlers } from './mocks/shortenapi.mock';

global.fetch = fetch;

const handlers = [...restUserHandlers, ...restShortenHandlers];
const mockServer = setupServer(...handlers);

beforeAll(() => mockServer.listen({ onUnhandledRequest: `error` }));
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());