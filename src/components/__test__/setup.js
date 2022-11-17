import {
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { setupServer } from 'msw/node'
import { fetch } from 'cross-fetch';
import { restHandlers } from './mocks/usersapi.mock';
global.fetch = fetch;

const mockServer = setupServer(...restHandlers);
mockServer.use((req) => console.log(req))

beforeAll(() => mockServer.listen({ onUnhandledRequest: `error` }));
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());